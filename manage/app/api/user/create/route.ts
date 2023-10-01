import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcrypt'

export async function POST(req: NextRequest){

  const body:User = await req.json()

  try{
    await prisma.user.create({
      data: {
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        fullName: body.fullName,
        email: body.email,
      }
    })
    return NextResponse.json({status: 'ok', message: 'User creation successful'})
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}