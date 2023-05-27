import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "~/src/utils/prisma";

const categorizeInputRequest = z.object({ input: z.string(), tier: z.coerce.number().gt(0).catch(1) });

type CategorizationResult = {
  sequence: string;
  labels: string[];
  scores: number[];
};

export type GetInputCategoryResponse = { category: string };

const categorize = async (inputs: string, categories: string[]) => {
  const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-mnli", {
    headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
    method: "POST",
    body: JSON.stringify({ inputs, parameters: { candidate_labels: categories } }),
  });
  const result = (await response.json()) as CategorizationResult;

  return result;
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const params = categorizeInputRequest.safeParse({
    input: searchParams.get("input"),
    tier: searchParams.get("tier"),
  });

  if (!params.success) {
    return NextResponse.json({ message: `Invalid request - ${params.error.message}` }, { status: 400 });
  }

  const possibleCategories = await prisma.habitCategory.findMany({
    where: {
      tier: params.data.tier,
    },
  });

  const result = await categorize(
    params.data.input,
    possibleCategories.map((e) => e.name)
  );

  return NextResponse.json({ category: result.labels[0] });
};
