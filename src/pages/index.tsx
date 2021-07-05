import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import axios from 'axios';

import { Grow, Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import SEO from '../components/SEO';
import ButtonsLanguage from '../components/ButtonsLanguage';
import ButtonsCategory from '../components/ButtonsCategory';
import Footer from '../components/Footer';

import { LangType, CategoryType, IData } from '../api/type_settngs';

const baseUrl = `https://newsdata.io/api/1/news`;

const fetcher = async (url: string) => {
  try {
    const { data } = await axios(url);
    return data;
  } catch (error) {
    console.error();
  }
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    // backgroundImage:
    //   'linear-gradient(to bottom, rgb(102,255,255,0.15), rgba(218,165,32,0.25))',

    minHeight: '100vh',
  },
}));

const Home: React.FC<IData> = ({ data }) => {
  const classes = useStyles();
  const { query } = useRouter();

  const defaultLang = 'en';
  const [lang, setLang] = useState<LangType>(defaultLang);

  const defaultCategory = 'top';
  const [category, setCategory] = useState<CategoryType>(defaultCategory);

  const [news, setNews] = useState<IData>(undefined);
  // const [location, setLocation] = useState<string>('');

  useEffect(() => {
    setNews(data);
  }, [data]);

  // const clickHandlerLang = () => {
  //   setLang(lang === 'en' ? 'jp' : 'en');

  //   router.push(
  //     {
  //       pathname: '/',
  //       query: { ...query, language: lang },
  //     }
  //     // undefined,
  //     // { shallow: true }
  //   );
  // };

  const clickHandlerCategory = (category: CategoryType) => {
    setCategory(category);

    router.push(
      {
        pathname: '/',
        query: { ...query, category: category },
      }
      // undefined,
      // { shallow: true }
    );
  };

  // console.log(data);
  return (
    <div className={classes.root}>
      <SEO />
      <Container>
        <Typography variant="h3" component="h1">
          Latest News Picker
        </Typography>
        <ButtonsLanguage setLang={setLang} defaultLang={defaultLang} />
        <ButtonsCategory
          setCategory={setCategory}
          defaultCategory={defaultCategory}
        />
        {/* top business science technology sports health entertainment 
        <div>
          <Button
            variant="outlined"
            onClick={() => clickHandlerCategory('top')}
          >
            top
          </Button>
          <Button
            variant="outlined"
            onClick={() => clickHandlerCategory('science')}
          >
            science
          </Button>
          <Button
            variant="outlined"
            onClick={() => clickHandlerCategory('sports')}
          >
            sports
          </Button>
        </div>
      */}
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <pre>{JSON.stringify(news, null, 4)}</pre>
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { language, category } = query;

  const apikey = process.env.NEWS_DATA_API_KEY;
  const urlWithApiKey = `${baseUrl}?apikey=${apikey}`;

  const urlWithLang = `${urlWithApiKey}&language=${
    language === 'jp' ? 'jp' : 'en'
  }`;

  const urlWithQuery = category
    ? `${urlWithLang}&category=${category}`
    : `${urlWithLang}&category=top`;

  console.log(urlWithQuery);

  const data = await fetcher(urlWithQuery);

  return {
    props: {
      data,
    },
  };
};
