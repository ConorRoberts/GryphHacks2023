type CategorizationResult = {
  sequence: string;
  labels: string[];
  scores: number[];
};

export const categorizeInput = async (inputs: string, categories: string[]) => {
  const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-mnli", {
    headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
    method: "POST",
    body: JSON.stringify({ inputs, parameters: { candidate_labels: categories } }),
  });
  const result = (await response.json()) as CategorizationResult;

  return result;
};
