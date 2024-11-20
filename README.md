# News Picker

An news app to fetch news from 
[NewCatcher API](https://www.newscatcherapi.com/)
This project is Work-In-Progress!

## Features
- Search news by keywords, sources and date (up to a month old).
- Language: English / Japanese
- Register kewords as favorites and call them back later
(cookie must be enabled).

## Technicals
### This Project
Built with Next.js, TypeScript, Redux-Toolkit&RTK-Query  and Material UI

### Authentication
You need to API key from [NewCatcher API](https://www.newscatcherapi.com/)
Create .env.local file in the project root folder and define the key there as enviromental variables.

```bash
// .env.local file
NEXT_PUBLIC_API_KEY='<API KEY>'
NEXT_PUBLIC_API_HOST='<API HOSAT>'
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
