import { Question } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "~/src/utils/prisma";

export type GetCategoryQuestionsResponse = { questions: (Question & { followUpQuestion: Question | null })[] };

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const prompt = z.string().safeParse(searchParams.get("prompt"));

  if (!prompt.success) {
    return NextResponse.json({ message: "Category name invalid" }, { status: 400 });
  }

  const questions = await prisma.question.findMany({
    where: {
      category: {
        name: prompt.data,
      },
    },
    include: {
      followUp: true,
    },
  });

  return NextResponse.json({ questions });
};
