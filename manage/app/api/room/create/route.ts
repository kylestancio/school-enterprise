import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody{
  code: string,
  building: string,
}

export async function POST(req: NextRequest){

  const body:IRequestBody = await req.json()

  try{
    await prisma.room.create({
      data: {
        code: body.code,
        building: body.building,
      }
    })
    return NextResponse.json({
      status: 'ok',
      message: 'Room creation success'
    })
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}