# javonmcgilberry.github.io

This is my personal portfolio site. I built it to present my work as a Senior Full Stack Software Engineer, share a bit of my background, and give the site itself enough personality to feel like a real piece of front-end work instead of a static resume page.

The project is intentionally small, but it gives me room to show responsive layout work, motion, interaction design, and a clean modern React/Next.js setup.

## Stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- ESLint flat config

## Highlights

- Responsive single-page portfolio experience
- Interactive hero section with pointer and touch support
- App Router metadata, `robots.txt`, and `sitemap.xml`
- Static export deployment to GitHub Pages

## Requirements

- Node.js `20.9+`
- pnpm `9.12.2`

If you use Corepack:

```bash
corepack enable
corepack prepare pnpm@9.12.2 --activate
```

## Local Development

```bash
git clone https://github.com/javonmcgilberry/javonmcgilberry.github.io.git
cd javonmcgilberry.github.io
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev`: Start the local development server
- `pnpm build`: Build the static export into `out/`
- `pnpm start`: Serve the generated `out/` directory locally
- `pnpm lint`: Run ESLint with the flat config
- `pnpm typecheck`: Run TypeScript without emitting files

## Deployment

- The app uses `output: "export"` in `next.config.mjs`
- Static assets are served from the root domain at `https://javonmcgilberry.github.io`
- GitHub Actions builds and publishes the `out/` directory to GitHub Pages
