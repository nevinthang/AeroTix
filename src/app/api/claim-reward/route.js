// app/api/claim-reward/route.js
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to claim rewards" },
        { status: 401 }
      );
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Parse the request body
    const data = await req.json();
    const { rewardId, points } = data;

    // Validate the points
    if (user.loyaltyPoints < points) {
      return NextResponse.json(
        { error: "Insufficient points to claim this reward" },
        { status: 400 }
      );
    }

    // Update the user's loyalty points
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        loyaltyPoints: user.loyaltyPoints - points,
      },
    });

    // Here you could also create a record of the claimed reward
    // For example:
    /*
    await prisma.rewardClaim.create({
      data: {
        userId: user.id,
        rewardId,
        pointsSpent: points,
        claimedAt: new Date(),
      },
    });
    */

    return NextResponse.json({ 
      success: true,
      message: "Reward claimed successfully",
      newPoints: updatedUser.loyaltyPoints 
    });
    
  } catch (error) {
    console.error("Error claiming reward:", error);
    return NextResponse.json(
      { error: "Failed to claim reward" },
      { status: 500 }
    );
  }
}