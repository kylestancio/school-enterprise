/*
  Warnings:

  - Added the required column `employmentDate` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('DEACTIVATED', 'CONFIRMATIONSENT', 'ACTIVATED');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "employmentDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "EmployeeStatus" NOT NULL DEFAULT 'CONFIRMATIONSENT';
