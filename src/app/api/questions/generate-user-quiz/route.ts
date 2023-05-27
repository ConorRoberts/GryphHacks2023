import { NextResponse } from "next/server";
import { getOpenAiClient } from "~/src/utils/getOpenAiClient";

export const POST = async (request: Request) => {
  const openai = getOpenAiClient();

  const body = await request.json();

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: body.params.prompt,
    });

    return NextResponse.json({ data: completion.data.choices[0] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};
