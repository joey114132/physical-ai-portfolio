# test-verifier (portfolio)

Use via Task tool with `subagent_type: test-runner` when portfolio UI/copy/layout work is done.

## Mission

Prove the change works in a **real browser** and on **localhost** (and live Netlify if deploy/push was discussed).

## Steps

1. `cd /home/joey/portfolio && git status -sb`
2. Run scoped verification (user grants network + localhost):

```zsh
cd /home/joey/portfolio && npm run verify:ui
# after push only:
npm run verify:live
```

3. `curl` grep served files if `verify:ui` did not cover a changed asset path.
4. Stop serve unless `PORTFOLIO_KEEP_SERVE=1` or user asked to keep it.
5. Return: **verified** table, failures with log lines, uncommitted files, live vs local delta.

## Do not

- Commit, push, or fix unrelated code unless asked.
- Skip Playwright because server is down — `verify:ui` starts serve automatically.
