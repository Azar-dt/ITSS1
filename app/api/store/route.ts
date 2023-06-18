import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // get query params
    const { searchParams } = new URL(req.nextUrl);
    const cursor = Number(searchParams.get("cursor"));
    const take = Number(searchParams.get("take"));
    const name = searchParams.get("name");
    const rate = searchParams.get("rate");
    const longitude = searchParams.get("longitude");
    const latitude = searchParams.get("latitude");
    const radius = searchParams.get("radius");

    // get all stores from db using prisma
    const stores = await prisma.store.findMany({
      where: {
        name: {
          contains: name || "",
        },
        rating: {
          gte: rate ? Number(rate) : 0,
        },
      },
      orderBy: {
        rating: "desc",
      },
    });

    if (longitude && latitude) {
      // sort stores by distance
      stores.sort((a, b) => {
        const distanceA = Math.sqrt(
          (a.longitude - Number(longitude)) ** 2 +
            (a.latitude - Number(latitude)) ** 2
        );
        const distanceB = Math.sqrt(
          (b.longitude - Number(longitude)) ** 2 +
            (b.latitude - Number(latitude)) ** 2
        );
        return distanceA - distanceB;
      });

      // filter stores by radius
      if (radius) {
        stores.filter((store) => {
          const distance = Math.sqrt(
            (store.longitude - Number(longitude)) ** 2 +
              (store.latitude - Number(latitude)) ** 2
          );
          return distance <= Number(radius);
        });
      }
    }

    // pagination
    const total = stores.length;
    const data = stores.slice(cursor, cursor + take);
    data.sort((a, b) => b.rating - a.rating);

    return NextResponse.json({
      total,
      stores: data,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
