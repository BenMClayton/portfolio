#!/usr/bin/env bash
set -euo pipefail

REPOSITORY="https://github.com/BenMClayton/portfolio.git"
BRANCH="main"

if ! command -v git >/dev/null 2>&1; then
  echo "Git is required." >&2
  exit 1
fi

if [ ! -d .git ]; then
  git init
  git checkout -b "$BRANCH"
  git remote add origin "$REPOSITORY"
else
  git checkout -B "$BRANCH"
  if git remote get-url origin >/dev/null 2>&1; then
    git remote set-url origin "$REPOSITORY"
  else
    git remote add origin "$REPOSITORY"
  fi
fi

git add .
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "Build Ben Clayton portfolio"
fi

git push --set-upstream origin "$BRANCH"

echo "Published to $REPOSITORY on branch $BRANCH"
