import { memo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { Search, Cancel } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import makeStyles from "@mui/styles/makeStyles";

import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setQ } from "../../../slice/newsSlice";

const useStyles = makeStyles(() => ({
  searchContainer: {
    marginTop: 5,
    border: `1px solid ${grey[400]}`,
    borderRadius: 30,
  },
  input: {},
  icon: {
    color: grey[600],
  },
  iconContainer: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Searchbar = () => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const q = useAppSelector((state) => state.news.q);
  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const handleClear = () => {
    setSearchTerm("");
    if (q) dispatch(setQ(""));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setQ(searchTerm));
  };

  return (
    <div className={classes.searchContainer}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
          <IconButton
            aria-label="submit button"
            type="submit"
            className={classes.iconContainer}
            size="large"
          >
            <Search className={classes.icon} />
          </IconButton>
          <InputBase
            fullWidth
            type="text"
            value={searchTerm}
            placeholder="Search by keyword"
            onChange={handleInput}
            className={classes.input}
          />
          <IconButton
            aria-label="clear button"
            type="button"
            onClick={handleClear}
            className={classes.iconContainer}
            size="large"
          >
            <Cancel className={classes.icon} />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default memo(Searchbar);
