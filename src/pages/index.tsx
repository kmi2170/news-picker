import { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import { useCookies } from "react-cookie";
import axios, { AxiosRequestConfig } from "axios";

import { Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import SEO from "../components/SEO";
import Navbar from "../components/Navbar/Navbar";
import NewsCards from "../components/NewsCards/NewsCards";
import Footer from "../components/Footer";
// import Preview from '../components/Preview';

import { LangType, TopicType, IData } from "../api/type_settngs";

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

    minHeight: "100vh",
  },
  // buttonsLang: {
  //   marginTop: '1.0rem',
  // },
  buttonsCategory: {
    marginTop: "0.5rem",
    marginBottom: "1.0rem",
  },
  error: {
    padding: "1rem 0",
  },
}));

interface HomeProps {
  data: any;
  error: string | null;
}
// const Home: React.FC = () => {
const Home: React.FC<HomeProps> = ({ data }) => {
  const classes = useStyles();
  const { query } = useRouter();
  const [cookies, setCookie] = useCookies(["lang", "favorites"]);

  const defaultLang = (query.lang as LangType) || "en";
  const [lang, setLang] = useState<LangType>(defaultLang);

  const [news, setNews] = useState<IData | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);

  const [topic, setTopic] = useState<TopicType | null>(null);

  const [favorites, setFavorites] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const cookiesOptions = {
    path: "/",
    maxAge: 2600000,
    sameSite: true,
  };

  const setCookieFunc = (name: "lang" | "favorites", value: string) =>
    setCookie(name, value, cookiesOptions);

  useEffect(() => {
    if (cookies.lang) {
      setLang(cookies.lang);

      router.push({
        pathname: "/",
        query: { ...query, lang: cookies.lang },
      });
    }

    if (cookies.favorites && cookies.favorites.length) {
      setFavorites(cookies.favorites);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setNews(data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(true);
    }
  }, [data]);

  console.log("news", news);
  console.log("error", error);
  // console.log('query', query);
  // console.log('cookies', cookies);

  return (
    <div className={classes.root}>
      <SEO />
      <Navbar
        lang={lang}
        setLang={setLang}
        topic={topic}
        setTopic={setTopic}
        setIsLoading={setIsLoading}
        favorites={favorites}
        setFavorites={setFavorites}
        setCookieFunc={setCookieFunc}
      />

      <Container>
        {!error ? (
          <NewsCards
            news={news}
            lang={lang}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <Typography variant="h6" color="error" className={classes.error}>
            Error: Something went wrong in the server. Please Try again later.
          </Typography>
        )}
        {/* 
        <Preview data={news} />
        */}

        <div style={{ marginTop: "2rem" }}></div>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;

// type ParamsType = { q: string; lang: string };

//const axiosOptions = (params: ParamsType) => {
//    method: 'GET',
//    url: 'https://free-news.p.rapidapi.com/v1/search',
//    params,
//    headers: {
//      // 'x-rapidapi-key': 'e55c60efe5msh73070d6e421d34bp11cc43jsn5f182a073484',
//      //'x-rapidapi-host': 'free-news.p.rapidapi.com',
//      'x-rapidapi-key': API_KEY,
//      'x-rapidapi-host': API_HOST,
//      // 'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
//      // 'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST
//    },
//  };

const fetchFunc = async (options: AxiosRequestConfig) => {
  try {
    const { data } = await axios.request(options);
    return { data };
    // return { data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null };
    // return { data: null, error };
  }
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q, lang, page, topic, sources, from, to } = query;

  const params = sources
    ? { q: q || "news", lang, page, topic, from, to, sources }
    : { q: q || "news", lang, page, topic, from, to };

  const options = {
    method: "GET",
    url: "https://free-news.p.rapidapi.com/v1/search",
    timeout: 4500,
    params,
    headers: {
      "x-rapidapi-key": "e55c60efe5msh73070d6e421d34bp11cc43jsn5f182a073484",
      "x-rapidapi-host": "free-news.p.rapidapi.com",
      // 'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      // 'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  };

  const { data } = await fetchFunc(options as AxiosRequestConfig);
  // const { data, error } = await fetchFunc(options as AxiosRequestConfig);

  // console.log(data);
  // console.log(error);
  // console.log(params);

  return { props: { data } };
  // return { props: { data, error: error } };
  // return { props: { data: data ? data : null, error } };
};
