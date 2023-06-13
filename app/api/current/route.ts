import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  try {
    const currentUser = await serverAuth();

    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
