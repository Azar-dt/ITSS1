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

    // update store rating
    const store = await prisma.store.findFirstOrThrow({
      where: {
        bikes: {
          some: {
            id: bikeId,
          },
        },
      },
    });

    const allReviews = await prisma.review.findMany({
      where: {
        bike: {
          storeId: store.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalRating = allReviews.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0);

    const averageRating = totalRating / allReviews.length;

    await prisma.store.update({
      where: {
        id: store.id,
      },
      data: {
        rating: averageRating,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
