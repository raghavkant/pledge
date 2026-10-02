# Facts register

Every fact about the real test that the site states must be in this file, with a Home Affairs quote, the page URL and the date it was checked. Pages link the source and show "Checked against Home Affairs on <date>".

- **Checked:** 2026-10-01 (earlier checks 2026-09-25 and 2026-09-26), by downloading each page (Home Affairs blocks some automated fetchers; `curl` with a normal browser user agent works) and matching every quote below against its text; the fee form PDF's text was extracted and checked too. All quotes were still present.
- **Re-check:** at least every 90 days, before any phase that writes about the fact, **every 1 July** for fees (they are indexed then), and in early January before a new year goes into page titles (`check:year`).
- Home Affairs pages show a "Last updated" date at the bottom (on 2026-10-01: `test` 30/09/2026, `conferral` 30/09/2026, `hub` 4/05/2026, `prepare` 23/02/2026, `ocb` 15/11/2024, `locator` 23/09/2024, `ptimes` 20/04/2026). The `test` page changed on 30 September 2026; every quote below was still on it word for word on 1 October 2026. We record our own check date as well; much of the `test` page's text sits in expandable sections.

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
| `locator` | https://immi.homeaffairs.gov.au/citizenship/test-and-interview/learn-about-citizenship-interview-and-test/citizenship-test-locator |
| `ptimes` | https://immi.homeaffairs.gov.au/citizenship/citizenship-processing-times |
| `immiaccount` | https://online.immi.gov.au/lusc/login (the ImmiAccount sign-in that the `test` and `conferral` pages link to) |

## Verified (checked 2026-10-01)

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
| Computer-based | "The test takes 45 minutes and includes 20 computer-based multiple choice questions." (video transcript) | `test` |
| Interview instead | "Applicants who do not need to sit the citizenship test may have an interview so we can confirm their identity and ask about their application." | `test` |
| Other exemptions | also: "are the child of a former Australian citizen who lost their Australian citizenship under specific circumstances", "were born in Papua before 16 September 1975 to an Australian citizen born in Australia (as Australia is now)", "were born in Australia and are stateless" | `test` |
| No photo ID | "If you do not bring a photo ID, your appointment will be changed to a later date." | `test` |
| Applying from outside Australia | "If you lodge your application from outside Australia, we will invite you to attend a test appointment after you return to Australia." | `test` |
| At the appointment | "discuss your citizenship application", "confirm your identity", "take your photo"; "You will sit the citizenship test after we have confirmed your identity." | `test` |
| On your own | "You must sit the test on your own. You cannot bring anyone with you to help you during the test." A Test Facilitator can show you how to use the computer or tablet, use it for you, give you headphones, read the questions aloud and select your answers if you respond verbally. | `test` |
| Assisted Test request | "We may offer you an Assisted Test if you: asked for it in your application, and have completed at least 400 hours of English language tuition under the Adult Migrant English Program (AMEP) or have a permanent or temporary physical or cognitive impairment that prevents you from sitting the Standard Test"; "We need evidence from your registered health practitioner" | `test` |
| Breaking the rules | "If you do not follow the rules, we may decide that you have not successfully completed the test and refuse your application." | `test` |
| While you wait | "While you wait for your next appointment, you should prepare for the test." | `test` |
| Booklet is enough | "All of the information you need to sit the Australian citizenship test is in this book. You are not required to purchase or obtain other citizenship packages from any individuals or organisations in order to pass the citizenship test." (copyright page) | `booklet` |
| Practice test purpose | "The citizenship practice test is designed to look and feel like the official test." | `prepare` |
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
| Invitation | "When we receive your application you will be invited to attend a citizenship appointment. We will send you a letter with the date, place and time of your appointment. Appointment waiting times will vary between test centres." | `locator` |
| Test centres | "Citizenship tests are held at departmental offices and at some regional locations by officers of Services Australia." "To find the testing centre closest to you, enter your residential address in the box below." | `locator` |
| Wait time | "The wait time for an appointment may vary." (links the `ptimes` page) | `test` |
| Processing times page | "We update the information every month." (the numbers themselves change; we link the page and never quote them) | `ptimes` |
| Rescheduling (full) | "If you need to reschedule your appointment, follow the instructions in your appointment letter." | `test` |
| Where you sit it | "If you lodge your application in Australia, you will attend your test appointment in Australia." "In exceptional circumstances we may arrange for you to attend a test appointment at an Australian Embassy or Consulate" | `test` |
| Documents before the appointment | "Before attending your appointment ensure that you have attached all documents to your application in ImmiAccount"; "In addition, bring any other documents we have requested you to provide for your appointment."; "If your circumstances have changed since you lodged your application (such as a change of address or name change), attach your new documents to your application through ImmiAccount" | `test` |
| No childcare | "Arrange for childcare before attending your appointment" | `test` |
| Applying | "Apply and pay online in ImmiAccount"; "You can apply online in ImmiAccount if you are aged 18 to 59 and not eligible for a concession"; "You can apply from in or outside of Australia." | `conferral` |
| What the test shows | "Passing the citizenship test will show you have:" "a basic knowledge of the English language", "an understanding of what it means to become an Australian citizen", "an adequate knowledge of Australia and the responsibilities and privileges of citizenship", "an understanding and commitment to Australian values based on freedom, respect and equality" | `test` |
| What it assesses | "The Australian citizenship test will assess your English language skills and what you know about Australia and Australian citizenship." (video transcript) | `test` |
| The booklet is enough | "The testable section includes all the information you need to pass the test." (video transcript) | `test` |
| Improving English | "Consider enrolling into the general AMEP Program if you wish to improve your English language skills to assist you with preparing for the test." | `prepare` |

## Not verified or conflicting (do not state)

| Item | Problem | What we do |
|---|---|---|
| Fee conflict | The conferral page contains an embedded block "Citizenship costs AUD285 for applicants aged 18 to 59 …", which conflicts with Form 1298i ($595). | Cite Form 1298i only. Re-check every 1 July. |
| 3 answer options per question | Not stated on any Home Affairs text page (the app project says it checked the practice test on 2026-09-23). | Don't claim it for the real test until the owner checks the Home Affairs practice test. Our own questions having 3 options is fine. |
| "Submit only when all 20 are answered", unanswered = wrong, auto-submit | App rules, not verified for the real test. | Never present as real-test rules. |
| Pass rates, failure statistics, ceremony timings | Third-party or news sources only. | Don't quote. Link the Home Affairs ceremony wait-times page. |
| Values questions unlabelled on the real test | Third-party claim only. | Don't state. |
| Australian Citizenship Pledge wording | Not checked. | Check on legislation.gov.au before building that page. |
| appointments.homeaffairs.gov.au ("Citizenship Appointment Booking") | Ranks for booking searches, but the page is an empty shell that only works with JavaScript, and no Home Affairs text page links it. We couldn't confirm what it is for. | Don't link or describe it. The owner checks it (see the sprint report). |
| "You can't book the test yourself" / "log in to ImmiAccount to pick a date" | Home Affairs says it sends a letter and that you follow the letter to reschedule. It doesn't say either of these. | Say only what Home Affairs says. |
| Difficulty, pass rates, how many people fail | Only news and third-party sources. | Don't quote. "Is it hard?" is answered from what the test checks and the rules. |
| Processing and appointment wait times (numbers) | They change every month. | Link the `ptimes` page; don't quote numbers. |
