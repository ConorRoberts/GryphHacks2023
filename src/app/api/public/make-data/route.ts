import { NextResponse } from "next/server";
import { prisma } from "~/src/utils/prisma";

export const GET = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ message: "don't run this please" });
  }

  type Question = {
    question: string;
    options: string[] | string;
    followUp?: Question;
  };

  const questionList = dietaryQuestions as Question[];

  const category = await prisma.habitCategory.findFirst({
    where: {
      name: "dietary",
    },
  });
  await prisma.question.deleteMany();

  if (!category) {
    return;
  }

  await prisma.question.deleteMany({
    where: {
      categoryId: category.id,
    },
  });

  await prisma.question.createMany({
    data: questionList.map((q) => ({
      prompt: q.question,
      options: typeof q.options === "string" ? [] : q.options,
      type: typeof q.options === "string" ? "multiple" : "input",
      categoryId: category?.id ?? 0,
    })),
  });

  for (const q of questionList) {
    if (q.followUp) {
      const parent = await prisma.question.findFirst({
        where: {
          prompt: q.question,
        },
      });

      if (parent) {
        const followUp = await prisma.question.create({
          data: {
            prompt: q.question,
            options: typeof q.options === "string" ? [] : q.options,
            type: typeof q.options === "string" ? "multiple" : "input",
            categoryId: category?.id ?? 0,
          },
        });

        await prisma.question.updateMany({
          where: {
            id: parent.id,
          },
          data: {
            followUpId: followUp.id,
          },
        });
      } else {
        console.log("No parent?");
      }
    }
  }

  return NextResponse.json({ hi: "ss" });
};

const fitnessQuestionsList = [
  {
    question: "What is your current weight (in kilograms)?",
    options: "input required",
  },
  {
    question: "How many days per week are you willing to exercise?",
    options: ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days"],
  },
  {
    question: "List any specific dietary requirements?",
    options: "input required",
  },
  {
    question: "Are you allergic to any specific foods?",
    options: ["Yes", "No"],
    followUp: {
      question: "Which foods are you allergic to?",
      options: "input required",
    },
  },
  {
    question: "How many hours of sleep do you get on average per night?",
    options: ["Less than 6 hours", "6-7 hours", "7-8 hours", "More than 8 hours"],
  },
  {
    question: "Do you have any chronic health conditions?",
    options: ["Yes", "No"],
    followUp: {
      question: "Which conditions do you have?",
      options: "input required",
    },
  },
  {
    question: "Do you have any previous experience with fitness training?",
    options: ["None", "Beginner", "Intermediate", "Advanced"],
  },
  {
    question: "What is your primary fitness goal?",
    options: [
      "Weight loss",
      "Muscle gain",
      "Improved cardiovascular health",
      "Increased flexibility",
      "General fitness",
    ],
  },
  {
    question: "Do you have any injuries that may limit your ability to exercise?",
    options: ["Yes", "No"],
    followUp: {
      question: "Which injuries?",
      options: "input required",
    },
  },
  {
    question: "How much time can you dedicate to each workout session?",
    options: ["Less than 30 minutes", "30-45 minutes", "45-60 minutes", "More than 60 minutes"],
  },
  {
    question: "Do you prefer exercising alone or with a partner/group?",
    options: ["Alone", "With a partner", "With a group"],
  },
  {
    question: "Do you have any specific fitness equipment available?",
    options: ["Dumbbells", "Resistance bands", "Treadmill", "Exercise bike", "None"],
  },
  {
    question: "What is your age?",
    options: "input required",
  },
  {
    question: "Are you currently taking any medication?",
    options: ["Yes", "No"],
    followUp: {
      question: "Which medications?",
      options: "input required",
    },
  },
  {
    question: "Do you smoke or use tobacco products?",
    options: ["Yes", "No"],
  },
  {
    question: "What is your preferred time of day to exercise?",
    options: ["Morning", "Afternoon", "Evening"],
  },
  {
    question: "Do you have any specific preferences for the type of exercise?",
    options: [
      "Cardiovascular exercises",
      "Strength training",
      "Yoga/Pilates",
      "Sports/Outdoor activities",
      "No specific preferences",
    ],
  },
  {
    question: "Are you comfortable working out at a gym?",
    options: ["Yes", "No"],
  },
  {
    question: "How many minutes can you allocate for warm-up exercises?",
    options: ["Less than 5 minutes", "5-10 minutes", "10-15 minutes", "More than 15 minutes"],
  },
  {
    question: "Do you have any specific dietary goals (e.g., reduce sugar intake)?",
    options: ["Yes", "No"],
    followUp: {
      question: "Enter your dietary goal?",
      options: "input required",
    },
  },
  {
    question: "Are you interested in tracking your progress using a fitness app or wearable device?",
    options: ["Yes", "No"],
  },
  {
    question: "Do you have any time constraints that may affect your workout schedule?",
    options: ["Yes", "No"],
  },
  {
    question: "Do you have any specific target areas you want to focus on?",
    options: ["Abs", "Arms", "Legs", "Full body", "No specific target areas"],
  },
  {
    question: "Are you comfortable with high-intensity exercises?",
    options: ["Yes", "No"],
  },
  {
    question: "Do you prefer indoor or outdoor exercises?",
    options: ["Indoor", "Outdoor", "Both"],
  },
  {
    question: "How would you rate your stress levels?",
    options: ["Low", "Moderate", "High"],
  },
  {
    question: "Do you have any specific weightlifting experience?",
    options: ["None", "Beginner", "Intermediate", "Advanced"],
  },
  {
    question: "Are you currently pregnant or have you given birth recently?",
    options: ["Yes", "No"],
  },
  {
    question: "Do you have access to a swimming pool?",
    options: ["Yes", "No"],
  },
  {
    question: "Do you have any specific time preferences for your workout sessions?",
    options: ["Morning", "Afternoon", "Evening"],
  },
];

