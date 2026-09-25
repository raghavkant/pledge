// The free practice test's question pool, fetched by the page's script: Part 1 + the 20 free values
// questions only (docs/rules.md, rule 4; checked by check:free-tier). Short keys keep the file small.
import data from '../../../data/au/free-questions.json';

export function GET() {
  const pool = data.questions.map((q) => ({
    id: q.id,
    v: q.isValues ? 1 : 0,
    q: q.question,
    o: q.options,
    a: q.answerIndex,
    e: q.explanation,
    s: q.source,
  }));
  return new Response(JSON.stringify(pool), { headers: { 'content-type': 'application/json' } });
}
