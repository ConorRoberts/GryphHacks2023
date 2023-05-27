"use client";

import { useRouter } from "next/navigation";
import { CreateHabitResponse } from "../api/habits/create/route";

/**
 * This button is just for testing and should not be used in the final product.
 */
const CreateHabitButton = () => {
  const router = useRouter();

  const createRandomHabit = async (desiredHabit: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set("habit", desiredHabit);
    searchParams.set("day", "1");

    const res = await fetch(`/api/habits/create?${searchParams.toString()}`);

    return (await res.json()) as CreateHabitResponse;
  };

  return (
    <button
      onClick={async () => {
        await createRandomHabit("jogging");
        router.refresh();
      }}
    >
      Create Habit
    </button>
  );
};

export default CreateHabitButton;
