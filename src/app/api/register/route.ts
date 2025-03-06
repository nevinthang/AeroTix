import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      username,
      password,
      email,
      name,
      passport,
      passport_exp,
      birthdate,
      phoneNumber,
      title,
    } = body;

    if (
      !username ||
      !password ||
      !email ||
      !name ||
      !passport ||
      !passport_exp ||
      !birthdate ||
      !phoneNumber ||
      !title
    ) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        name,
        passport,
        passport_exp: new Date(passport_exp),
        birthdate: new Date(birthdate),
        phoneNumber,
        title,
      },
    });

    return NextResponse.json({ message: "User registered successfully", user }, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
