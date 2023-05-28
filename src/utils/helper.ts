export const scrollDown = () => {
  const scrollAmount = window.innerHeight;

  window.scrollBy({
    top: scrollAmount,
    behavior: "smooth",
  });
};

export const reformatUserResponses = (data: { answerValue: string; questionValue: string }[]): string => {
  let output = "";

  for (let i = 0; i < data.length; i++) {
    const { answerValue, questionValue } = data[i];
    output += `Question: ${questionValue}\nAnswer: ${answerValue}\n\n`;
  }

  return output;
};
