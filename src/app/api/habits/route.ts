import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "~/src/utils/prisma";

export const DELETE = async (request: Request) => {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect("/sign-in");
  }

  const { searchParams } = new URL(request.url);

  const habitId = z.coerce.number().safeParse(searchParams.get("habitId"));

  if (!habitId.success) {
    return NextResponse.json({ message: `Invalid request - ${habitId.error.message}` }, { status: 400 });
  }

  await prisma.task.deleteMany({
    where: { habitId: habitId.data },
  });
  await prisma.habitConstraint.deleteMany({
    where: { habitId: habitId.data },
  });
  await prisma.habit.delete({
    where: { id: habitId.data },
  });

  return NextResponse.json({ message: "Deleted habit succesfully" }, { status: 200 });
};
