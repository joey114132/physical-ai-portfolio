#!/usr/bin/env zsh
# One Terminator window, split panes (like Ctrl+D / Ctrl+Shift+D):
#   top-left  = http.server 8766
#   top-right = git watch
#   bottom    = shell for npm run test:all
set -euo pipefail

export DISPLAY="${DISPLAY:-:1}"

# Close legacy separate windows (portfolio-serve / portfolio-watch / portfolio-tests)
pkill -f "terminator -u -T portfolio-" 2>/dev/null || true

# Avoid duplicate single-window layout
if pgrep -f "terminator -l portfolio -T portfolio" >/dev/null 2>&1; then
  echo "portfolio layout already open (one window, split panes)"
  exit 0
fi

# One window: top = serve|watch (Ctrl+D), bottom = tests (Ctrl+Shift+D)
exec terminator -l portfolio -T portfolio -m
