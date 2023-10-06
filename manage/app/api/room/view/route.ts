import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){

  const searchParams = new URL(req.url).searchParams
  const id = searchParams.get('id')

  try{
    if (!id) throw new Error("Search parameter 'id' should not be empty")
    const query = await prisma.room.findFirst({
      where: {
        id: id
      },
      select:{
        id: true,
        code: true,
        building: true,
      }
    })
    return NextResponse.json(query)
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}