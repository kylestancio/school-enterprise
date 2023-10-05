import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest){

  //* CHECK IF USER IS LOGGED IN AND HAS THE PROPER ROLE
  try{
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("User is not logged in")
    const { user } = session
    if (!user.roles.includes('EMPLOYEESMANAGER')) throw new Error("User does not have proper role")
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
  
  try{
    //* NEED TO USE FORM DATA TO ACCOMMODATE IMAGE UPLOAD IN THE FUTURE
    const formData = await req.formData()

    //* EXTRACT ALL FORM DATA
    const username = formData.get('username')?.toString()
    const fullName = formData.get('fullName')?.toString()
    const email = formData.get('email')?.toString()
    const address = formData.get('address')?.toString()
    const birthdate = formData.get('birthdate')?.toString()
    const employmentDate = formData.get('employmentDate')?.toString()
    const position = formData.get('position')?.toString()

    //* MAKE SURE DATA IS NOT NULL
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

    //* GENERATE INITIAL PASSWORD WHICH WILL BE SENT TO THE EMPLOYEE, PROMPTING THEM TO CHANGE
    const generatedPassword = Math.random().toString(36).slice(10)
    const password = bcrypt.hashSync(generatedPassword, 10)
    
    //* PUSH DATA TO DATABASE
    const employee = await prisma.employee.create({
      data: {
        employeeId: employeeId,
        fullName: fullName,
        email: email,
        username: username,
        password: password,
        address: address,
        birthdate: new Date(birthdate),
        employmentDate: new Date(employmentDate),
        position: position,
      }
    })

    // TODO: CREATE A FUNCTION TO SEND THE GENERATED PASSWORD TO THE USER, AFTER SUCCESSFUL REGISTRATION

    const res = {
      status: 'ok', 
      message: 'Employee creation successful', 
      data: {
        id: employee.id
      }
    }

    return NextResponse.json(res)
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }

}