import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { User, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface IRequestBody{
  id: string
}

export async function GET(req: NextRequest){

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
  const id = searchParams.get('id')

  try{
    if (!id) throw new Error("Search parameter 'id' should not be empty")
    const query = await prisma.user.findFirstOrThrow({
      where: {
        id: id
      }
    })
    const { password, ...cleanedResponse } = query;
    return NextResponse.json(cleanedResponse)
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}