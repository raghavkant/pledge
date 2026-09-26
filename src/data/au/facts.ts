// Facts about the real test, each verified in docs/facts.md (quote, source, date checked).
// Change a value here only after re-checking it there (docs/rules.md, rule 5).
export const CHECKED = { iso: '2026-09-26', label: '26 September 2026' };

export const SOURCES = {
  test: 'https://immi.homeaffairs.gov.au/citizenship/test-and-interview/learn-about-citizenship-interview-and-test/learn-about-citizenship-test',
  prepare: 'https://immi.homeaffairs.gov.au/citizenship/test-and-interview/prepare-for-test',
  practice: 'https://citizenshippracticetest.homeaffairs.gov.au/',
  booklet: 'https://immi.homeaffairs.gov.au/citizenship-subsite/files/our-common-bond-testable.pdf',
  ocb: 'https://immi.homeaffairs.gov.au/citizenship/test-and-interview/our-common-bond',
  conferral: 'https://immi.homeaffairs.gov.au/citizenship/become-a-citizen/permanent-resident',
  fees: 'https://immi.homeaffairs.gov.au/form-listing/forms/1298i.pdf',
} as const;

/** "answer 20 multiple choice questions", "at least 15/20 (75%)", "5/5 (100%) of the Australian values questions", "45 minutes" (source: test). */
export const TEST = { questions: 20, passMark: 15, valuesQuestions: 5, minutes: 45 } as const;

/** Form 1298i (design date 07/26): general eligibility (Form 1300t) and the concession fee (Pensioner Concession Card
 * holders only). Re-check every 1 July (docs/facts.md). */
export const FEES = { general: 595, concession: 85, form: '1298i', designDate: '07/26' } as const;
