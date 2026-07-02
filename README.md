# Ben Clayton — Portfolio

A React and TypeScript portfolio designed for deployment as a Render Static Site.

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

Vite writes the production files to `dist/`.

## Personal details

Edit `src/portfolio.ts` to add or update:

- Email address
- LinkedIn URL
- GitHub and project links

Until an email or LinkedIn URL is added, the main contact button opens the GitHub profile.

## Render deployment

The included `render.yaml` configures the site with:

- Branch: `main`
- Build command: `npm run build`
- Publish directory: `dist`

Render installs the npm dependencies before running the build command.

## Main files

- `src/App.tsx` — page structure and written content
- `src/styles.css` — layout and visual styling
- `src/portfolio.ts` — profile and project links
