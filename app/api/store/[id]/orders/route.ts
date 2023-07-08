import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: storeId } = params;
    const orders = await prisma.order.findMany({
      where: {
        bike: {
          storeId: Number(storeId),
        },
        status: {
          not: Status.CANCELLED || Status.REJECTED,
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

export async function PUT(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      throw new Error("Invalid status or orderId information");
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
