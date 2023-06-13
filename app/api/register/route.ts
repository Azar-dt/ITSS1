import prisma from "@/prisma/client";
import argon2 from "argon2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();
    if (!email || !username || !password) {
      throw new Error("Please fill all fields");
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) throw new Error("User already exists");

    const hashedPassword = await argon2.hash(password);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
