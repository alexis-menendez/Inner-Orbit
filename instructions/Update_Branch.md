# Team Git Workflow Guide

Keep your branch up to date with main and avoid unnecessary conflicts.

## Step 1: Check Out Your Branch and Pull Remote Updates

git checkout your-branch-name          # Switch to your branch
git pull                               # Pull latest changes for your branch


# Step 2: Stage, Commit, and Push Your Changes
git add .                              # Stage all changed files
git commit -m "Your commit message"    # Write a meaningful commit message
git push origin your-branch-name       # Push your changes to GitHub


# Step 3: Pull the Latest from main to Stay Updated
git fetch origin                       # Get latest from all remote branches
git merge origin/main                  # Merge latest main into your branch
git push                               # Push updated branch

# Step 4: Check to make sure you are no longer behind!
https://github.com/alexis-menendez/Inner-Orbit/branches