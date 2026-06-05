/** Device-aware quality tier for WebGL + CSS effects. */
export function detectPerfTier() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "low";
  const mem = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mobile =
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
  if (mem && mem <= 4) return "low";
  if (mobile || cores <= 4) return "medium";
  return "high";
}

export function applyPerfClass(tier) {
  document.body.classList.remove("perf-low", "perf-medium", "perf-high");
  document.body.classList.add(`perf-${tier}`);
  return tier;
}

export function getPixelRatio(tier) {
  const dpr = window.devicePixelRatio || 1;
  if (tier === "low") return Math.min(dpr, 1);
  if (tier === "medium") return Math.min(dpr, 1.25);
  return Math.min(dpr, 1.5);
}

export function useBloom(tier) {
  return tier === "high";
}

export function envCounts(tier) {
  if (tier === "low") return { pylons: 8, towers: 8, floaters: 0, dust: 120 };
  if (tier === "medium") return { pylons: 12, towers: 14, floaters: 3, dust: 220 };
  return { pylons: 18, towers: 22, floaters: 6, dust: 360 };
}
