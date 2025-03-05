import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Get all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST - Create a new user
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await prisma.user.create({
      data
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// PUT - Update user by ID
export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE - Delete user by ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}