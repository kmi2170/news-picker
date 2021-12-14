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

const Home: React.FC = () => {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(["lang", "favorites"]);

  const { q, lang, topic, favorites, page, from, to, sources } =
    useAppSelector(selectNews);

  const { data: news } = useGetNewsApiQuery({
    q,
    lang,
    topic,
    page,
    from,
    to,
    sources,
  });
  console.log("newscards data", news);

  const cookiesOptions = {
    path: "/",
    maxAge: 31536000, // 1 year
    // maxAge: 2600000, // 1 month
    sameSite: true,
  };

  useEffect(() => {
    if (cookies.lang) {
      setLang(cookies.lang);
    }

    if (cookies.favorites && cookies.favorites.length) {
      setFavorites(cookies.favorites);
    }
  }, []);

  useEffect(() => {
    setCookie("lang", lang, cookiesOptions);
  }, [lang]);

  useEffect(() => {
    setCookie("favorites", JSON.stringify(favorites), cookiesOptions);
  }, [favorites]);

  return (
    <div className={classes.root}>
      <SEO />
      <Navbar
      // lang={lang}
      // setLang={setLang}
      // topic={topic}
      // setTopic={setTopic}
      // setIsLoading={setIsLoading}
      // favorites={favorites}
      // setFavorites={setFavorites}
      // setCookieFunc={setCookieFunc}
      />

      <Container>
        <NewsCards />
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
