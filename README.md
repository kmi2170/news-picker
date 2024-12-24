# News Picker

An news app, using [News API](https://newsapi.org/)

## Features
- Headlines, by category (English only)
- Search news by keyword (English / Japanese)

## Technicals
Built with Next.js (utilizing server components), TypeScript and Material UI

### Authentication
You need to API key from [News API](https://newsapi.org/). There is a free plan (up to 100 calls / day).
Create .env.local file in the project root folder and define the key there as enviromental variables.

```bash
// .env.local file
NEWS_API_KEY='<API KEY>'

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
