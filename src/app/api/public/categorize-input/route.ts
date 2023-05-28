import { NextResponse } from "next/server";
import { z } from "zod";
import { categorizeInput } from "~/src/utils/categorizeInput";
import { prisma } from "~/src/utils/prisma";

const categorizeInputRequest = z.object({ input: z.string(), tier: z.coerce.number().gt(0).catch(1) });
export type GetInputCategoryResponse = { category: string };

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

  const result = await categorizeInput(
    params.data.input,
    possibleCategories.map((e) => e.name)
  );

  return NextResponse.json({ category: result.labels[0] });
};
