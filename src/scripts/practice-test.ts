// The free practice test (docs/requirements.md §4). Runs only in the browser: it stores nothing and
// sends nothing (Privacy Policy §11). The question pool is this site's own questions.json.
type Question = { id: string; v: 0 | 1; q: string; o: string[]; a: number; e: string; s: string };
type Asked = Question & { order: string[]; answer: number; chosen: number | null };

const TOTAL = 20;
const VALUES = 5;
const PASS_MARK = 15;
const MINUTES = 45;

const root = document.querySelector<HTMLElement>('[data-quiz]')!;
const $ = <T extends HTMLElement = HTMLElement>(sel: string, scope: ParentNode = root) => scope.querySelector<T>(sel)!;
const views = {
  intro: $('[data-view="intro"]'),
  question: $('[data-view="question"]'),
  results: $('[data-view="results"]'),
};
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let pool: Question[] | null = null;
// Fetched as soon as the page loads, so Start is instant. First-party file; nothing is sent.
let loading: Promise<Question[]> = load();
function load() {
  return fetch(root.dataset.src!).then((r) => {
    if (!r.ok) throw new Error(String(r.status));
    return r.json() as Promise<Question[]>;
  });
}
let test: Asked[] = [];
let index = 0;
let checked = false;
let timer: { left: number; paused: boolean; id: number } | null = null;

const shuffle = <T>(list: T[]): T[] => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** "Part 1 › Early days › p. 12" → "Our Common Bond, Part 1: Early days, page 12" */
const sourceText = (s: string) => {
  const [where, topic, page] = s.split(' › ');
  return `Our Common Bond, ${where}: ${topic}${page ? `, page ${page.replace(/^p\.\s*/, '')}` : ''}`;
};

function show(name: keyof typeof views) {
  for (const [key, el] of Object.entries(views)) el.hidden = key !== name;
}

function newTest(): Asked[] {
  const part1 = shuffle(pool!.filter((q) => !q.v)).slice(0, TOTAL - VALUES);
  const values = shuffle(pool!.filter((q) => q.v)).slice(0, VALUES);
  return shuffle([...part1, ...values]).map((q) => {
    const order = shuffle(q.o);
    return { ...q, order, answer: order.indexOf(q.o[q.a]), chosen: null };
  });
}

function renderQuestion() {
  const q = test[index];
  checked = false;
  $('[data-count]').textContent = `Question ${index + 1} of ${TOTAL}`;
  $('[data-progress]').style.transform = `scaleX(${index / TOTAL})`;
  const tag = $('[data-tag]');
  tag.textContent = q.v ? 'Australian values' : 'Part 1: Australia and its people';
  tag.classList.toggle('is-values', !!q.v);
  $('[data-question]').textContent = q.q;
  const options = $('[data-options]');
  options.replaceChildren(
    ...q.order.map((text, i) => {
      const label = document.createElement('label');
      label.className = 'quiz-option';
      label.innerHTML = '<input type="radio" name="answer"><span class="quiz-radio" aria-hidden="true"></span><span class="quiz-option-label"><span></span><span class="quiz-option-mark"></span></span>';
      const input = label.querySelector('input')!;
      input.value = String(i);
      label.querySelector('.quiz-option-label > span')!.textContent = text;
      return label;
    }),
  );
  $<HTMLFieldSetElement>('[data-fieldset]').disabled = false;
  $('[data-feedback]').hidden = true;
  $('[data-hint]').hidden = true;
  $('[data-submit]').textContent = 'Check answer';
}

function check() {
  const q = test[index];
  const picked = root.querySelector<HTMLInputElement>('input[name="answer"]:checked');
  if (!picked) {
    $('[data-hint]').hidden = false;
    return;
  }
  checked = true;
  q.chosen = Number(picked.value);
  const right = q.chosen === q.answer;
  const labels = [...root.querySelectorAll<HTMLElement>('.quiz-option')];
  const mark = (i: number, cls: string, text: string) => {
    labels[i].classList.add(cls);
    labels[i].querySelector('.quiz-option-mark')!.textContent = text;
  };
  mark(q.answer, 'is-right', right ? 'Your answer: correct' : 'Correct answer');
  if (!right) mark(q.chosen, 'is-wrong', 'Your answer');
  if (!reduced()) labels[q.chosen].classList.add(right ? 'pop' : 'shake');
  $<HTMLFieldSetElement>('[data-fieldset]').disabled = true;

  const feedback = $('[data-feedback]');
  feedback.className = `quiz-feedback ${right ? 'is-right' : 'is-wrong'}`;
  $('[data-verdict]').textContent = right ? 'Correct.' : `Not quite. The answer is: ${q.order[q.answer]}`;
  $('[data-explanation]').textContent = q.e;
  $('[data-source]').textContent = sourceText(q.s);
  feedback.hidden = false;
  $('[data-hint]').hidden = true;
  $('[data-submit]').textContent = index === TOTAL - 1 ? 'See your result' : 'Next question';
  $('[data-progress]').style.transform = `scaleX(${(index + 1) / TOTAL})`;
  feedback.focus();
}

function next() {
  if (index === TOTAL - 1) return finish(false);
  index++;
  renderQuestion();
  $('[data-legend]').focus();
}

