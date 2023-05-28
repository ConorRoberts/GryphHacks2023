"use client";

import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Habit } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

const HabitListElement: FC<{ data: Habit }> = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const deleteHabit = async () => {
    setIsLoading(true);
    const searchParams = new URLSearchParams();
    searchParams.set("habitId", props.data.id.toString());
    await fetch(`/api/habits?${searchParams.toString()}`, { method: "DELETE" });
    setIsLoading(false);

    router.refresh();
  };

  return (
    <Link href={`/habits/${props.data.id}`} className="hover:bg-gray-50 transition duration-50 bg-white p-5 relative">
      <h3 className="capitalize font-bold text-4xl">{props.data.name}</h3>
      <p className="text-gray-500 text-sm">Complete by {dayjs(props.data.timeframe).format("MMM DD YYYY")}</p>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await deleteHabit();
        }}
        className="text-gray-400 hover:bg-gray-100 transition duration-75 rounded-full p-1 absolute top-2 right-2 z-10"
      >
        {isLoading ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <TrashIcon className="w-5 h-5" />}
      </button>
    </Link>
  );
};

export default HabitListElement;
