import { useEffect } from "react";

import { useCookies } from "react-cookie";

import { Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectNews, setLang, setFavorites } from "../features/newsSlice";
import { useGetNewsApiQuery } from "../services/newsApi";

import { LangType, TopicType, NewsDataType } from "../api/type_settngs";

import SEO from "../components/SEO";
import Navbar from "../components/Navbar/Navbar";
import NewsCards from "../components/NewsCards/NewsCards";
import Footer from "../components/Footer";
import Preview from "../components/Preview";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    // backgroundImage:
    //   'linear-gradient(to bottom, rgb(102,255,255,0.15), rgba(218,165,32,0.25))',

    minHeight: "100vh",
  },
  buttonsLang: {
    marginTop: "1.0rem",
  },
  buttonsCategory: {
    marginTop: "0.5rem",
    marginBottom: "1.0rem",
  },
  error: {
    padding: "3rem 0",
  },
}));

interface HomeProps {
  data: any;
  error: string | null;
}
const Home: React.FC = () => {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(["lang", "favorites"]);

  const { lang, topic, favorites } = useAppSelector(selectNews);

  const q = "news";
  const {
    data: news,
    isFetching,
    isError,
  } = useGetNewsApiQuery({ q, lang, topic });
  console.log("newscards data", news);
  // const news = null;

  // const defaultLang = (query.lang as LangType) || "en";
  // const [lang, setLang] = useState<LangType>(defaultLang);

  // const [news, setNews] = useState<NewsDataType | undefined>(undefined);
  // const [error, setError] = useState<boolean>(false);

  // const [topic, setTopic] = useState<TopicType | null>(null);

  // const [favorites, setFavorites] = useState<string[]>([]);

  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const cookiesOptions = {
    path: "/",
    maxAge: 31536000, // 1 year
    // maxAge: 2600000, // 1 month
    sameSite: true,
  };

  const setCookieFunc = (name: "lang" | "favorites", value: string) =>
    setCookie(name, value, cookiesOptions);

  useEffect(() => {
    if (cookies.lang) {
      setLang(cookies.lang);

      // router.push({
      //   pathname: "/",
      //   query: { ...query, lang: cookies.lang },
      // });
    }

    if (cookies.favorites && cookies.favorites.length) {
      setFavorites(cookies.favorites);
    }
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     setNews(data);
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //     setError(true);
  //   }
  // }, [data]);

  // console.log("news", news);
  // console.log("error", error);
  // console.log('query', query);
  // console.log('cookies', cookies);

  return (
    <div className={classes.root}>
      <SEO />
      {/*
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
      */}

      <Container>
        {!isError ? (
          <NewsCards />
        ) : (
          <Typography
            variant="h6"
            // color="error"
            align="center"
            className={classes.error}
          >
            Service is temporally unavailable due to the server problem. Please
            try again later.
          </Typography>
        )}
        <div style={{ marginTop: "2rem" }}></div>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const { q, lang, page, topic, sources, from, to } = query;

//   const params = sources
//     ? { q: q || "news", lang, page, topic, from, to, sources }
//     : { q: q || "news", lang, page, topic, from, to };

//   // const data = null;
//   // const { data } = await fetchFunc(options as AxiosRequestConfig);
//   // const data = await fetchNews(params);
//   // console.log(data);
//   // const { data, error } = await fetchFunc(options as AxiosRequestConfig);

//   // console.log(data);
//   // console.log(error);
//   // console.log(params);

//   return { props: { data } };
// };
