1. How to Get the Deploy Hook URL:
- Go to Render Dashboard
- Select your Web Service
- Click the "Settings" tab
- Scroll down to the "Deploy Hooks" section
- Click "Add Deploy Hook"
- Give it a descriptive name like GitHub Actions Deploy
- Render will generate a URL — this is your deploy hook URL
- Copy the URL

2. Add Secret in GitHub:
- Go to GitHub Repo → Settings → Secrets → Actions
- Click "New repository secret"
- Name: RENDER_DEPLOY_HOOK
- Value: (Paste the deploy hook URL from Render)

3. Rename this file to "deploy.yml" and then delete everything above this line!
-------

name: CI/CD Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies (Root, Client, Server)
        run: npm run install:all

      - name: Build Client and Server
        run: npm run build:all

      - name: Trigger Render Deploy Hook
        env:
          RENDER_DEPLOY_HOOK: ${{ secrets.RENDER_DEPLOY_HOOK }}
        run: curl "$RENDER_DEPLOY_HOOK"
