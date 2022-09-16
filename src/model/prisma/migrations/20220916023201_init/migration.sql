-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('ADMIN', 'PRESIDENT', 'SECRETARY', 'TREASURER', 'PROGRAM_DIRECTOR', 'MEMBER');

-- CreateEnum
CREATE TYPE "ScopeName" AS ENUM ('CREATE_ADMIN_USER', 'UPDATE_ADMIN_USER', 'DELETE_ADMIN_USER', 'CREATE_PRESIDENT_USER', 'UPDATE_PRESIDENT_USER', 'DELETE_PRESIDENT_USER', 'CREATE_SECRETARY_USER', 'UPDATE_SECRETARY_USER', 'DELETE_SECRETARY_USER', 'CREATE_TREASURER_USER', 'UPDATE_TREASURER_USER', 'DELETE_TREASURER_USER', 'CREATE_USER', 'UPDATE_USER', 'DELETE_USER', 'SEE_ALL_USERS', 'CREATE_MEMBER', 'UPDATE_MEMBER', 'DELETE_MEMBER', 'SEE_ALL_MEMBERS', 'CREATE_MINISTRY', 'UPDATE_MINISTRY', 'DELETE_MINISTRY', 'CREATE_OCCUPATION', 'UPDATE_OCCUPATION', 'DELETE_OCCUPATION', 'ADD_MEMBER_TO_MINISTRY', 'REMOVE_MEMBER_FROM_MINISTRY', 'ADD_MEMBER_TO_OCCUPATION', 'REMOVE_MEMBER_FROM_OCCUPATION');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(80) NOT NULL,
    "birthDate" VARCHAR(10) NOT NULL,
    "nationality" VARCHAR(100) NOT NULL,
    "fatherName" VARCHAR(80) NOT NULL,
    "motherName" VARCHAR(80) NOT NULL,
    "civilStatus" VARCHAR(50) NOT NULL,
    "rg" VARCHAR(10),
    "rgEmissionDate" VARCHAR(10),
    "rgDispatcher" VARCHAR(50),
    "cpf" VARCHAR(11),
    "email" VARCHAR(50),
    "phone" VARCHAR(20),
    "mobilePhone" VARCHAR(20),
    "street" VARCHAR(50) NOT NULL,
    "number" INTEGER,
    "complement" VARCHAR(50),
    "district" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "state" "State" NOT NULL DEFAULT 'RJ',
    "profession" VARCHAR(50),
    "congregated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "roleName" "RoleName" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occupation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Occupation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberMinistry" (
    "memberId" INTEGER NOT NULL,
    "ministryId" INTEGER NOT NULL,

    CONSTRAINT "MemberMinistry_pkey" PRIMARY KEY ("memberId","ministryId")
);

-- CreateTable
CREATE TABLE "MemberOccupation" (
    "memberId" INTEGER NOT NULL,
    "occupationId" INTEGER NOT NULL,

    CONSTRAINT "MemberOccupation_pkey" PRIMARY KEY ("memberId","occupationId")
);

-- CreateTable
CREATE TABLE "Ministry" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Ministry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" "RoleName" NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scope" (
    "id" SERIAL NOT NULL,
    "name" "ScopeName" NOT NULL,

    CONSTRAINT "Scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleScope" (
    "roleId" INTEGER NOT NULL,
    "scopeId" INTEGER NOT NULL,

    CONSTRAINT "RoleScope_pkey" PRIMARY KEY ("roleId","scopeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Occupation_name_key" ON "Occupation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ministry_name_key" ON "Ministry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Scope_name_key" ON "Scope"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_email_fkey" FOREIGN KEY ("email") REFERENCES "Member"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "Role"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberMinistry" ADD CONSTRAINT "MemberMinistry_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberMinistry" ADD CONSTRAINT "MemberMinistry_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "Ministry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberOccupation" ADD CONSTRAINT "MemberOccupation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberOccupation" ADD CONSTRAINT "MemberOccupation_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleScope" ADD CONSTRAINT "RoleScope_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleScope" ADD CONSTRAINT "RoleScope_scopeId_fkey" FOREIGN KEY ("scopeId") REFERENCES "Scope"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
