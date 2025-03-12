import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const prisma = new PrismaClient();

// GET: Mengambil data profil user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        birthdate: true,
        passport: true,
        passport_exp: true,
        loyaltyPoints: true,
        membershipTier: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: Update data profil user
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    const data = await req.json();
    
    // Validasi data yang boleh diupdate
    const allowedFields = [
      "name",
      "phoneNumber",
      "passport",
      "passport_exp",
      "nik"
    ];
    
    const updateData: any = {};
    
    allowedFields.forEach((field) => {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    });
    
    // Validasi format data
    if (data.passport_exp) {
      updateData.passport_exp = new Date(data.passport_exp);
    }
    
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        birthdate: true,
        passport: true,
        passport_exp: true,
        loyaltyPoints: true,
        membershipTier: true,
      },
    });
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Rute untuk mendapatkan detail membership tier dan poin
export async function GETLoyalty(req: NextRequest) {
  try {
    const url = new URL(req.url);
    if (url.pathname.endsWith('/loyalty')) {
      const session = await getServerSession(authOptions);
      
      if (!session?.user) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
      
      const userId = session.user.id;
      
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          loyaltyPoints: true,
          membershipTier: true,
        },
      });
      
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      
      // Informasi tentang tier berikutnya
      const tierThresholds = {
        BRONZE: 0,
        SILVER: 500,
        GOLD: 1000, 
        PLATINUM: 2500
      };
      
      const currentTier = user.membershipTier;
      let nextTier = null;
      let pointsToNextTier = null;
      
      if (currentTier !== 'PLATINUM') {
        const tiers: (keyof typeof tierThresholds)[] = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];
        const currentIndex = tiers.indexOf(currentTier);
        nextTier = tiers[currentIndex + 1];
        pointsToNextTier = tierThresholds[nextTier] - user.loyaltyPoints;
      }
      
      return NextResponse.json({
        ...user,
        nextTier,
        pointsToNextTier
      });
    }
  } catch (error) {
    console.error("Error fetching loyalty data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}