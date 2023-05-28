import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "~/src/utils/prisma";
import TaskList from "./TaskList";

export const dynamic = "force-dynamic";

const Page = async (props: { params: { habitId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const tasks = await prisma.task.findMany({
    where: {
      habitId: Number(props.params.habitId),
      userId,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return (
    <div className="px-4 py-8 sm:p-8">
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Page;