const dietaryQuestions = [
  {
    question: "What is your age?",
    options: "input required",
  },
  {
    question: "Are you a vegetarian or vegan?",
    options: ["Vegetarian", "Vegan", "Neither"],
  },
  {
    question: "Do you have any food allergies?",
    options: ["No", "Yes"],
    followUp: {
      question: "Which foods are you allergic to?",
      options: "input required",
    },
  },
  {
    question: "Do you have any dietary preferences?",
    options: "input required",
  },
  {
    question: "How many meals do you typically eat in a day?",
    options: ["1", "2", "3", "4", "5 or more"],
  },
  {
    question: "Do you consume seafood?",
    options: ["No", "Yes"],
  },
  {
    question: "Do you prefer sweet or savory food?",
    options: ["Sweet", "Savory", "Both equally"],
  },
  {
    question: "How many cups of water do you drink per day?",
    options: "input required",
  },
  {
    question: "Do you follow any specific diet plan?",
    options: ["Keto", "Paleo", "Volumetrics", "I don't follow a specific plan"],
  },
  {
    question: "Do you have any religious or cultural dietary restrictions?",
    options: ["No", "Yes"],
  },
  {
    question: "How many servings of fruits and vegetables do you eat daily?",
    options: ["Less than 1", "1-2", "3-4", "5 or more"],
  },
  {
    question: "Do you consume caffeine?",
    options: ["No", "Yes"],
  },
  {
    question: "How many hours of sleep do you get on average per night?",
    options: ["Less than 6", "6-8", "More than 8"],
  },
  {
    question: "Do you have any specific dietary goals or restrictions?",
    options: "input required",
  },
  {
    question: "Do you prefer homemade or pre-packaged meals?",
    options: ["Homemade", "Pre-packaged", "Both equally"],
  },
  {
    question: "Are you currently on any medications that affect your diet?",
    options: ["No", "Yes"],
  },
  {
    question: "How often do you eat out or order takeout in a week?",
    options: ["Never", "1-2 times", "3-4 times", "5 or more times"],
  },
  {
    question: "Do you consume alcohol?",
    options: ["No", "Yes"],
  },
  {
    question: "Are you trying to lose, maintain, or gain weight?",
    options: ["Lose weight", "Maintain weight", "Gain weight"],
  },
  {
    question: "How many snacks do you typically have in a day?",
    options: ["None", "1", "2", "3 or more"],
  },
  {
    question: "Do you have any specific dietary preferences or dislikes?",
    options: "input required",
  },
  {
    question: "Do you track your calorie intake?",
    options: ["No", "Yes"],
  },
  {
    question: "How often do you eat red meat?",
    options: ["Never", "Rarely", "Moderately", "Frequently"],
  },
  {
    question: "Do you have any medical conditions that require dietary modifications?",
    options: ["No", "Yes"],
    followUp: {
      question: "Which condition(s)?",
      options: "input required",
    },
  },
  {
    question: "Do you have a preferred cooking style?",
    options: ["Baking", "Grilling", "Stir-frying", "Raw", "Frying", "Other"],
  },
  {
    question: "Do you enjoy trying new foods?",
    options: ["No", "Yes"],
  },
  {
    question: "How often do you consume sugary beverages?",
    options: ["Never", "Rarely", "Moderately", "Frequently"],
  },
  {
    question: "Do you have any specific dietary supplements you take regularly?",
    options: ["No", "Yes"],
    followUp: {
      question: "Which supplmenets do you take regularly?",
      options: "input required",
    },
  },
  {
    question: "Do you have any time constraints for meal preparation?",
    options: ["No", "Yes"],
  },
  {
    question: "How often do you eat fast food?",
    options: ["Never", "Rarely", "Moderately", "Frequently"],
  },
  {
    question: "Do you enjoy cooking?",
    options: ["No", "Yes"],
  },
];
