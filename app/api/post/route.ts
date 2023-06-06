import prisma from "@/prisma/client";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify({ users: users }), { status: 200 });
}
