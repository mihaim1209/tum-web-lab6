# 🚀 Deployment Guide

This document explains how to deploy the Expense Tracker to GitHub Pages.

## Prerequisites

- Git installed on your machine
- Repository cloned locally
- Node.js and npm installed

## Automatic Deployment (Recommended)

### Option 1: Using npm Deploy Script

```bash
# 1. Ensure you're on the main branch
git checkout main

# 2. Build and deploy to GitHub Pages
npm run deploy
```

This script will:
- Build the production version
- Force add the dist folder to git
- Create a commit with the build
- Push to the gh-pages branch automatically

### Option 2: Manual Deployment

```bash
# 1. Build the project
npm run build

# 2. Deploy using git subtree
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

## GitHub Pages Configuration

After deploying, configure GitHub Pages in your repository settings:

1. Go to: **Settings → Pages**
2. Under "Source", select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
3. Click "Save"

Your app will be available at: `https://MihaiM1209.github.io/tum-web-lab6/`

## Verifying the Deployment

1. Navigate to: `https://MihaiM1209.github.io/tum-web-lab6/`
2. Test all features:
   - Add a new expense
   - Apply filters
   - Toggle theme
   - Edit and delete expenses
   - Check budget tracking
3. Verify localStorage persistence by refreshing the page

## Troubleshooting

### Issue: Blank page after deployment

**Solution**: The base path is already configured in `vite.config.js`:
```javascript
base: '/tum-web-lab6/',
```

### Issue: Assets not loading

**Solution**: Make sure you're accessing the correct URL:
`https://MihaiM1209.github.io/tum-web-lab6/`

NOT: `https://MihaiM1209.github.io/tum-web-lab6`

### Issue: gh-pages branch doesn't exist

**Solution**: Create it first with:
```bash
git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m "Initial commit"
git push origin gh-pages
```

Then switch back and deploy:
```bash
git checkout main
npm run deploy
```

## Continuous Deployment (Optional)

For automatic deployment on every push, you can use GitHub Actions:

1. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. Push the workflow file to your repository
3. GitHub Actions will automatically build and deploy on every push to main

## Production Checklist

Before deploying to production:

- ✅ All features tested locally
- ✅ No console errors
- ✅ Theme switching works
- ✅ localStorage persists data
- ✅ Responsive design verified on mobile
- ✅ All animations smooth
- ✅ Build completes without warnings

## Live App

Once deployed, you can access the Expense Tracker at:

**https://MihaiM1209.github.io/tum-web-lab6/**

---

**Deployment Status**: Ready for GitHub Pages
**Last Updated**: May 3, 2026
