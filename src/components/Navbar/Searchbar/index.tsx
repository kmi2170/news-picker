import { memo, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { Search, Cancel } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { setQ } from '../../../features/newsSlice';

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
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Searchbar = () => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const q = useAppSelector((state) => state.news.q);
  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const handleClear = () => {
    setSearchTerm('');
    if (q) dispatch(setQ(''));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setQ(searchTerm));
  };

  return (
    <div className={classes.searchContainer}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex' }}>
          <IconButton
            aria-label="submit button"
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
          <IconButton
            aria-label="clear button"
            type="button"
            onClick={handleClear}
            className={classes.iconContainer}
          >
            <Cancel className={classes.icon} />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default memo(Searchbar);
