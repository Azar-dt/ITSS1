import prisma from "@/prisma/client";
import { Store } from "@prisma/client";
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
    let stores: Store[] = [];

    // get all stores from db using prisma
    stores = await prisma.store.findMany({
      where: {
        name: {
          contains: name || "",
        },
        rating: {
          gte: rate ? Number(rate) : 0,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (longitude && latitude) {
      // sort stores by distance
      stores.sort((a, b) => {
        const distanceA = getDistance(
          a.latitude,
          a.longitude,
          Number(latitude),
          Number(longitude)
        );
        const distanceB = getDistance(
          b.latitude,
          b.longitude,
          Number(latitude),
          Number(longitude)
        );
        return distanceA - distanceB;
      });

      // filter stores by radius
      if (radius) {
        stores = stores.filter((store) => {
          const distance = getDistance(
            store.latitude,
            store.longitude,
            Number(latitude),
            Number(longitude)
          );
          return distance <= Number(radius);
        });
      }
    }

    // pagination
    const total = stores.length;
    stores = stores.slice(cursor, cursor + take);

    return NextResponse.json({
      total,
      stores,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const earthRadius = 6371; // Earth's radius in kilometers

  // Convert latitude and longitude to radians
  const radLat1 = toRadians(lat1);
  const radLon1 = toRadians(lon1);
  const radLat2 = toRadians(lat2);
  const radLon2 = toRadians(lon2);

  // Calculate the differences between latitudes and longitudes
  const deltaLat = radLat2 - radLat1;
  const deltaLon = radLon2 - radLon1;

  // Use the Haversine formula to calculate the distance
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}
