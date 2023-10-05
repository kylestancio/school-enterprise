import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){

  const searchParams = new URL(req.url).searchParams
  const name = searchParams.get('name')

  const queryArgs:Prisma.UserFindManyArgs = {}
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
    const query = await prisma.user.findMany(queryArgs)

    const cleanedResponse = query.map((user,i)=>{
      const {password, ...cleanedUser} = user;
      return cleanedUser
    })
    
    return NextResponse.json(cleanedResponse)

  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}