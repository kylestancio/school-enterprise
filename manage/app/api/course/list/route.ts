import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){

  const searchParams = new URL(req.url).searchParams
  
  try{
    const queryArgs:Prisma.CourseFindManyArgs = {
      include: {
        room: true,
      }
    }

    if (searchParams){
      if (searchParams.get('includeProfessor')==='true'){
        queryArgs.include = {
          ...queryArgs.include,
          professor: true
        }
      }
      if (searchParams.get('unassigned')==='true'){
        queryArgs.where = {
          ...queryArgs.where,
          professorId: null
        } 
      }
      if (searchParams.get('name')!==null){
        queryArgs.where = {
          ...queryArgs.where,
          OR: [
            { 
              code: {
                contains: searchParams.get('name')!.toString()
              }
            },
            {
              name: {
                contains: searchParams.get('name')!.toString()
              }
            }
          ]
        } 
      }
    }

    const query = await prisma.course.findMany(queryArgs)
    return NextResponse.json(query)
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}