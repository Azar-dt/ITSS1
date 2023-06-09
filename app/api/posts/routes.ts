import prisma from "@/prisma/client";

export async function Get(_request: Request) {
  // const posts = await prisma.post.findMany({});
  // return new Response(JSON.stringify(posts), {
  //   status: 200,
  // });
  return new Response("Hello World", {
    status: 200,
  });
}
