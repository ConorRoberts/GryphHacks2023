import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "~/src/utils/prisma";

const toggleCompleteRequest = z.object({
  taskId: z.coerce.number(),
  isComplete: z.coerce.boolean(),
});

export const POST = async (request: Request) => {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect("/sign-in");
  }

  const body = toggleCompleteRequest.safeParse(await request.json());

  if (!body.success) {
    return NextResponse.json({ message: "Invalid body" }, { status: 500 });
  }

  await prisma.task.updateMany({
    where: {
      userId,
      id: body.data.taskId,
    },
    data: {
      isComplete: body.data.isComplete,
    },
  });

  return NextResponse.json({ message: "Update successful" }, { status: 200 });
};
