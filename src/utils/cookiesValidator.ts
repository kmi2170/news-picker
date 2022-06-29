export const isLangCookieValid = (lang: unknown) => {
  if (lang && (lang === 'en' || lang == 'ja')) {
    return true;
  }
  return false;
};

export const isFavoritesCookieValid = (favorites: unknown) => {
  if (favorites && Array.isArray(favorites) && favorites.length) {
    return true;
  }
  return false;
};
