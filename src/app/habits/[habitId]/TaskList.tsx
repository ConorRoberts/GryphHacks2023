"use client";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Task } from "@prisma/client";
import clsx from "clsx";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useRef, useState } from "react";

const TaskList: FC<{ tasks: Task[] }> = (props) => {
  const [tasks, setTasks] = useState<Task[]>(props.tasks);
  const todayTaskContainer = useRef<HTMLDivElement>(null);
  const todayTaskIdx = useMemo(() => {
    const d1 = dayjs().startOf("day").toDate();
    const d2 = dayjs().endOf("day").toDate();

    const todayTaskIdx = tasks.findIndex(
      (t) => t.startTime.getTime() >= d1.getTime() && t.startTime.getTime() <= d2.getTime()
    );

    return todayTaskIdx;
  }, [tasks]);

  const [yesterday, today, tomorrow, ...remainingTasks] = [
    tasks[todayTaskIdx - 1] ?? null,
    tasks[todayTaskIdx] ?? null,
    tasks[todayTaskIdx + 1] ?? null,
    ...tasks,
  ];

  const toggleComplete = async (taskId: number) => {
    // The new value of isComplete for this task
    let isComplete = false;

    const newTasks = tasks.map((t) => {
      if (t.id === taskId) {
        isComplete = !t.isComplete;
      }
      return t.id === taskId ? { ...t, isComplete: !t.isComplete } : t;
    });

    setTasks(newTasks);

    try {
      await fetch("/api/habits/complete", { body: JSON.stringify({ taskId, isComplete }), method: "POST" });
    } catch (e) {
      setTasks(tasks.map((t) => (t.id === taskId ? { ...t, isComplete: !t.isComplete } : t)));
    }
  };

  useEffect(() => {
    if (todayTaskContainer.current) {
      todayTaskContainer.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div className="mx-auto max-w-xl w-full flex flex-col gap-16 divide divide-gray-100">
      {yesterday && (
        <div className="opacity-30">
          <h3>Yesterday</h3>
          <p className="font-bold text-4xl">{yesterday.description}</p>
        </div>
      )}
      {today && (
        <div className="flex flex-col" ref={todayTaskContainer}>
          <h3>Today</h3>
          <p className="font-bold text-4xl">{today.description}</p>
          <button
            className={clsx(
              "flex items-center justify-center gap-2 mx-auto px-4 py-1 mt-8 transition duration-300",
              today.isComplete ? "rounded-full bg-green-500 text-white" : "border rounded-md"
            )}
            onClick={() => toggleComplete(today.id)}
          >
            <p>Complete</p>
            <CheckCircleIcon className="w-4 h-4" />
          </button>
        </div>
      )}
      <div>
        {tomorrow && (
          <div className="text-gray-300">
            <h3>Tomorrow</h3>
            <p className="font-bold text-4xl">{tomorrow.description}</p>
          </div>
        )}
      </div>
      {remainingTasks.map((t) => (
        <div className="opacity-30" key={`task ${t.id}`}>
          <h3>{dayjs(t.startTime).format("MMM DD")}</h3>
          <p className="font-bold text-4xl">{t.description}</p>
        </div>
      ))}
      <h3 className="text-3xl font-bold opacity-30">🎉 Done 🎉</h3>
    </div>
  );
};

export default TaskList;
