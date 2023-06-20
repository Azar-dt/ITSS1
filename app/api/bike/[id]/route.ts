import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const bike = await prisma.bike.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(bike);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
