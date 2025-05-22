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
