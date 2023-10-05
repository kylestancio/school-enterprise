import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody{
  courseId: string,
  employeeId: string
}

export async function PATCH(req: NextRequest){

  const body:IRequestBody = await req.json()

  try{
    await prisma.course.update({
      where: {
        id: body.courseId
      },
      data: {
        professorId: body.employeeId
      }
    })

    return NextResponse.json({
      status: 'ok',
      message: 'Professor course assignment successful.'
    })
  }catch(err){
    console.log(err)
    return NextResponse.error()
  }
}