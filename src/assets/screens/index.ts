// Named slots for app screens in the phone frames (docs/design.md §6). Until the real App Store
// screenshots exist (app project store/screenshots/), each slot shows a labelled frame: the brand
// gradient with the screen's name. Never invented UI. Captions are built from the export (rule 9).
// Launch day: put <slot>.png (1290×2796) here and set `image` for that slot.
import stats from '../../data/au/app-stats.json';

export type ScreenSlot = 'mock-test' | 'lesson' | 'question' | 'mock-result';

export const screens: Record<ScreenSlot, { name: string; caption: string; image: ImageMetadata | null }> = {
  'mock-test': { name: 'Mock test', caption: `${stats.mockTest.questions} questions, ${stats.mockTest.minutes} minutes`, image: null },
  lesson: { name: 'Lesson', caption: `${stats.lessons} lessons in simple English`, image: null },
  question: { name: 'Practice question', caption: 'Every answer checked against the booklet', image: null },
  'mock-result': { name: 'Mock test result', caption: 'Pledge checks both pass rules', image: null },
};
