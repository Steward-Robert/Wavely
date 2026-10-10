# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## API configuration

The shared Axios client uses the Vercel `/api` proxy in production. The
`vercel.json` rewrite forwards those requests to the Render backend, while the
SPA fallback serves the React application for other routes. Keep the Vercel
project's Root Directory set to `vite-project` so it reads this configuration.

For local development, the client defaults to the Render API and can be pointed
at another API with `VITE_API_URL`. Production always uses `/api`, so a
deployment environment variable cannot bypass the Vercel proxy. Authentication
requests use credentialed cookies through the shared client.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
