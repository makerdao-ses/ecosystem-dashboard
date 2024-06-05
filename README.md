# MakerDAO Ecosystem Performance Dashboard

This repository contains the code of the [Fusion platform](https://expenses.makerdao.network/)

It is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## After bootstrapping it was also added

- Storybook
- ESLint
- Material UI, emotion and styled components
- Sass
- React-router-dom

## Getting started

### Required environment variables

```bash
# the graphql endpoint url
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://server-example.com/graphql

# environment name
# possible values: development | staging | production
NEXT_PUBLIC_ENVIRONMENT=development

# base url of the site (without trailing slash)
NEXT_PUBLIC_BASE_URL=https://expenses.makerdao.network

# if the sitemap is active or not (true | false)
ENABLE_SITEMAP=true

# Google tag tracking code if it is used
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXX

# not required, used for the storybook-figma integration plugin
STORYBOOK_FIGMA_ACCESS_TOKEN=XXXX
```

### To run in development mode use

### `yarn dev`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### To run tests use

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### To build the app for production use

Run `yarn build`

## Docker

In order to build/run the project using Docker, you should:

1. Create the `.env` file (see the `.env.example` file)
2. Build the images: `docker compose build`
3. Run the image: `docker compose up` or `docker compose up -d` to run the images in detached mode

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
