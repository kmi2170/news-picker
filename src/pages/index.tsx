import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import axios, { AxiosRequestConfig } from 'axios';

import { Grow, Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import SEO from '../components/SEO';
import ButtonsLanguage from '../components/ButtonsLanguage';
import ButtonsCategory from '../components/ButtonsCategory';
import NewsCards from '../components/NewsCards';
import Footer from '../components/Footer';
import Preview from '../components/Preview';

import { LangType, CategoryType, IData } from '../api/type_settngs';

// const baseUrl = `https://newsdata.io/api/1/news`;
// const fetcher = async (url: string) => {
//   try {
//     const { data } = await axios(url);
//     return data;
//   } catch (error) {
//     console.error();
//   }
// };

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    // backgroundImage:
    //   'linear-gradient(to bottom, rgb(102,255,255,0.15), rgba(218,165,32,0.25))',

    minHeight: '100vh',
  },
  buttonsLang: {
    marginTop: '1.0rem',
  },
  buttonsCategory: {
    marginTop: '0.5rem',
    marginBottom: '1.0rem',
  },
}));

interface HomeProps {
  data: any;
  error: string | null;
}
// const Home: React.FC = () => {
const Home: React.FC<HomeProps> = ({ data, error }) => {
  const classes = useStyles();
  const { query } = useRouter();

  const defaultLang = (query.lang as LangType) || 'en';

  const [lang, setLang] = useState<LangType>(defaultLang);

  const defaultCategory = 'news';
  const [category, setCategory] = useState<CategoryType>(defaultCategory);

  const [news, setNews] = useState(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setNews(data);
    setIsLoading(false);
  }, [data]);

  if (error) {
    <Typography variant="h5" color="error">
      Error: Something went wrong! Please Try again later.
    </Typography>;
  }

  // console.log(data);
  return (
    <div className={classes.root}>
      <SEO />
      <Container>
        <Typography variant="h3" component="h1">
          News Picker
        </Typography>

        <div className={classes.buttonsLang}>
          <ButtonsLanguage
            setLang={setLang}
            defaultLang={defaultLang}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className={classes.buttonsCategory}>
          <ButtonsCategory
            setCategory={setCategory}
            defaultCategory={defaultCategory}
          />
        </div>

        <NewsCards news={news} isLoading={isLoading} />
        {/* 
        <Preview data={news} />
        */}

        <Footer />
      </Container>
    </div>
  );
};

export default Home;

// const options: AxiosRequestConfig = {
//   method: 'GET',
//   url: 'https://free-news.p.rapidapi.com/v1/search',
//   params: { q: 'news', lang: 'ja' },
//   headers: {
//     'x-rapidapi-key': process.env.x_rapidapi_key,
//     'x-rapidapi-host': process.env.x_rapidapi_host,
//   },
// };
//

type ParamsType = { q: string; lang: string };

const axiosOptions = (params: ParamsType) => ({
  method: 'GET',
  url: 'https://free-news.p.rapidapi.com/v1/search',
  params: params,
  headers: {
    'x-rapidapi-key': process.env.x_rapidapi_key,
    'x-rapidapi-host': process.env.x_rapidapi_host,
  },
});

const fetchFunc = async (options: AxiosRequestConfig) => {
  try {
    const { data } = await axios.request(options);
    return { data, error: null };
  } catch (error) {
    console.log(error);
    return { data: undefined, error };
  }
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q, lang } = query;

  const params = { q: q || 'news', lang: lang || 'en' };
  // const params = { q: q ? q : 'news', lang: lang ? lang : 'en' };
  const options = axiosOptions(params as ParamsType);

  const { data, error } = await fetchFunc(options as AxiosRequestConfig);

  // console.log(data);
  // console.log(error);

  return { props: { data, error } };
};
