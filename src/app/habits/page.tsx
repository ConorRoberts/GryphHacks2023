import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "~/src/utils/prisma";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const habits = await prisma.habit.findMany({
    where: {
      userId,
    },
  });

  return <div>{JSON.stringify(habits)}</div>;
};

export default Page;
