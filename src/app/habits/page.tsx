import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "~/src/utils/prisma";
import HabitListElement from "./HabitListElement";

export const revalidate = 0;
export const runtime = "nodejs";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const habits = await prisma.habit.findMany({
    where: {
      userId,
    },
    orderBy: {
      timeframe: "asc",
    },
  });

  return (
    <div className="p-4 sm:p-8 flex flex-col">
      {habits.length === 0 && (
        <>
          <p className="text-center text-gray-500">No habit plans</p>
          <Link
            href="/"
            className="mx-auto bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition duration-75 font-medium mt-2 px-2 py-0.5"
          >
            Create a Habit Plan
          </Link>
        </>
      )}
      {habits.length > 0 && (
        <div className="mx-auto w-full max-w-xl shadow-lg rounded-xl overflow-hidden flex flex-col border border-gray-100 divide-y divide-gray-100">
          {habits.map((h) => (
            <HabitListElement data={h} key={`habit ${h.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
