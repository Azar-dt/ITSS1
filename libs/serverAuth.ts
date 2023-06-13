import prisma from "@/prisma/client";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    return null;
  }

  return currentUser;
};

export default serverAuth;
