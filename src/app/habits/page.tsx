import { auth } from "@clerk/nextjs";
import Link from "next/link";
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

  return (
    <div className="p-4 sm:p-8">
      <div className="mx-auto w-full max-w-xl shadow-lg rounded-xl overflow-hidden flex flex-col">
        {habits.map((h) => (
          <Link
            key={`habit ${h.id}`}
            href={`/habits/${h.id}`}
            className="hover:bg-gray-50 transition duration-50 bg-white p-4"
          >
            <h3 className="capitalize font-bold text-xl">{h.name}</h3>
            <p className="text-gray-500 text-sm">Complete by {h.timeframe.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
