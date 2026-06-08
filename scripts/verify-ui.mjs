/**
 * Portfolio UI verification: lint + Playwright (KO line-break + layout).
 * Expects PORTFOLIO_URL set by with-local-serve.mjs.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const steps = [
  ["npm", ["run", "lint:ko"]],
  ["npm", ["run", "test:ko-linebreak"]],
  ["npm", ["run", "lint:layout"]],
  ["npm", ["run", "test:layout"]],
];

for (const [cmd, args] of steps) {
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: "inherit", env: process.env });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log("OK verify-ui: lint + Playwright (KO + layout)");
