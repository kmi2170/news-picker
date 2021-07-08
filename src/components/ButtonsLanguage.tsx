import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';

import { Typography, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { LangType } from '../api/type_settngs';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: '15px',
    textTransform: 'capitalize',
    marginRight: '0.10rem',
  },
}));

const buttons = [
  { id: 1, code: 'en', name: 'English' },
  { id: 2, code: 'ja', name: 'Japanese' },
];

export interface ButtonsLanguageProp {
  lang: string;
  setLang: (lang: LangType) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCookieFunc: (name: string, value: string) => void;
}

const ButtonsLanguage: React.FC<ButtonsLanguageProp> = ({
  lang,
  setLang,
  setIsLoading,
  setCookieFunc,
}) => {
  const classes = useStyles();
  const { query } = useRouter();

  const clickHandlerLang = (lang: LangType) => {
    setLang(lang);
    setCookieFunc('lang', lang);
    setIsLoading(true);

    router.push({
      pathname: '/',
      query: { ...query, lang },
    });
  };

  return (
    <div>
      {buttons.map(({ id, code, name }) => (
        <Button
          key={id}
          //variant={buttonsState[index] ? 'contained' : 'outlined'}
          variant={code === lang ? 'contained' : 'outlined'}
          color="secondary"
          size="small"
          onClick={() => clickHandlerLang(code as LangType)}
          className={classes.button}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default ButtonsLanguage;
