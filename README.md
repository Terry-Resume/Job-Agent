# Job Agent — personal opportunity dashboard

A one-page dashboard for Terry's own job search: matched openings with the platforms to apply on, side-income ideas, and the
status of the PM portfolio artifacts. Open `job_agent.html` in a browser; there is no server and no build.

> **This is a personal tool, not part of Kato.8 studio operations.** It sits in the **Kato.8 internal-tools suite** (ten
> tools plus the [`central-command`](https://github.com/Terry-Resume/central-command) hub, built on
> [`@kato8/core`](https://github.com/Terry-Resume/kato8-core)) only so the hub can list it, and the registry marks it
> `personal` and `super_admin`-only. It uses none of the suite's auth, data or AI services.

## What it is, and is not

- A **hand-written snapshot** (the header says May 2026). Counts such as "158 on LinkedIn" and the salary ranges were true
  when written and are not refreshed; each "Apply" button opens a search-results page, not a specific posting.
- It does **not** scrape job boards, store anything, call any API or apply for you. The only script switches between tabs.
- Nothing is saved: no cookies, no `localStorage`, no tracking.

## Tests

```bash
npm install
npm test     # jsdom: the page loads without errors, tabs switch, every link is https with rel=noopener, no keys in the file
```

## Known limits

- The two links at the bottom of the portfolio tab point to `github.com/terryjteng/…`, not to the `Terry-Resume`
  organization that holds the suite. Check that account name before sharing the page, and update the links if it moved.
- Public by default: this repo describes an active job search. Make it private if you would rather an employer not read it.

## License

MIT — see [LICENSE](LICENSE).
