# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Render deployment

The production frontend uses `/api` so authentication cookies remain same-origin.
In the Render Static Site dashboard, add a **Rewrite** rule:

- Source: `/api/*`
- Destination: `https://wavely-backend-7ryc.onrender.com/api/*`
- Action: `Rewrite`

If `VITE_API_URL` is set for the frontend, set it to `/api` (or remove it to use
the production default). Local development continues to call the backend URL
directly.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
