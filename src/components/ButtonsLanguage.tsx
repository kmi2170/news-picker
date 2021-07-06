import { useState } from 'react';
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
  { id: 1, lang: 'en', name: 'English' },
  { id: 2, lang: 'ja', name: 'Japanese' },
];

interface ButtonsLanguageProp {
  setLang: (lang: LangType) => void;
  defaultLang: string;
  setIsLoading: (isLoading: boolean) => void;
}

const ButtonsLanguage: React.FC<ButtonsLanguageProp> = ({
  setLang,
  defaultLang,
  setIsLoading,
}) => {
  const classes = useStyles();
  const { query } = useRouter();

  const [buttonsState, setButtonsState] = useState<boolean[]>(
    buttons.map((button) => button.lang === defaultLang)
  );

  const clickHandlerLang = (lang: LangType) => {
    setButtonsState(buttons.map((button) => button.lang === lang));
    setLang(lang);
    setIsLoading(true);

    router.push({
      pathname: '/',
      query: { ...query, lang },
    });
  };

  return (
    <div>
      {buttons.map(({ id, lang, name }, index) => (
        <Button
          key={id}
          variant={buttonsState[index] ? 'contained' : 'outlined'}
          color="secondary"
          size="small"
          onClick={() => clickHandlerLang(lang as LangType)}
          className={classes.button}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default ButtonsLanguage;
