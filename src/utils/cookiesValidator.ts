export const isLangCookieValid = (lang: any) => {
  if (lang && (lang === 'en' || lang == 'ja')) {
    return true;
  }

  return false;
};

export const isFavoritesCookieValid = (favorites: any) => {
  if (favorites && Array.isArray(favorites) && favorites.length) {
    return true;
  }

  return false;
};
