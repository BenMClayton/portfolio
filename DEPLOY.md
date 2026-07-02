# Deployment

## 1. Publish the GitHub branch

From the project folder:

```bash
./publish-to-github.sh
```

The script creates and pushes the `main` branch to:

`BenMClayton/portfolio`

## 2. Create the Render site

### Render Blueprint

1. Open the Render dashboard.
2. Select **New → Blueprint**.
3. Connect `BenMClayton/portfolio`.
4. Use the `main` branch.
5. Render reads `render.yaml` and deploys the static site.

### Manual Render Static Site

Use these settings:

- Branch: `main`
- Build command: `npm ci && npm run build`
- Publish directory: `dist`

## 3. Add contact details

Edit `src/portfolio.ts` and set `email` and `linkedin`. Until then, Contact buttons open the GitHub profile.
