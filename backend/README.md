# TinyLink Backend — GitHub push instructions

This file contains steps to safely initialize a Git repository for the backend and push it to GitHub from Windows PowerShell.

Prerequisites:
- Install Git (https://git-scm.com/) and optionally the GitHub CLI (`gh`) (https://cli.github.com/).
- Make sure you do NOT commit secrets in `.env`.

Quick push steps (PowerShell):

```powershell
# move to backend folder
cd "c:\Users\Anand Kumar Gautam\Desktop\tinylink\backend"

# initialize repo (if not already initialized)
git init

# ensure .gitignore exists (we added one that ignores .env and node_modules)
git add .gitignore

# add all other files
git add .
git commit -m "Initial commit - backend"

# If you previously committed .env, remove it from history in the index
git rm --cached .env; git commit -m "Remove .env from repository"

# Create GitHub repo and push (option A: using GitHub CLI `gh`):
# 1) Login: gh auth login
# 2) Create and push (replace with your repo name and visibility):
#    gh repo create <owner>/<repo> --public --source=. --remote=origin --push

# Option B: create the repo on github.com and then add the remote manually:
#    git remote add origin https://github.com/<owner>/<repo>.git
#    git branch -M main
#    git push -u origin main
```

Security notes:
- Do not commit `.env`; this repo's `.gitignore` already excludes it.
- If a secret was pushed previously you'll need to rotate those credentials.

Optional next steps:
- Add GitHub Actions CI and deploy workflows in `.github/workflows/`.
- Add repository secrets in GitHub settings (for example `DATABASE_URL`) before enabling deployments.
