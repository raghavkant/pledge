// The 50 free practice questions on /australia/citizenship-test-questions/ and in its PDF (docs/seo-sprint.md).
// Free tier only (docs/rules.md, rule 4): 40 Part 1 questions spread over the nine Part 1 topics, and 10 of the
// 20 free values questions, each on a different value. None uses the word "official" (decisions, 2026-09-26).
// scripts/build-pdf.mjs records these ids and their text in fifty-pdf.json; check:free-tier fails if the PDF
// is out of date with this list, the export or the fact-check date.
export const FIFTY_IDS = [
  'p1-002', 'p1-005', 'p1-007', 'p1-011',
  'p1-014', 'p1-016', 'p1-019', 'p1-021', 'p1-023',
  'p1-027', 'p1-029', 'p1-033', 'p1-036', 'p1-039',
  'p1-042', 'p1-046', 'p1-050', 'p1-053', 'p1-057', 'p1-060', 'p1-064', 'p1-068',
  'p1-071', 'p1-074', 'p1-077',
  'p1-080', 'p1-083', 'p1-086', 'p1-089',
  'p1-093', 'p1-097', 'p1-100', 'p1-103', 'p1-107',
  'p1-110', 'p1-115', 'p1-118', 'p1-122',
  'p1-125', 'p1-132',
  'p4-001', 'p4-007', 'p4-088', 'p4-015', 'p4-020', 'p4-027', 'p4-030', 'p4-038', 'p4-048', 'p4-060',
] as const;

/** Where the PDF is published (under the page's folder). */
export const FIFTY_PDF = 'australia/citizenship-test-questions/pledge-50-practice-questions.pdf';
