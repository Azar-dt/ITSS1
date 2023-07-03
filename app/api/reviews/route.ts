import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, bikeId, rating, comment } = await req.json();

    if (!userId || !bikeId || !rating || !comment) {
      throw new Error("Please fill all fields");
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        bikeId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
