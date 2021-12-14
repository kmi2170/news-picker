// import { useState, useEffect } from 'react';

import { Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectNews, setLang } from "../../features/newsSlice";

import { LangType } from "../../api/type_settngs";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: "15px",
    textTransform: "capitalize",
    marginRight: "0.25rem",
    hight: "1rem",
  },
}));

const buttons = [
  { id: 1, code: "en", name: "English" },
  { id: 2, code: "ja", name: "Japanese" },
];

const ButtonsLanguage: React.FC = () => {
  const classes = useStyles();

  const { lang } = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  const clickHandlerLang = (lang: LangType) => dispatch(setLang(lang));

  return (
    <>
      {buttons.map(({ id, code, name }) => (
        <Button
          key={id}
          variant={code === lang ? "contained" : "outlined"}
          color="secondary"
          size="small"
          onClick={() => clickHandlerLang(code as LangType)}
          className={classes.button}
        >
          {name}
        </Button>
      ))}
    </>
  );
};

export default ButtonsLanguage;
