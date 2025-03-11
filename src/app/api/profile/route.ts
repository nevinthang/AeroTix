// app/api/users/[...user]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

// Handle GET and PUT for /api/users/profile/[userId]
export async function GET(
  request: NextRequest,
  { params }: { params: { user: string[] } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Parse route params
    const [action, userId] = params.user;
    
    // Handle different actions
    if (action === "profile") {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      
      return NextResponse.json(user);
    } 
    else if (action === "bookings") {
      const bookings = await prisma.booking.findMany({
        where: { userId: userId },
        orderBy: { date: "desc" },
      });
      
      return NextResponse.json(bookings);
    } 
    else if (action === "history") {
      const history = await prisma.history.findMany({
        where: { userId: userId },
        orderBy: { timestamp: "desc" },
      });
      
      return NextResponse.json(history);
    }
    
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { user: string[] } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const [action, userId] = params.user;
    const data = await request.json();
    
    if (action === "profile") {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          birthday: data.birthday,
          gender: data.gender,
          updatedAt: new Date(),
        },
      });
      
      return NextResponse.json(updatedUser);
    }
    
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { user: string[] } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const [action, userId] = params.user;
    const data = await request.json();
    
    if (action === "bookings") {
      const newBooking = await prisma.booking.create({
        data: {
          userId: userId,
          title: data.title,
          date: new Date(data.date),
          status: data.status || "Pending",
        },
      });
      
      // Add history entry for booking
      await prisma.history.create({
        data: {
          userId: userId,
          activity: `Booked: ${data.title}`,
        },
      });
      
      return NextResponse.json(newBooking, { status: 201 });
    } 
    else if (action === "loyalty-points") {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      
      const updatedPoints = user.loyaltyPoints + data.points;
      
      // Check if user should upgrade membership level
      let membershipLevel = user.membershipLevel;
      if (updatedPoints >= 5000) {
        membershipLevel = "Platinum";
      } else if (updatedPoints >= 3000) {
        membershipLevel = "Gold";
      } else if (updatedPoints >= 1000) {
        membershipLevel = "Silver";
      }
      
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          loyaltyPoints: updatedPoints,
          membershipLevel: membershipLevel,
        },
      });
      
      // Add to history
      await prisma.history.create({
        data: {
          userId: userId,
          activity: `Earned ${data.points} loyalty points`,
        },
      });
      
      return NextResponse.json(updatedUser);
    }
    
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// Prisma schema reference (place in prisma/schema.prisma):
/*
model User {
  id                  String    @id @default(uuid())
  name                String
  email               String    @unique
  username            String    @unique
  password            String
  phone               String?
  address             String?
  birthday            String?
  gender              String?
  membershipLevel     String    @default("Basic")
  loyaltyPoints       Int       @default(0)
  memberId            String    @unique
  membershipValidUntil String
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  bookings            Booking[]
  history             History[]
}

model Booking {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  title     String
  date      DateTime
  status    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model History {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  activity  String
  timestamp DateTime @default(now())
}
*/