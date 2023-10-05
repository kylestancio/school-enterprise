import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest){

  try{
    //* NEED TO USE FORM DATA TO ACCOMMODATE IMAGE UPLOAD IN THE FUTURE
    const formData = await req.formData()

    //* EXTRACT ALL FORM DATA
    const id = formData.get('id')?.toString()
    const username = formData.get('username')?.toString()
    const fullName = formData.get('fullName')?.toString()
    const email = formData.get('email')?.toString()
    const address = formData.get('address')?.toString()
    const birthdate = formData.get('birthdate')?.toString()
    const employmentDate = formData.get('employmentDate')?.toString()
    const position = formData.get('position')?.toString()

    //* MAKE SURE DATA IS NOT NULL
    if (id===null || id===undefined) throw new Error('Required field should not be null: username')
    if (username===null || username===undefined) throw new Error('Required field should not be null: username')
    if (fullName===null || fullName===undefined) throw new Error('Required field should not be null: fullName')
    if (email===null || email===undefined) throw new Error('Required field should not be null: email')
    if (address===null || address===undefined) throw new Error('Required field should not be null: address')
    if (birthdate===null || birthdate===undefined) throw new Error('Required field should not be null: birthdate')
    if (employmentDate===null || employmentDate===undefined) throw new Error('Required field should not be null: unemploymentDate')
    if (position===null || position===undefined) throw new Error('Required field should not be null: position')

    //* CREATE EXTENDED DETAILS JSON OBJECT
    const extendedDetails = {}
    
    //* GENERATE EMPLOYEE ID. EMPLOYEE ID IS DIFFERENT FROM USER ID
    //* FORMAT: [EMPLOYED_YEAR][EMPLOYED_MONTH][RANDOM_9_DIGIT]
    const tmpEmploymentDate = new Date(employmentDate)
    const tmpEmploymentYear = tmpEmploymentDate.getFullYear().toString()
    const tmpEmploymentMonth = tmpEmploymentDate.getMonth().toString()
    const tmpRandomDigits = Math.random().toString().slice(2,11)
    const employeeId = tmpEmploymentYear + tmpEmploymentMonth + tmpRandomDigits

    //* PUSH DATA TO DATABASE
    const employee = await prisma.employee.update({
      where: {
        id: id
      },
      data: {
        employeeId: employeeId,
        fullName: fullName,
        email: email,
        username: username,
        address: address,
        birthdate: new Date(birthdate),
        employmentDate: new Date(employmentDate),
        position: position,
      }
    })

    const res = {
      status: 'ok', 
      message: 'Employee creation successful', 
      data: {
        id: employee.id
      }
    }

    return NextResponse.json(res)
  }catch(err){
    console.log(err)
    return NextResponse.error()
  }
}