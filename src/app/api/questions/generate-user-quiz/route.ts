import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAiClient } from "~/src/utils/getOpenAiClient";

const generatedQuestionSchema = z.object({ question: z.string(), options: z.string().array() }).array();
const generateUserQuizRequestSchema = z.object({ prompt: z.string() });

export const POST = async (request: Request) => {
  try {
    const openai = getOpenAiClient();

    const body = generateUserQuizRequestSchema.safeParse(await request.json());

    if (!body.success) {
      return NextResponse.json({ message: `Invalid body - ${JSON.stringify(body.error.message)}` }, { status: 400 });
    }

    const prompt = `I want to build a habit of ${body.data.prompt}. Create a valid JSON array array of 5 objects each object should contain two attributes, a question and options. The question should gather more information about me and also ask some questions regarding specific constraints that may limit my ability to build my habit plan (a question can either require input or be multiple choice but never be both, multiple choice questions cannot be have input, and questions that require input cannot have multiple options). The options attribute should be an array of options  only if the question is multiple choice. If the question requires an input, the option attribute should be an empty array. Now generate some multiple choice questions and some questions that require an input.  A question that requires an input and is not multiple choice MUST NOT have any other options. If a question requires an input there must no options . Understand that you need to generate at least two questions that require an input, please remember to generate at least two questions that require an input.'.`;
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
      const validatedQuestions = generatedQuestionSchema.parse(generatedQuestions);
      return NextResponse.json(
        {
          // Format to match question schema in DB
          questions: validatedQuestions.map((q) => ({
            prompt: q.question,
            options: q.options,
            type: q.options.length > 0 ? "multiple" : "input",
            categoryId: -1,
            followUpId: null,
            // Negative integers for IDs so that we don't collide with any in our DB
            id: Math.floor(Math.random() * 10000) * -1,
          })),
        },
        { status: 200 }
      );
    } else {
      console.info(content);
      return NextResponse.json("Could not generate questions");
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  return NextResponse.json({ message: "Unknown error" }, { status: 500 });
};
