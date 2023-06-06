import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// hello api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
}
