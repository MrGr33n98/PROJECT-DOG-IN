# Dog's Inn Cuiabá

This project contains a React web application built with [Vite](https://vitejs.dev/) and a simple Node.js/Express API server used for demonstration purposes.

## Requirements

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/)

## Installation

1. Install the dependencies:
   ```bash
   npm install
   ```
2. (Optional) Adjust environment variables. The API server reads the following variable:
   - `PORT` – Port number for the Express server (defaults to `3000`).

## Development

The frontend and backend servers are started separately. Open two terminals and run:

```bash
# Terminal 1: Vite dev server with hot reload
npm run dev

# Terminal 2: Start the Express API server
npm run server
```

Running `npm run dev` serves the React application on the port printed by Vite (usually `5173`). The API server will run on the port defined by `PORT` or `3000` by default.

Other useful commands:

- `npm run lint` – run ESLint on the project sources.
- `npm run build` – build the production bundle into the `dist/` directory.
- `npm run preview` – locally preview the production build.

## Production Deployment

1. Build the frontend assets:
   ```bash
   npm run build
   ```
   The compiled files are generated in `dist/`.

2. Deploy the static files in `dist/` using any static file server (for example, Nginx or a cloud provider). Start the Express API server in production mode by running:
   ```bash
   npm run server
   ```
   Ensure the `PORT` environment variable is set appropriately.

The frontend expects the API server to be reachable under the same host on the `/api` path.

