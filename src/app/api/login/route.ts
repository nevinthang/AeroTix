import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";// Pastikan Anda memiliki fungsi untuk JWT
import { signJwt } from "@/lib/jwt"; 

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const token = signJwt({ id: user.id, username: user.username });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}