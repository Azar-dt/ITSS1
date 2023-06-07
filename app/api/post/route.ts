import prisma from "@/prisma/client";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  const posts = await prisma.post.findMany();
  return new Response(JSON.stringify({ posts: posts }), { status: 200 });
}
