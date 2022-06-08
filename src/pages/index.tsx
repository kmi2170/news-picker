import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectNews, setLang, setFavorites } from '../features/newsSlice';
import Navbar from '../components/Navbar/Navbar';
import NewsCards from '../components/NewsCards';
import Footer from '../components/Footer';

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

const Home: React.FC = () => {
  const classes = useStyles();

  const { lang, favorites } = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  const [cookies, setCookie] = useCookies(['lang', 'favorites']);

  const cookiesOptions = {
    path: '/',
    maxAge: 31536000, // 1 year
    // maxAge: 2600000, // 1 month
    sameSite: true,
  };

  useEffect(() => {
    if (cookies.lang) {
      dispatch(setLang(cookies.lang));
    }

    if (cookies.favorites && cookies.favorites.length) {
      console.log(cookies.favorites);
      dispatch(setFavorites(cookies.favorites));
    }
  }, []);

  useEffect(
    () => {
      setCookie('lang', lang, cookiesOptions);
    },
    [lang]
  );

  useEffect(
    () => {
      setCookie('favorites', JSON.stringify(favorites), cookiesOptions);
    },
    [favorites]
  );

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
