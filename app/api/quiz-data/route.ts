import { NextResponse } from "next/server";
import { buildQuizQuestions, QuizQuestion, shuffleArray, computeArchetype } from "../../../lib/quiz";
import { promises as fs } from "fs";
import path from "path";

const GEN_AI_ENDPOINT = process.env.GEN_AI_ENDPOINT;
const GEN_AI_API_KEY = process.env.GEN_AI_API_KEY;

async function fetchGeneratedQuiz(): Promise<QuizQuestion[]> {
  if (!GEN_AI_ENDPOINT || !GEN_AI_API_KEY) {
    throw new Error("Gen AI endpoint or API key is not configured.");
  }

  const prompt = `Generate 4 quiz questions about gym membership habits.` +
    ` Return a JSON array of objects with keys: eyebrow, prompt, options.` +
    ` Each options array should contain 4 items with label, gymScore, homeScore, boutiqueScore, couchScore.` +
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
          gymScore: Number(option.gymScore ?? 0),
          homeScore: Number(option.homeScore ?? 0),
          boutiqueScore: Number(option.boutiqueScore ?? 0),
          couchScore: Number(option.couchScore ?? 0),
        }))
      : [],
  }));
}

async function readQuestionsFile(): Promise<QuizQuestion[] | null> {
  try {
    const filePath = path.join(process.cwd(), "lib", "questions.json");
    const contents = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(contents);
    if (!Array.isArray(parsed)) return null;
    // Basic validation
    return parsed.map((q: any) => ({
      id: String(q.id ?? ""),
      eyebrow: String(q.eyebrow ?? ""),
      prompt: String(q.prompt ?? ""),
      options: Array.isArray(q.options)
        ? q.options.map((opt: any) => ({
            label: String(opt.label ?? ""),
            gymScore: Number(opt.gymScore ?? 0),
            homeScore: Number(opt.homeScore ?? 0),
            boutiqueScore: Number(opt.boutiqueScore ?? 0),
            couchScore: Number(opt.couchScore ?? 0),
          }))
        : [],
    }));
  } catch (err) {
    return null;
  }
}

const QUESTIONS_PER_QUIZ = 4;

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

export async function GET() {
  try {
    const fromFile = await readQuestionsFile();
    if (fromFile && fromFile.length > 0) {
      // Pick N random questions from the pool, shuffle options for each
      const picked = pickRandom(fromFile, QUESTIONS_PER_QUIZ).map((q, i) => ({
        ...q,
        id: `q${i + 1}`,                    // re-index so IDs are always q1–q4
        options: shuffleArray(q.options),   // randomise option order too
      }));
      return NextResponse.json({ questions: picked });
    }

    // Try Gen AI first, then fallback
    try {
      const questions = await fetchGeneratedQuiz();
      if (questions.length >= 1) {
        return NextResponse.json({ questions: pickRandom(questions, QUESTIONS_PER_QUIZ) });
      }
    } catch (err) {
      console.error("Gen AI quiz fetch error:", err);
    }

    const fallback = buildQuizQuestions();
    return NextResponse.json({ questions: fallback, warning: "Using fallback quiz questions." });
  } catch (error) {
    console.error("Quiz GET error:", error);
    return NextResponse.json({ questions: [], error: String(error) }, { status: 500 });
  }
}

type Answer = { id: string; optionIndex: number };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const answers: Answer[] = Array.isArray(body?.answers) ? body.answers : [];

    // Load questions from file or fallback
    const questions = (await readQuestionsFile()) ?? buildQuizQuestions();

    const perQuestion: Array<{ id: string; selected?: string }> = [];
    let gymScore = 0;
    let homeScore = 0;
    let boutiqueScore = 0;
    let couchScore = 0;

    for (const q of questions) {
      const answer = answers.find((a) => a.id === q.id);
      if (!answer) {
        perQuestion.push({ id: q.id, selected: undefined });
        continue;
      }
      const idx = Number(answer.optionIndex ?? -1);
      const opt = q.options[idx];
      if (opt) {
        gymScore += opt.gymScore;
        homeScore += opt.homeScore;
        boutiqueScore += opt.boutiqueScore;
        couchScore += opt.couchScore;
        perQuestion.push({ id: q.id, selected: opt.label });
      } else {
        perQuestion.push({ id: q.id, selected: undefined });
      }
    }

    const archetype = computeArchetype(gymScore, homeScore, boutiqueScore, couchScore);
    const totalScore = gymScore + homeScore + boutiqueScore + couchScore || 1;
    const dropoffProbability = Math.round((couchScore / totalScore) * 100);

    return NextResponse.json({ gymScore, homeScore, boutiqueScore, couchScore, archetype, dropoffProbability, perQuestion });
  } catch (err) {
    console.error("Quiz scoring error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
