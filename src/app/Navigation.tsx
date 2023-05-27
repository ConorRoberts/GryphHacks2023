import { UserButton, auth } from "@clerk/nextjs";
import { HomeIcon, QueueListIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CreateHabitButton from "./habits/CreateHabitButton";

const Navigation = () => {
  const { userId } = auth();
  return (
    <>
      <div className="sm:flex justify-between p-2 border-b border-gray-100 backdrop-blur bg-white/70 sticky top-0 left-0 right-0 items-center hidden">
        <div>
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
      <div className="flex px-4 border border-gray-100 backdrop-blur z-10 fixed bottom-0 left-0 right-0 pb-2 justify-evenly items-center sm:hidden">
        <Link
          href="/"
          className="rounded hover:bg-gray-50 transition duration-75 px-3 py-2 pb-4 flex items-center justify-center"
        >
          <HomeIcon className="w-8 h-8 text-gray-600 hover:text-gray-700 transition duration-75" />
        </Link>
        {userId && (
          <Link
            href="/habits"
            className="rounded hover:bg-gray-50 transition duration-75 px-3 py-2 pb-4 flex items-center justify-center"
          >
            <QueueListIcon className="w-8 h-8 text-gray-600 hover:text-gray-700 transition duration-75" />
          </Link>
        )}
        {userId && <UserButton afterSignOutUrl="/" />}
      </div>
    </>
  );
};
export default Navigation;
