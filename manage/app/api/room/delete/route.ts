import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface IRequestBody {
  id: string
}

export async function DELETE(req: NextRequest){

  const body:IRequestBody = await req.json()

  try{
    if (!body.id) throw new Error("Room id is null")

    await prisma.room.delete({
      where: {
        id: body.id
      }
    })
    return NextResponse.json({
      status: 'ok',
      message: 'Room deletion successful.'
    })
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}