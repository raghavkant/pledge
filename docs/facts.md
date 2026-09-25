# Facts register

Every fact about the real test that the site states must be in this file, with a Home Affairs quote, the page URL and the date it was checked. Pages link the source and show "Checked against Home Affairs on <date>".

- **Checked:** 2026-09-25, by downloading each page (Home Affairs blocks some automated fetchers; `curl` with a normal browser user agent works) and quoting its text.
- **Re-check:** at least every 90 days, before any phase that writes about the fact, and **every 1 July** for fees (they are indexed then).
- Home Affairs pages don't show a "last updated" date in their text, so we record our own check date.

## Sources

| Key | Page |
|---|---|
| `test` | https://immi.homeaffairs.gov.au/citizenship/test-and-interview/learn-about-citizenship-interview-and-test/learn-about-citizenship-test |
| `prepare` | https://immi.homeaffairs.gov.au/citizenship/test-and-interview/prepare-for-test |
| `hub` | https://immi.homeaffairs.gov.au/citizenship/test-and-interview |
| `ocb` | https://immi.homeaffairs.gov.au/citizenship/test-and-interview/our-common-bond |
| `practice` | https://citizenshippracticetest.homeaffairs.gov.au/ |
| `conferral` | https://immi.homeaffairs.gov.au/citizenship/become-a-citizen/permanent-resident |
| `fees` | https://immi.homeaffairs.gov.au/form-listing/forms/1298i.pdf (Form 1298i, "Design date 07/26") |
| `booklet` | https://immi.homeaffairs.gov.au/citizenship-subsite/files/our-common-bond-testable.pdf |

## Verified (checked 2026-09-25)

| Fact | Quote | Source |
|---|---|---|
| Number of questions | "answer 20 multiple choice questions" | `test` |
| Values rule | "answer 5/5 (100%) of the Australian values questions correctly" | `test` |
| Pass mark | "achieve an overall mark of at least 15/20 (75%)" | `test` |
| Time limit | "You will have 45 minutes to complete the test." | `test` |
| Cost of the test | "There is no extra cost to sit the citizenship test. The citizenship application fee that you paid includes the test." | `test` |
| Who sits it | "If you are aged between 18 and 59 years on the day we receive your application for citizenship by conferral, you are generally required to sit the test." | `test` |
| Who doesn't | "are aged 17 years or younger at the time you apply", "are aged 60 years or over at the time you apply", "have a permanent or enduring physical or mental incapacity", "have a permanent loss or substantial impairment of hearing, speech or sight", and other listed cases | `test` |
| Booking | "we will send you a letter with the date, time and place of your appointment. The wait time for an appointment may vary." | `test` |
| Rescheduling | "follow the instructions in your appointment letter." | `test` |
| Where | "departmental offices in most Australian capital cities", "some Services Australia (Centrelink) offices" | `test` |
| What to bring | Photo ID (examples: "an Australian driver licence", "a passport", "an Australian issued proof of age card"); "a copy of your appointment letter, either as a printed hard copy or displayed on your phone"; "We will not accept certified copies or electronic images of your photo ID." | `test` |
| On the day | "Arrive 10 minutes before your appointment time." "You will use a computer or tablet device to take the test. Your result will be displayed on the screen after you complete the test." "Children are not permitted in the test centre." | `test` |
| Assisted Test | "you will have 90 minutes instead of the standard 45 minutes"; eligibility: at least 400 hours of AMEP English tuition, or an impairment with evidence from a registered health practitioner | `test` |
| Test rules | No phones or electronic devices, no talking except to the Test Facilitator, no books or notes, no copying | `test` |
| Failing | "This will not affect your visa." "You can continue living in Australia." "We will book another appointment for you at no extra cost." "If you do not pass the test after three appointments, we may refuse your application." | `test` |
| After passing | ceremony invitation "about four weeks before the ceremony"; "Wait times for citizenship ceremonies can vary." | `test` |
| Language | "The test is conducted in English only. All test questions are based on the OCB resource booklet." | `prepare` |
| Practice test | "It is a sample test only. The questions will be different on the day of the test." | `prepare` |
| Paid apps | "The Department does not endorse or recommend any external courses that claim to help you prepare for the citizenship test, including paid external apps." | `prepare`, `hub` |
| Only Home Affairs resources | "You should only use test resources available on the Home Affairs website." (video transcript) | `test` |
| Free resources | the booklet, the *Our Common Bond* podcast, the practice test, AMEPOnline citizenship modules | `prepare` |
| Four topics | Australia and its people; Australia's democratic beliefs, rights and liberties; government and the law in Australia; Australian values | `prepare` |
| Skipping questions | "During the test, you can: answer the questions in any order; skip questions and come back to them later if you are unsure." | `practice` |
| Booklet languages | "available in 40 community languages" | `ocb` |
| Fee | Form 1300t, general eligibility: **$595**; concession fee **$85** (Pensioner Concession Card holders only) | `fees` |
| Residence | 4 years living in Australia on a valid visa immediately before applying; a permanent visa for the last 12 months; not absent more than 12 months in total in the 4 years, including no more than 90 days in the 12 months before applying | `conferral` |
| Knowledge requirement | "If you score 75% or more on the citizenship test, and answer all 5 questions on Australian values correctly, then you meet the knowledge requirement." | `conferral` |

## Not verified or conflicting (do not state)

| Item | Problem | What we do |
|---|---|---|
| Fee conflict | The conferral page contains an embedded block "Citizenship costs AUD285 for applicants aged 18 to 59 …", which conflicts with Form 1298i ($595). | Cite Form 1298i only. Re-check every 1 July. |
| 3 answer options per question | Not stated on any Home Affairs text page (the app project says it checked the practice test on 2026-09-23). | Don't claim it for the real test until the owner checks the Home Affairs practice test. Our own questions having 3 options is fine. |
| "Submit only when all 20 are answered", unanswered = wrong, auto-submit | App rules, not verified for the real test. | Never present as real-test rules. |
| Pass rates, failure statistics, ceremony timings | Third-party or news sources only. | Don't quote. Link the Home Affairs ceremony wait-times page. |
| Values questions unlabelled on the real test | Third-party claim only. | Don't state. |
| Australian Citizenship Pledge wording | Not checked. | Check on legislation.gov.au before building that page. |
