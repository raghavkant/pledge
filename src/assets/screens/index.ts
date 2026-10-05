// Named slots for app screens in the phone frames (docs/design.md §6). Real App Store screenshots
// (app project store/screenshots/raw/, 1320×2868) live beside this file; until a slot has one, it
// shows a labelled frame: the brand gradient with the screen's name. Never invented UI. Captions
// are built from the export (rule 9). `alt` is specific, plain-English text for the real screenshot.
import stats from '../../data/au/app-stats.json';
import mockTest from './mock-test.png';
import lesson from './lesson.png';
import question from './question.png';
import mockResult from './mock-result.png';

export type ScreenSlot = 'mock-test' | 'lesson' | 'question' | 'mock-result';

export const screens: Record<ScreenSlot, { name: string; caption: string; alt: string; image: ImageMetadata | null }> = {
  'mock-test': {
    name: 'Mock test',
    caption: `${stats.mockTest.questions} questions, ${stats.mockTest.minutes} minutes`,
    alt: `Pledge mock test: question 4 of 20 with a ${stats.mockTest.minutes}-minute timer.`,
    image: mockTest,
  },
  lesson: {
    name: 'Lesson',
    caption: `${stats.lessons} lessons in simple English`,
    alt: `Pledge lesson: Australia's states and territories, part 1 lesson 4 of ${stats.lessons}, with key facts and a 5-question check.`,
    image: lesson,
  },
  question: {
    name: 'Practice question',
    caption: 'Every answer checked against the booklet',
    alt: 'Pledge practice question answered correctly, with the explanation and the booklet page it comes from.',
    image: question,
  },
  'mock-result': {
    name: 'Mock test result',
    caption: 'Pledge checks both pass rules',
    alt: 'Pledge mock test result: passed with 18 out of 20, including all 5 values questions, and a score by part.',
    image: mockResult,
  },
};