function finish(timeUp: boolean) {
  stopTimer();
  const correct = test.filter((q) => q.chosen === q.answer).length;
  const values = test.filter((q) => q.v && q.chosen === q.answer).length;
  const totalMet = correct >= PASS_MARK;
  const valuesMet = values === VALUES;

  $('[data-timeup]').hidden = !timeUp;
  $('[data-result-title]').textContent = totalMet && valuesMet ? 'You met both pass rules' : 'Not a pass yet';
  const rule = (name: string, met: boolean, value: string) => {
    const li = $(`[data-rule="${name}"]`);
    li.className = met ? 'is-met' : 'is-missed';
    $('[data-rule-value]', li).textContent = `${met ? 'Met' : 'Not met'}: ${value}`;
  };
  rule('total', totalMet, `you got ${correct} of ${TOTAL}`);
  rule('values', valuesMet, `you got ${values} of ${VALUES}`);
  $('[data-result-text]').textContent =
    totalMet && valuesMet
      ? 'Well done. The real test has different questions from all four parts of the booklet, so keep practising the whole booklet.'
      : totalMet
        ? `Your score is high enough, but on the real test every values question must be right. Read Part 4 of the booklet again, then try a new test.`
        : valuesMet
          ? `All ${VALUES} values questions were right. You need at least ${PASS_MARK} of ${TOTAL} overall: check the booklet pages in your answers below.`
          : `You need at least ${PASS_MARK} of ${TOTAL} and all ${VALUES} values questions right. Your answers below show the booklet page for each question.`;

  $('[data-review]').replaceChildren(
    ...test.map((q) => {
      const li = document.createElement('li');
      const add = (tag: string, cls: string, text: string) => {
        const el = document.createElement(tag);
        el.className = cls;
        el.textContent = text;
        li.append(el);
        return el;
      };
      add('p', 'rq', q.q);
      const ok = q.chosen === q.answer;
      if (q.chosen === null) add('p', 'no', 'Not answered');
      else add('p', ok ? 'ok' : 'no', `${ok ? 'Correct' : 'Your answer'}: ${q.order[q.chosen]}`);
      if (!ok) add('p', '', `Answer: ${q.order[q.answer]}`);
      add('p', 'src', sourceText(q.s));
      return li;
    }),
  );

  show('results');
  const score = $('[data-score]');
  const title = $('[data-result-title]');
  title.setAttribute('aria-describedby', 'result-summary');
  let summary = document.getElementById('result-summary');
  if (!summary) {
    summary = document.createElement('p');
    summary.id = 'result-summary';
    summary.className = 'visually-hidden';
    title.after(summary);
  }
  summary.textContent = `You got ${correct} of ${TOTAL} correct, and ${values} of ${VALUES} values questions.`;
  countUp(score, correct);
  title.focus();
  title.scrollIntoView({ block: 'start', behavior: reduced() ? 'auto' : 'smooth' });
}

function countUp(el: HTMLElement, to: number) {
  if (reduced() || to === 0) {
    el.textContent = String(to);
    return;
  }
  const start = performance.now();
  const ms = 800;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / ms);
    el.textContent = String(Math.round(to * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Optional timer: off by default, with pause (WCAG 2.2.1).
const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
function startTimer() {
  timer = { left: MINUTES * 60, paused: false, id: 0 };
  $('[data-timer]').hidden = false;
  $('[data-time]').textContent = clock(timer.left);
  timer.id = window.setInterval(() => {
    if (!timer || timer.paused) return;
    timer.left--;
    $('[data-time]').textContent = clock(timer.left);
    if (timer.left === 5 * 60 || timer.left === 60) $('[data-announce]').textContent = `${timer.left / 60} minute${timer.left === 60 ? '' : 's'} left.`;
    if (timer.left <= 0) finish(true);
  }, 1000);
}
function stopTimer() {
  if (timer) clearInterval(timer.id);
  timer = null;
  $('[data-timer]').hidden = true;
}
$('[data-pause]').addEventListener('click', (e) => {
  if (!timer) return;
  timer.paused = !timer.paused;
  const button = e.currentTarget as HTMLButtonElement;
  button.textContent = timer.paused ? 'Resume' : 'Pause';
  button.setAttribute('aria-pressed', String(timer.paused));
  $('[data-timer]').classList.toggle('is-paused', timer.paused);
  $('[data-announce]').textContent = timer.paused ? 'Timer paused.' : 'Timer running.';
});

async function begin() {
  const error = $('[data-load-error]');
  try {
    pool ??= await loading;
  } catch {
    loading = load(); // try again on the next press
    error.hidden = false;
    return;
  }
  error.hidden = true;
  test = newTest();
  index = 0;
  renderQuestion();
  const timed = $<HTMLInputElement>('[data-timer-choice]').checked;
  stopTimer();
  if (timed) startTimer();
  show('question');
  views.question.scrollIntoView({ block: 'start', behavior: 'auto' });
  $('[data-legend]').focus();
}

$('[data-form]').addEventListener('submit', (e) => {
  e.preventDefault();
  if (checked) next();
  else check();
});
root.addEventListener('change', (e) => {
  if ((e.target as HTMLInputElement).name === 'answer') $('[data-hint]').hidden = true;
});
$('[data-start]').addEventListener('click', begin);
$('[data-restart]').addEventListener('click', begin);
$('[data-needs-js]').hidden = false;
