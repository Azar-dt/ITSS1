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
    //data.sort((a, b) => b.rating - a.rating);

    return NextResponse.json({
      total,
      bikes: data,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
