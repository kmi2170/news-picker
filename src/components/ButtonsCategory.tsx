import { useState } from 'react';
import router, { useRouter } from 'next/router';

import { Typography, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { CategoryType } from '../api/type_settngs';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: '15px',
    textTransform: 'capitalize',
    marginRight: '0.10rem',
  },
}));

const buttons = [
  { id: 1, category: 'top', name: 'top' },
  { id: 2, category: 'business', name: 'business' },
  { id: 3, category: 'science', name: 'science' },
  { id: 4, category: 'technology', name: 'technology' },
  { id: 5, category: 'sports', name: 'sports' },
  { id: 6, category: 'health', name: 'health' },
  { id: 7, category: 'entertainment', name: 'entertainment' },
];

interface ButtonsLanguageProp {
  setCategory: (category: CategoryType) => void;
  defaultCategory: string;
}

const ButtonsLanguage: React.FC<ButtonsLanguageProp> = ({
  setCategory,
  defaultCategory,
}) => {
  const classes = useStyles();
  const { query } = useRouter();

  const [buttonsState, setButtonsState] = useState<boolean[]>(
    buttons.map((button) => button.category === defaultCategory)
  );

  const clickHandlerLang = (category: CategoryType) => {
    setButtonsState(buttons.map((button) => button.category === category));
    setCategory(category);

    router.push({
      pathname: '/',
      query: { ...query, category },
    });
  };

  return (
    <div>
      {buttons.map(({ id, category, name }, index) => (
        <Button
          key={id}
          variant={buttonsState[index] ? 'contained' : 'outlined'}
          color="primary"
          size="small"
          onClick={() => clickHandlerLang(category as CategoryType)}
          className={classes.button}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default ButtonsLanguage;
