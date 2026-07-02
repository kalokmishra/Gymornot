import { NextResponse } from "next/server";
import { buildQuizQuestions, QuizQuestion } from "../../../lib/quiz";

const GEN_AI_ENDPOINT = process.env.GEN_AI_ENDPOINT;
const GEN_AI_API_KEY = process.env.GEN_AI_API_KEY;

async function fetchGeneratedQuiz(): Promise<QuizQuestion[]> {
  if (!GEN_AI_ENDPOINT || !GEN_AI_API_KEY) {
    throw new Error("Gen AI endpoint or API key is not configured.");
  }

  const prompt = `Generate 4 quiz questions about gym membership habits.` +
    ` Return a JSON array of objects with keys: eyebrow, prompt, options.` +
    ` Each options array should contain 4 items with label and score.` +
    ` Scores must be integers from 0 to 3.` +
    ` Do not return any additional fields or markdown.`;

  const response = await fetch(GEN_AI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GEN_AI_API_KEY}`,
    },
    body: JSON.stringify({ input: prompt }),
  });

  if (!response.ok) {
    throw new Error(`Gen AI fetch failed with status ${response.status}`);
  }

  const body = await response.json();
  const aiData = body?.output ?? body;

  if (!Array.isArray(aiData)) {
    throw new Error("Gen AI response was not an array.");
  }

  return aiData.map((item: any, index: number) => ({
    id: `q${index + 1}`,
    eyebrow: String(item.eyebrow ?? `Scenario ${index + 1}`),
    prompt: String(item.prompt ?? ""),
    options: Array.isArray(item.options)
      ? item.options.map((option: any) => ({
          label: String(option.label ?? ""),
          score: Number(option.score ?? 0),
        }))
      : [],
  }));
}

export async function GET() {
  try {
    const questions = await fetchGeneratedQuiz();
    if (questions.length < 4) {
      throw new Error("Gen AI returned too few questions.");
    }
    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Gen AI quiz fetch error:", error);
    const fallback = buildQuizQuestions();
    return NextResponse.json({ questions: fallback, warning: "Using fallback quiz questions." });
  }
}
