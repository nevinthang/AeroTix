import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Sesuaikan dengan path NextAuth-mu
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { loyaltyPoints: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ loyaltyPoints: user.loyaltyPoints }, { status: 200 });
  } catch (error) {
    console.error("Error fetching loyalty points:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

