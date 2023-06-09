import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params;
    const reviews = await prisma.review.findMany({
      where: {
        bike: {
          storeId: Number(storeId),
        },
      },
      include: {
        bike: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
