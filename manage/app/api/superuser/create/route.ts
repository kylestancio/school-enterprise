import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcrypt'
import { UserRole } from "@prisma/client";

interface IRequestBody{
  username: string,
  password: string,
  fullName: string,
  email: string,
}

export async function POST(req: NextRequest){
  const body:IRequestBody = await req.json()
  try{
    const superusers = await prisma.user.findMany({
      where: {
        roles: {
          has: "SUPERUSER"
        }
      },
    })
    if (superusers.length > 0) throw new Error("A superuser already exists.")
    await prisma.user.create({
      data: {
        roles: Object.values(UserRole).filter((v) => isNaN(Number(v))),
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        fullName: body.fullName,
        email: body.email
      }
    })
    return NextResponse.json({
      status: 'ok',
      message: 'Superuser creation successful.'
    })
  }catch(err){
    console.error(err)
    return NextResponse.json({
      status: 'error',
      message: 'Superuser already exists.'
    }, {
      status: 500
    })
  }
}