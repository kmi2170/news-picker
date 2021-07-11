import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { useCookies } from 'react-cookie';
import axios, { AxiosRequestConfig } from 'axios';

import { Grow, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
// import ButtonsLanguage from '../components/ButtonsLanguage';
// import ButtonsCategory from '../components/ButtonsCategory';
import NewsCards from '../components/NewsCards';
import Footer from '../components/Footer';
// import Preview from '../components/Preview';

import { LangType, IData } from '../api/type_settngs';

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
  // buttonsLang: {
  //   marginTop: '1.0rem',
  // },
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
  const [cookies, setCookie] = useCookies(['user']);

  const defaultLang = (query.lang as LangType) || 'en';
  const [lang, setLang] = useState<LangType>(defaultLang);

  // const defaultCategory = 'news';
  // const [category, setCategory] = useState<CategoryType>(defaultCategory);

  const [news, setNews] = useState(undefined);

  const [favorites, setFavorites] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const cookiesOptions = {
    path: '/',
    maxAge: 2600000,
    sameSite: true,
  };

  const setCookieFunc = (name: string, value: string) =>
    setCookie(name, value, cookiesOptions);

  useEffect(() => {
    if (cookies.lang) {
      setLang(cookies.lang);

      router.push({
        pathname: '/',
        query: { ...query, lang: cookies.lang },
      });
    }

    if (cookies.favorites && cookies.favorites.length) {
      setFavorites(cookies.favorites);
    }
  }, []);

  useEffect(() => {
    setNews(data);
    setIsLoading(false);
  }, [data]);

  if (error) {
    <Typography variant="h5" color="error">
      Error: Something went wrong! Please Try again later.
    </Typography>;
  }

  console.log('data', data);
  console.log('news', news);
  console.log('error', error);
  console.log('query', query);
  console.log('cookies', cookies);
  console.log('API_KEY', process.env.NEXT_PUBLIC_RAPID_API_KEY);
  console.log('typeof API_KEY', typeof process.env.NEXT_PUBLIC_RAPID_API_KEY);

  return (
    <div className={classes.root}>
      <SEO />
      <Navbar
        lang={lang}
        setLang={setLang}
        setIsLoading={setIsLoading}
        favorites={favorites}
        setFavorites={setFavorites}
        setCookieFunc={setCookieFunc}
      />
      <Container>
        {/* 
        <div className={classes.buttonsCategory}>
          <ButtonsCategory
            setCategory={setCategory}
            defaultCategory={defaultCategory}
          />
        </div>
      */}

        <NewsCards
          news={news}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {/* 
        <Preview data={news} />
        */}

        <div style={{ marginTop: '2rem' }}></div>
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

const axiosOptions = (params: ParamsType) => {
  const API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;
  const API_HOST = process.env.NEXT_PUBLIC_RAPID_API_HOST;

  return {
    method: 'GET',
    url: 'https://free-news.p.rapidapi.com/v1/search',
    params,
    headers: {
      // 'x-rapidapi-key': 'e55c60efe5msh73070d6e421d34bp11cc43jsn5f182a073484',
      //'x-rapidapi-host': 'free-news.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
      // 'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      // 'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST
    },
  };
};

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
  const { q, lang, page } = query;

  const params = {
    q: q || 'news',
    lang: lang || 'en',
    page: page || 1,
  };
  // const params = { q: q ? q : 'news', lang: lang ? lang : 'en' };
  const options = axiosOptions(params as ParamsType);

  const { data, error } = await fetchFunc(options as AxiosRequestConfig);

  // console.log(data);
  // console.log(error);

  return { props: { data, error } };
};
