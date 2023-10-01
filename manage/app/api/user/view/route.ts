import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody{
  id: string
}

export async function GET(req: NextRequest){

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