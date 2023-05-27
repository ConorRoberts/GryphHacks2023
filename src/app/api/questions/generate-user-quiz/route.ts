import { NextResponse } from "next/server";
import { getOpenAiClient } from "~/src/utils/getOpenAiClient";

export const POST = async (request: Request) => {
  const openai = getOpenAiClient();

  const body = await request.json();

  const prompt = `I want to build a habit of ${body.params.prompt}. Create a valid JSON array array of 10 objects each object should contain two attributes, a question and options. The question should gather more information about me and also ask some questions regarding specific constraints that may limit my ability to build my habit plan (a question can either require input or be multiple choice but never be both, multiple choice questions cannot be have input, and questions that require input cannot have multiple options). The option attribute should be an array of options  only if the question is multiple choice. If the question requires an input, the option attribute should have a value of  'input required'. Now generate some multiple choice questions and some questions that require an input.  A question that requires an input and is not multiple choice MUST NOT have any other options. If a question requires an input there must only be one option and it should be 'input required'. Understand that you need to generate at least two questions that requires an input, please remember to generate at least two questions that require an input.'.`;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.data.choices[0].message?.content || null;
    if (content) {
      const generatedQuestions = JSON.parse(content);
      return NextResponse.json({ data: generatedQuestions }, { status: 200 });
    } else {
      return NextResponse.json("Could not generate questions");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};
