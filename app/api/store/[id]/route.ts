import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const store = await prisma.store.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
