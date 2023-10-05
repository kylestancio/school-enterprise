import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest){

  //* CHECK IF USER IS LOGGED IN AND HAS THE PROPER ROLE
  try{
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("User is not logged in")
    const { user } = session
    if (!user.roles.includes('EMPLOYEESMANAGER')) throw new Error("User does not have proper role")
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }

  const searchParams = new URL(req.url).searchParams
  const name = searchParams.get('name')

  const queryArgs:Prisma.EmployeeFindManyArgs = {}
  if (name){
    queryArgs.where! = { 
      ...queryArgs.where,
      OR: [
        { 
          username: {
            contains: name
          }
        },
        { 
          fullName: {
            contains: name
          }
        }
      ]
    }
  }

  try{
    const query = await prisma.employee.findMany(queryArgs)

    const cleanedResponse = query.map((user,i)=>{
      const {password, ...cleanedEmployee} = user;
      return cleanedEmployee
    })
    
    return NextResponse.json(cleanedResponse)

  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}