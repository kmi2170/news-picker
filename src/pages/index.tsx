import { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectNews, setLang, setFavorites } from '../features/newsSlice';
import Navbar from '../components/Navbar/Navbar';
import NewsCards from '../components/NewsCards';
import Footer from '../components/Footer';
import { useCustomeCookies } from '../hooks/useCustomCookies';
import {
  isFavoritesCookieValid,
  isLangCookieValid,
} from '../utils/cookiesValidator';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  buttonsLang: {
    marginTop: '1.0rem',
  },
  buttonsCategory: {
    marginTop: '0.5rem',
    marginBottom: '1.0rem',
  },
  error: {
    padding: '3rem 0',
  },
}));

const Home = () => {
  const classes = useStyles();

  const { lang, favorites } = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  const { cookies, setLangCookie, setFavoritesCookie } = useCustomeCookies();

  useEffect(() => {
    if (isLangCookieValid(cookies.news_lang)) {
      dispatch(setLang(cookies.news_lang));
    }

    if (isFavoritesCookieValid(cookies.news_favorites)) {
      dispatch(setFavorites(cookies.news_favorites));
    }
  }, []);

  useEffect(() => setLangCookie(lang), [lang]);

  useEffect(() => setFavoritesCookie(favorites), [favorites]);

  return (
    <div className={classes.root}>
      <Navbar />
      <Container>
        <NewsCards />
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
