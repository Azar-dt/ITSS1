import prisma from "@/prisma/client";
import { Bike, BikeType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // get query params
    const { searchParams } = new URL(req.nextUrl);
    const cursor = Number(searchParams.get("cursor"));
    const take = Number(searchParams.get("take"));
    const storeId = searchParams.get("storeId");
    const price = searchParams.get("price");
    const type = searchParams.get("type");
    const rate = searchParams.get("rate");
    let bikes: Bike[] = [];

    // get all stores from db using prisma
    bikes = await prisma.bike.findMany({
      where: {
        price: {
          lte: price ? Number(price) : undefined,
        },
        rating: {
          gte: rate ? Number(rate) : 0,
        },
        type: type ? { equals: type as BikeType } : undefined,
        storeId: storeId ? { equals: Number(storeId) } : undefined,
      },
      orderBy: {
        rating: "desc",
      },
    });

    // pagination
    const total = bikes.length;
    bikes = bikes.slice(cursor, cursor + take);

    return NextResponse.json({
      total,
      bikes,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // const { userId, bikeId, startTime, endTime } = req.body;
    // const { searchParams } = new URL(req.nextUrl);
    const { userId, bikeId, email, phoneNumber, startTime, endTime, name } =
      await req.json();

    if (!userId || !bikeId || !startTime || !endTime) {
      throw new Error("Invalid user, bike, or time information");
    }
    const order = await prisma.order.create({
      data: {
        userId,
        bikeId: Number(bikeId),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        email,
        phoneNumber,
        name,
      },
    });

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
