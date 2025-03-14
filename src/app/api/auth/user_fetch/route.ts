import { NextResponse } from "next/server";
 import { getServerSession } from "next-auth/next";
 import { PrismaClient } from "@prisma/client";
 import { authOptions } from "@/lib/auth";
 
 const prisma = new PrismaClient();
 
 export async function GET() {
   try {
     // Get the session using getServerSession
     const session = await getServerSession(authOptions);
     
     // If no session or user, return error response
     if (!session || !session.user) {
       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
     }
     
     // Fetch the complete user data from the database
     const currentUser = await prisma.user.findUnique({
       where: {
         id: session.user.id,
       },
       select: {
         id: true,
         username: true,
         email: true,
         name: true,
         title: true,
         phoneNumber: true,
         birthdate: true,
         passport: true,
         passport_exp: true,
         loyaltyPoints: true,
         createdAt: true,
         updatedAt: true,
         isAdmin: true,
       },
     });
     
     if (!currentUser) {
       return NextResponse.json({ error: "User not found" }, { status: 404 });
     }
     
     // Return the user data as a proper NextResponse
     return NextResponse.json(currentUser);
   } catch (error) {
     console.error("Error fetching current user:", error);
     return NextResponse.json(
       { error: "Failed to fetch user details" }, 
       { status: 500 }
     );
   }
 }