# SEO sprint report (phases 15–20)

Written 2 October 2026. The research and the page map are in `docs/seo-sprint.md`; every decision is in `docs/decisions.md` (dated 2026-10-01 and 2026-10-02).

## What the sprint did

| Phase | What |
|---|---|
| 15. Research | Australian results pages for 19 searches, why the #3 site ranks, our weaknesses, one main search per page. Facts re-checked 1 October 2026. |
| 16. Home page test | The free practice test is now in the home page hero (title "Free Australian Citizenship Practice Test 2026"); `/australia/practice-test/` redirects there. |
| 17. 50 questions | `/australia/citizenship-test-questions/`: 50 free-tier practice questions with answers and booklet pages, and a generated printable PDF (no email needed). |
| 18. Booking | `/australia/book-citizenship-test/`: the appointment letter, rescheduling, test centres, cost, from Home Affairs. |
| 19. Long tail | Pass mark, attempts, what to bring and values pages rewritten answer-first with the questions people search; new `/australia/is-the-citizenship-test-hard/`; 2026 in titles where people search by year; the January check. |
| 20. Trust | `/about/how-we-check-facts/`, author byline and "About the author", a practice-test box on every guide, publish dates, sitemap `lastmod`, share images for every page. |

## What to expect

On-page work makes each page the most accurate answer for its search. It can't by itself lift a new folder on `github.io` past older `.com.au` sites for the biggest searches. Likely order: the long-tail questions first (weeks to a few months), then "free" and "50 questions", then the main "practice test" searches after domain day and some genuine links.

## Your to-do list

1. **Let Phases 17–20 go live.** They passed every check, but merging into `main` publishes the site, so it needs your go-ahead.
2. **Search Console** (the verification tag has been live since 26 September): click **Verify** if you haven't already, then **Sitemaps** → submit `sitemap.xml`. Use **URL inspection** → **Request indexing** for the home page, `/australia/citizenship-test-questions/` and `/australia/book-citizenship-test/`. Steps: `docs/overnight-report.md`.
3. **Bing Webmaster Tools**: "Import from Google Search Console" (5 minutes; Bing also feeds ChatGPT search).
4. **Check `appointments.homeaffairs.gov.au`** ("Citizenship Appointment Booking"). It ranks for booking searches, but we couldn't confirm what it's for, so the site doesn't mention it. If you can see what it does (for example from an appointment letter), tell me and I'll check whether Home Affairs says it anywhere we can quote.
5. **Domain day** is the biggest single step for the main searches. A `.com.au` tells Google the site is for Australia. auDA's rules require an Australian connection to register one (check them before choosing). Steps are in `docs/phases.md`.
6. **Your Desktop copy is out of date.** The current work is in `~/pledge-work` (outside iCloud). `~/Desktop/Developer` is synced to iCloud again, which stalls the tools.

## Genuine links (off-site)

Only links that are honest and useful to the reader, always saying you made Pledge. No paid links, link swaps, fake reviews or mass posting (rule 3).

- **Your own profiles:** the GitHub repo description and README, and the App Store listing at launch, linking the home page.
- **Where people ask:** when someone asks about the test on Reddit (for example r/AusVisa) or Whirlpool and a page truly answers it (the values rule, what to bring, attempts), answer in your own words, link the page, and say it's your site. A few good answers beat many posts.
- **People who help new citizens:** migrant resource centres, libraries, community English classes and settlement services often list free study resources. A short note offering the free practice test and the printable 50 questions (free, no sign-up, no tracking) is a fair ask.
- **At launch:** a Product Hunt or similar launch post for the app, linking the site.

## Still open on the site

- Real app screenshots in the phone frames (App Store launch step).
- `robots.txt` (domain day; it can't be added on `github.io`).
- Removing the old root rollback files (after a week of stable deploys, as decided).
