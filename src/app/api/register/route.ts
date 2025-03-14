import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
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

    // Validate required fields
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
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
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

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    // Handle Prisma unique constraint violations
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const field = error.meta?.target as string[];

        if (field) {
          const fieldName = field[0];
          return NextResponse.json(
            {
              message: `This ${fieldName} is already registered. Please use a different ${fieldName}.`,
            },
            { status: 409 }
          );
        }
      }
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
