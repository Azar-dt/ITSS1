import prisma from "@/prisma/client";
import { BikeType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // get query params
    const { searchParams } = new URL(req.nextUrl);
    const price = searchParams.get("price");
    const type = searchParams.get("type");
    const rate = searchParams.get("rate");

    // get all stores from db using prisma
    const bikes = await prisma.bike.findMany({
      where: {
        price: {
          lte: price ? Number(price) : 100000,
        },
        rating: {
          gte: rate ? Number(rate) : 0,
        },
        type: type ? { equals: type as BikeType } : undefined,
      },
      orderBy: {
        rating: "desc",
      },
    });

    // pagination
    const total = bikes.length;
    const data = bikes;
    // data.sort((a, b) => b.rating - a.rating);

    return NextResponse.json({
      total,
      bikes: data,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // const { userId, bikeId, startTime, endTime } = req.body;
    // const { searchParams } = new URL(req.nextUrl);
    const { userId, bikeId, email, phoneNumber, startTime, endTime } =
      await req.json();
    // const userId = searchParams.get("userId");
    // const bikeId = searchParams.get("bikeId");
    // const startTime = searchParams.get("startTime");
    // const endTime = searchParams.get("endTime");
    // Create a new order using Prisma
    // Ensure that userId and bikeId are not null
    if (!userId || !bikeId || !startTime || !endTime) {
      throw new Error("Invalid user, bike, or time information");
    }
    const order = await prisma.order.create({
      data: {
        userId,
        bikeId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
