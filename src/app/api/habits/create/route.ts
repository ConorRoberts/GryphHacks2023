import { auth } from "@clerk/nextjs";
import { Habit, Task } from "@prisma/client";
import dayjs from "dayjs";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { getOpenAiClient } from "~/src/utils/getOpenAiClient";
import { habitTaskSchema } from "~/src/utils/habitTaskSchema";
import { prisma } from "~/src/utils/prisma";

const generatedTaskSchema = habitTaskSchema.omit({ id: true });

export type CreateHabitResponse = { habit: Habit };

export const GET = async (request: Request) => {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect("/sign-in");
  }

  const { searchParams } = new URL(request.url);
  const desiredHabit = z.string().safeParse(searchParams.get("habit"));
  const currentDay = z.coerce.number().optional().default(1).safeParse(searchParams.get("day"));

  if (!desiredHabit.success) {
    return NextResponse.json({ message: "Missing or invalid `habit` field in query parameters" }, { status: 400 });
  }

  const openai = getOpenAiClient();

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Task: Starting at day ${currentDay}, create the next 5 days of a strucured plan that helps someone build a habit of ${desiredHabit.data}\n\nRequirements:\n- The plan should be optimized so that they do not feel burned out\n- After the last day of the plan, the habit should be deeply built into their life and feel effortless to maintain\nOutput:- Format the output as JSON with the format [{day: number, action: string, duration: number}]. Do not include any text other than the JSON output.\n- The "action" field of the returned JSON represents the action they must take on a given day. It should be concise, clear, and relate directly to their habit goal.\n- For the duration of the habit building, there should be exactly one action per day`,
      },
    ],
  });

  const content = completion.data.choices[0].message?.content;

  try {
    if (content) {
      const parsedContent = JSON.parse(content);
      const validatedContent = generatedTaskSchema.array().parse(parsedContent);

      const tasks: Omit<Task, "habitId" | "id">[] = validatedContent.map((t) => ({
        description: t.action,
        isComplete: false,
        duration: t.duration,
        startTime: dayjs().add(t.day, "days").toDate(),
        userId,
      }));

      const newHabit = await prisma.habit.create({
        data: {
          userId,
          name: desiredHabit.data,
          timeframe: new Date(),
          tasks: {
            createMany: { data: tasks },
          },
        },
      });

      return NextResponse.json({ habit: newHabit });
    }
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(
        { message: `Text generation did not match expected schema: ${e.message}` },
        { status: 500 }
      );
    } else if (e instanceof Error) {
      return NextResponse.json({ message: `Unexpected error: ${e.message}` }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Text generation came back empty" }, { status: 500 });
};
