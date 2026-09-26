// Home page motion that CSS can't do alone (docs/design.md §7): desktop pointer tilt, the scroll
// story's active step, and the numbers counting up. Runs only in the browser; stores and sends nothing.
// Everything on the page is complete without it.
const calm = matchMedia('(prefers-reduced-motion: reduce)');

// Desktop pointer depth: the phone and map lean a little towards the pointer (fine pointer only).
const hero = document.querySelector<HTMLElement>('.hero');
const visual = document.querySelector<HTMLElement>('.hero-visual');
if (hero && visual && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let frame = 0;
  const set = (x: number, y: number) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      visual.style.setProperty('--tx', x.toFixed(3));
      visual.style.setProperty('--ty', y.toFixed(3));
    });
  };
  hero.addEventListener('pointermove', (e) => {
    if (calm.matches) return;
    const r = hero.getBoundingClientRect();
    set((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
  });
  hero.addEventListener('pointerleave', () => set(0, 0));
}

// Scroll story: one sticky phone (desktop) shows the screen of the step being read.
const story = document.querySelector<HTMLElement>('.story');
if (story && 'IntersectionObserver' in window) {
  const steps = [...story.querySelectorAll<HTMLElement>('.story-step')];
  const layers = [...story.querySelectorAll<HTMLElement>('.story-stage [data-layer]')];
  const activate = (step: HTMLElement) => {
    for (const s of steps) s.classList.toggle('is-active', s === step);
    for (const l of layers) l.classList.toggle('is-active', l.dataset.layer === step.dataset.step);
  };
  activate(steps[0]);
  story.classList.add('is-live');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) activate(e.target as HTMLElement);
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  for (const s of steps) io.observe(s);
}

// Numbers count up once when they come into view (never with reduced motion). Their width is
// reserved in CSS, so nothing moves.
const counts = [...document.querySelectorAll<HTMLElement>('[data-count]')];
if (counts.length && !calm.matches && 'IntersectionObserver' in window) {
  const section = counts[0].closest('section')!;
  if (section.getBoundingClientRect().top > innerHeight) {
    for (const c of counts) c.textContent = '0';
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1200);
          const eased = 1 - Math.pow(1 - t, 3);
          for (const c of counts) c.textContent = String(Math.round(Number(c.dataset.count) * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    io.observe(section);
  }
}
