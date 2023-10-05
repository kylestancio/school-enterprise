import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

interface IRequestBody {
  id: string
}

export async function DELETE(req: NextRequest){
  
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

  const body:IRequestBody = await req.json()

  try{
    if (!body.id) throw new Error("Employee id is null")

    await prisma.employee.delete({
      where: {
        id: body.id
      }
    })
    return NextResponse.json({
      status: 'ok',
      message: 'Employee deletion successful.'
    })
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}