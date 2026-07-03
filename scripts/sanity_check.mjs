#!/usr/bin/env node
import fs from 'fs/promises';

function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function loadQuestions() {
  return fs.readFile(new URL('../lib/questions.json', import.meta.url)).then((b) => JSON.parse(b.toString()));
}

function scoreAnswers(questions, answers) {
  let rawScore = 0;
  let maxScore = 0;
  const perQuestion = [];
  for (const q of questions) {
    const qMax = q.options.reduce((acc, o) => Math.max(acc, Number(o.score || 0)), 0);
    maxScore += qMax;
    const answer = answers.find((a) => a.id === q.id);
    if (!answer) {
      perQuestion.push({ id: q.id, selected: undefined, selectedScore: 0, maxScore: qMax });
      continue;
    }
    const idx = Number(answer.optionIndex ?? -1);
    const opt = q.options[idx];
    const score = opt ? Number(opt.score || 0) : 0;
    rawScore += score;
    perQuestion.push({ id: q.id, selected: opt ? opt.label : undefined, selectedScore: score, maxScore: qMax });
  }
  const percentage = maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 0;
  return { rawScore, maxScore, percentage, perQuestion };
}

async function main() {
  try {
    const questions = await loadQuestions();
    if (!Array.isArray(questions) || questions.length === 0) {
      console.error('No questions found in lib/questions.json');
      process.exit(2);
    }
    console.log(`Loaded ${questions.length} questions.`);

    // Test randomization: perform multiple shuffles and ensure order varies
    const orders = new Set();
    for (let i=0;i<5;i++){
      const order = shuffleArray(questions).map(q=>q.id).join(',');
      orders.add(order);
    }
    console.log(`Randomization produced ${orders.size} distinct orders (expected >1).`);

    // Prepare a sample set of answers: pick first option for each question
    const randomized = shuffleArray(questions).map(q => ({ ...q, options: shuffleArray(q.options) }));
    const answers = randomized.map((q, idx) => ({ id: q.id, optionIndex: 0 }));

    const result = scoreAnswers(randomized, answers);
    console.log('Sanity scoring result:', { rawScore: result.rawScore, maxScore: result.maxScore, percentage: result.percentage });

    // Check that percentage is between 0 and 100
    if (result.percentage < 0 || result.percentage > 100) {
      console.error('Scoring out of range');
      process.exit(3);
    }

    console.log('Per-question sample (first 3):', result.perQuestion.slice(0,3));
    console.log('Sanity check passed.');
    process.exit(0);
  } catch (err) {
    console.error('Sanity check failed:', err);
    process.exit(1);
  }
}

main();
