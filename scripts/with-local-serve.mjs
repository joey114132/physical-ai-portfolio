/**
 * Run a command against a local static server (starts/stops server if needed).
 * Usage: node scripts/with-local-serve.mjs -- <command...>
 * Env: PORTFOLIO_PORT (default 8766), PORTFOLIO_KEEP_SERVE=1 to leave server running
 */
import { spawn } from "node:child_process";
import http from "node:http";
import { fileURLToPath } from "node:url";
import path from "node:path";

const PORT = Number(process.env.PORTFOLIO_PORT ?? 8766);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = `http://127.0.0.1:${PORT}/`;
const KEEP = process.env.PORTFOLIO_KEEP_SERVE === "1";

const dash = process.argv.indexOf("--");
const cmd = dash >= 0 ? process.argv.slice(dash + 1) : process.argv.slice(2);
if (!cmd.length) {
  console.error("Usage: node scripts/with-local-serve.mjs -- <command...>");
  process.exit(1);
}

function probe() {
  return new Promise((resolve) => {
    const req = http.get(BASE, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(2500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitUp(ms = 8000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (await probe()) return true;
    await new Promise((r) => setTimeout(r, 250));
  }
  return false;
}

let server = null;
let started = false;

if (!(await probe())) {
  server = spawn("python3", ["-m", "http.server", String(PORT)], {
    cwd: ROOT,
    stdio: "ignore",
    detached: false,
  });
  started = true;
  if (!(await waitUp())) {
    server.kill("SIGTERM");
    console.error(`Failed to start local server on ${PORT}`);
    process.exit(1);
  }
}

process.env.PORTFOLIO_URL = `${BASE}?debug=1&noboot=1`;

const child = spawn(cmd[0], cmd.slice(1), {
  cwd: ROOT,
  stdio: "inherit",
  env: process.env,
  shell: false,
});

const code = await new Promise((resolve) => {
  child.on("close", resolve);
  child.on("error", () => resolve(1));
});

if (started && server && !KEEP) {
  server.kill("SIGTERM");
}

process.exit(code ?? 1);
