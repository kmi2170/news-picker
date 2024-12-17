import { memo } from "react";
import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";

import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setLang } from "../../../slice/newsSlice";
import { LangType } from "../../../api/types";

const useStyles = makeStyles(() => ({
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

const ButtonsLanguage = () => {
  const classes = useStyles();

  const lang = useAppSelector((state) => state.news.lang);
  const dispatch = useAppDispatch();

  const handleClickLang = (lang: LangType) => dispatch(setLang(lang));

  return (
    <>
      {buttons.map(({ id, code, name }) => (
        <Button
          key={id}
          variant={code === lang ? "contained" : "outlined"}
          color="secondary"
          size="small"
          onClick={() => handleClickLang(code as LangType)}
          className={classes.button}
        >
          {name}
        </Button>
      ))}
    </>
  );
};

export default memo(ButtonsLanguage);
