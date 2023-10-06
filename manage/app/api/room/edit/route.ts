import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody{
  id: string,
  code: string,
  building: string,
}

export async function PATCH(req: NextRequest){

  const body:IRequestBody = await req.json()

  try{
    await prisma.room.update({
      where: {
        id: body.id
      },
      data: {
        code: body.code,
        building: body.building,
      }
    })
    return NextResponse.json({
      status: 'ok',
      message: 'Room details update success'
    })
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}