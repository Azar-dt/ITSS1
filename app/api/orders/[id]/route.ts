import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const orders = await prisma.order.findMany({
      where: {
        userId: id,
        status: {
          not: Status.CANCELLED,
        },
        bike: {
          reviews: {
            none: {
              userId: id,
            },
          },
        },
      },
      include: {
        bike: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
