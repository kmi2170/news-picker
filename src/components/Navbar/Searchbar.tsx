import { useState, useEffect } from "react";

import { IconButton, InputBase } from "@material-ui/core";
import { Search, Cancel } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectNews, setQ, setSearchTerm } from "../../features/newsSlice";

const useStyles = makeStyles((theme: Theme) => ({
  searchContainer: {
    marginTop: 5,
    // justifyContent: 'space-between',
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
    // paddingRight: '1.0rem',
    // [theme.breakpoints.down('sm')]: {
    //   paddingRight: '2.0rem',
    // },
  },
}));

const Searchbar: React.FC = () => {
  const classes = useStyles();

  const { q, searchTerm } = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  // const [searchInput, setSearchInput] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchTerm(e.target.value));
  // setSearchInput(e.target.value);

  const handleClear = () => {
    // setSearchInput("");
    dispatch(setSearchTerm(""));
    if (q) dispatch(setQ(""));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setQ(searchTerm));
    console.log("submit", searchTerm);
  };

  return (
    <div className={classes.searchContainer}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
          <IconButton
            // onClick={handleSubmit}
            type="submit"
            className={classes.iconContainer}
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
          <IconButton onClick={handleClear} className={classes.iconContainer}>
            <Cancel className={classes.icon} />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
