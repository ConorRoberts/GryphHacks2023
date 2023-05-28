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

export const POST = async (request: Request) => {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect("/sign-in");
  }

  const body = await request.json();
  // const { searchParams } = new URL(request.url);
  // const desiredHabit = z.string().safeParse(searchParams.get("habit"));
  // const currentDay = z.coerce.number().optional().default(1).safeParse(searchParams.get("day"));

  // if (!desiredHabit.success) {
  //   return NextResponse.json({ message: "Missing or invalid `habit` field in query parameters" }, { status: 400 });
  // }

  const currentDay = body.params.currentDay;
  const habit = body.params.habit;
  const prompt = body.params.propmt;

  const openai = getOpenAiClient();

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Task: Starting at day ${currentDay}, create the next 5 days of a strucured plan that helps someone build a habit of \n\nRequirements:\n- The plan should be optimized so that they do not feel burned out\n- After the last day of the plan, the habit should be deeply built into their life and feel effortless to maintain\nOutput:- Format the output as JSON with the format [{day: number, action: string, duration: number}]. The output should contain no other characters other than the JSON\n- The "action" field of the returned JSON represents the action they must take on a given day. It should be concise, clear, and relate directly to their habit goal.\n- For the duration of the habit building, there should be exactly one action per day.\n- Your response should contain no text other than the JSON array`,
      },
    ],
  });

  // Loop through the choices until one doesn't throw an error
  for (const choice of completion.data.choices) {
    try {
      const content = choice.message?.content;

      if (content) {
        const parsedContent = JSON.parse(content);
        const validatedContent = generatedTaskSchema.array().parse(parsedContent);

        const tasks: Omit<Task, "habitId" | "id">[] = validatedContent.map((t) => ({
          description: t.action,
          isComplete: false,
          duration: t.duration,
          startTime: dayjs()
            .startOf("day")
            .add(t.day - 1, "days")
            .toDate(),
          userId,
        }));

        const newHabit = await prisma.habit.create({
          data: {
            userId,
            name: habit,
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
        console.error(`Text generation did not match expected schema: ${e.message}`);
      } else if (e instanceof Error) {
        console.error(`Unexpected error: ${e.message}`);
      } else {
        console.error("Unknown error");
      }
    }
  }

  return NextResponse.json({ message: "No valid completion choice" }, { status: 500 });
};
