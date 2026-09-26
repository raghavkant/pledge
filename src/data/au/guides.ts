// Every guide under /australia/, for related links, the hub and the header. Add a guide here when
// its page exists (check:links fails on a link to a page that doesn't).
export interface GuideLink { path: string; title: string; blurb: string }

export const GUIDES: Record<string, GuideLink> = {
  format: { path: 'australia/test-format/', title: 'Test format', blurb: 'How many questions, the pass mark, the time limit and the language.' },
  who: { path: 'australia/who-sits-the-test/', title: 'Who sits the test', blurb: 'Who has to sit it, who doesn’t, and who can have 90 minutes.' },
  testDay: { path: 'australia/test-day/', title: 'Test day', blurb: 'Your appointment letter, what ID to bring, what happens at the centre, and the rules.' },
  faq: { path: 'australia/faq/', title: 'Questions and answers', blurb: 'The fee, the residence requirement, your result, and whether Pledge is endorsed.' },
  ocb: { path: 'australia/our-common-bond/', title: 'Our Common Bond', blurb: 'The booklet every test question is based on: its four parts and where to get it free.' },
  part1: { path: 'australia/our-common-bond/part-1/', title: 'Part 1: Australia and its people', blurb: 'First peoples, history, states and territories, and national symbols, with free practice questions.' },
  part2: { path: 'australia/our-common-bond/part-2/', title: 'Part 2: Beliefs, rights and liberties', blurb: 'Democracy, the Rule of Law, freedoms, equality, and what citizens must do and can do.' },
  part3: { path: 'australia/our-common-bond/part-3/', title: 'Part 3: Government and the law', blurb: 'Voting, the Constitution, Parliament, the three levels of government, courts and important laws.' },
  values: { path: 'australia/values-questions/', title: 'Australian values questions', blurb: 'The rule that decides a pass, what Part 4 covers, and a free drill of 20 values questions.' },
  failed: { path: 'australia/failed-citizenship-test/', title: 'If you don’t pass', blurb: 'Your visa, your next appointment, and the three-appointment rule.' },
};

export const PRACTICE: GuideLink = { path: 'australia/practice-test/', title: 'Free practice test', blurb: '20 questions with the answer and the booklet page after each one.' };
