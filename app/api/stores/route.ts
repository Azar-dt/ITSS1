import prisma from "@/prisma/client";

export async function GET() {
  const stores = await prisma.store.findMany();
  return new Response(JSON.stringify({ stores }), { status: 200 });
}
