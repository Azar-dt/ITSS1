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
      },
      include: {
        bike: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
