import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import CreateHabitButton from "./habits/CreateHabitButton";

const Navigation = () => {
  const { userId } = auth();
  return (
    <div className="flex justify-between p-2 border-b border-gray-100 backdrop-blur bg-white/70 sticky top-0 left-0 right-0 items-center">
      <div>
        {/* TODO remove */}
        {userId && (
          <Link
            href="/habits"
            className="rounded hover:bg-gray-50 transition duration-75 px-3 py-0.5 font-medium text-sm flex items-center justify-center"
          >
            <p>Habits</p>
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2">
        <CreateHabitButton />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
export default Navigation;
