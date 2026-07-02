# Ben Clayton — Portfolio

Production-ready React and TypeScript portfolio for Ben Clayton, designed for deployment as a Render Static Site from GitHub.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm ci
npm run build
npm run preview
```

Vite writes the production site to `dist/`. Production source maps are disabled and JavaScript/CSS are minified. Browser-delivered code will always remain inspectable; minification is not a security boundary.

## Personal details

Edit `src/portfolio.ts` to add:

- Email
- LinkedIn URL
- Any updated profile links

The site currently falls back to Ben's GitHub profile for the Contact button.

## Render deployment

A `render.yaml` Blueprint is included. The portfolio is stored on the repository’s `main` branch.

### Blueprint method

1. In Render, choose **New → Blueprint**.
2. Connect `BenMClayton/portfolio`.
3. Select the `main` branch if Render asks for a branch.
4. Render reads `render.yaml`, builds with `npm ci && npm run build`, and publishes `dist`.

### Manual Static Site method

- Repository: `BenMClayton/portfolio`
- Branch: `main`
- Build command: `npm ci && npm run build`
- Publish directory: `dist`

Render redeploys the site after each push to the selected branch.

## Content notes

The architecture diagram is intentionally simplified. It communicates engineering scope without exposing company implementation details. Add only anonymised screenshots to `public/` if Edensmart visuals are included later.
