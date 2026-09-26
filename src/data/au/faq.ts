// The FAQ's questions and answers (/australia/faq/). Every fact is quoted from docs/facts.md.
// Answers are HTML; the plain text is derived for structured data.
import { url } from '../../lib/url';
import { SOURCES, TEST, FEES } from './facts';
import { GUIDES, PRACTICE } from './guides';
import stats from './app-stats.json';

export interface FaqItem { id: string; q: string; html: string }

const a = (href: string, text: string) => `<a href="${href}">${text}</a>`;
const quote = (text: string) => `<blockquote><p>“${text}”</p><cite>Home Affairs</cite></blockquote>`;

export const FAQ: FaqItem[] = [
  {
    id: 'cost',
    q: 'How much does it cost to apply for citizenship?',
    html: `<p>The fee for an application under general eligibility (Form 1300t) is <strong>$${FEES.general}</strong>. The concession fee is <strong>$${FEES.concession}</strong>, for Pensioner Concession Card holders only. These are the amounts in ${a(SOURCES.fees, `Home Affairs Form ${FEES.form}`)} (design date ${FEES.designDate}); check the current form before you apply.</p>
<p>The test itself costs nothing extra: “There is no extra cost to sit the citizenship test. The citizenship application fee that you paid includes the test.”</p>`,
  },
  {
    id: 'residence',
    q: 'How long do I need to have lived in Australia?',
    html: `<p>Under the general residence requirement, ${a(SOURCES.conferral, 'Home Affairs')} says that when you apply you must:</p>
<ul><li>“have been living in Australia on a valid visa for 4 years immediately before the day you apply”,</li>
<li>“hold a permanent visa or an SCV for the last 12 months immediately before the day you apply”, and</li>
<li>“not have been absent from Australia for more than 12 months in total in the past 4 years, including no more than 90 days in total in the 12 months immediately before applying.”</li></ul>
<p>There are other requirements and some exemptions, so check your own situation with Home Affairs.</p>`,
  },
  {
    id: 'pass-mark',
    q: 'What do I need to pass?',
    html: `<p>At least ${TEST.passMark} of ${TEST.questions} questions correct (75%) <strong>and</strong> all ${TEST.valuesQuestions} Australian values questions correct. Both rules apply at the same time. See ${a(url(GUIDES.format.path), 'the test format')}.</p>`,
  },
  {
    id: 'result',
    q: 'When do I get my result?',
    html: `<p>Straight away: “Your result will be displayed on the screen after you complete the test.” Home Affairs then keeps processing your application and writes to you when it makes a decision.</p>`,
  },
  {
    id: 'after-passing',
    q: 'What happens after I pass?',
    html: `<p>If you pass and your application is approved, you must attend a citizenship ceremony to become an Australian citizen. Home Affairs sends you an invitation letter “about four weeks before the ceremony”, and “Wait times for citizenship ceremonies can vary.”</p>`,
  },
  {
    id: 'attempts',
    q: 'How many times can I sit the test?',
    html: `<p>If you don’t pass, Home Affairs books another appointment at no extra cost, and your visa is not affected. But: “If you do not pass the test after three appointments, we may refuse your application.” See ${a(url(GUIDES.failed.path), 'what happens if you don’t pass')}.</p>`,
  },
  {
    id: 'language',
    q: 'Can I take the test in my own language?',
    html: `<p>No. “The test is conducted in English only.” You can read the booklet <em>Our Common Bond</em> in 40 community languages while you study, but the test is in English.</p>`,
  },
  {
    id: 'practice-test',
    q: 'Is the real test the same as the practice test?',
    html: `<p>No. About its own practice test, ${a(SOURCES.prepare, 'Home Affairs')} says: “It is a sample test only. The questions will be different on the day of the test.” Our ${a(url(PRACTICE.path), 'free practice test')} is not the real test either: it uses Pledge’s own questions written from the booklet.</p>`,
  },
  {
    id: 'endorsed',
    q: 'Is Pledge endorsed by Home Affairs?',
    html: `<p>No. Pledge is an independent study app. It is not affiliated with or endorsed by the Australian Government. Home Affairs says:</p>
${quote('The Department does not endorse or recommend any external courses that claim to help you prepare for the citizenship test, including paid external apps.')}
<p>Home Affairs recommends its own free resources. The booklet itself says: “All of the information you need to sit the Australian citizenship test is in this book.” The free resources are:</p>
<ul><li>the booklet ${a(SOURCES.booklet, '<em>Australian Citizenship: Our Common Bond</em>')}, in English and 40 community languages,</li>
<li>the <em>Our Common Bond</em> podcast,</li>
<li>the ${a(SOURCES.practice, 'Home Affairs practice test')},</li>
<li>the AMEPOnline citizenship modules.</li></ul>
<p>What Pledge adds: its own practice questions and lessons written from the booklet, the booklet page for every answer, mock tests marked with both pass rules, and an iPhone app that works offline. Part 1 and ${stats.free.valuesQuestions} values questions are free; Premium unlocks the rest.</p>`,
  },
];

export const faqText = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
