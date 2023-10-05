import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  try{
    const query = await prisma.room.findMany()
    return NextResponse.json(query)
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}