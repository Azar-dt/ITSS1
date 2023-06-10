import prisma from "@/prisma/client";

export async function GET() {
  const posts = await prisma.post.findMany();
  return new Response(JSON.stringify({ posts }), { status: 200 });
}
