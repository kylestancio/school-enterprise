import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody{
  id: string
}

export async function DELETE(req: NextRequest){
  const body:IRequestBody = await req.json()
  try{
    await prisma.course.delete({
      where: {
        id: body.id
      }
    })
    return NextResponse.json({
      status: 'ok',
      message: 'Course deletion successful'
    })
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}