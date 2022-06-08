import { useCookies } from 'react-cookie';

const cookiesOptions = {
  path: '/',
  maxAge: 2600000,
  sameSite: true,
};

export const useCustomeCookies = () => {
  const [cookies, setCookie] = useCookies(['news_lang', 'news_favorites']);

  const setLangCookie = lang => setCookie('news_lang', lang, cookiesOptions);

  const setFavoritesCookie = favorites =>
    setCookie('news_favorites', favorites, cookiesOptions);

  return { cookies, setLangCookie, setFavoritesCookie };
};
