import prisma from "@/lib/prisma";
import { ClassDays, TimePeriod } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody{
  name: string,
  code: string,
  room: string, //! THIS IS THE ROOM ID
  description: string,
  classDays: ClassDays[],
  timeStartHour: string | number,
  timeStartMinute: string | number,
  timeStartPeriod: TimePeriod,
  timeEndHour: string | number,
  timeEndMinute: string | number,
  timeEndPeriod: TimePeriod,
}

export async function POST(req: NextRequest){
  const body:IRequestBody = await req.json()
  try{
    await prisma.course.create({
      data: {
        code: body.code,
        name: body.name,
        description: body.description,
        roomId: body.room,
        classDays: body.classDays,
        timeStartHour: Number(body.timeStartHour),
        timeStartMinute: Number(body.timeStartMinute),
        timeStartPeriod: body.timeStartPeriod,
        timeEndHour: Number(body.timeStartHour),
        timeEndMinute: Number(body.timeStartMinute),
        timeEndPeriod: body.timeStartPeriod,
      }
    })
    return NextResponse.json({
      status: 'ok', 
      message: 'Course creation successful'
    })
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}