import router, { useRouter } from 'next/router';
// import format from 'date-fns/format';

import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

import DateFromTo from './DateFromTo';
// import { topicButtons } from './ButtonsTopic';
import { localToUtcString } from '../../utils/localToUTCString';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  button: {
    borderRadius: '15px',
    textTransform: 'capitalize',
    // marginTop: '0.5rem',
    marginTop: 0,
    marginBottom: '1.0rem',
    color: '#fff',
    background: teal[500],
  },
}));

interface AdvanceSearchProps {
  lang: string;
  sources: string | null;
  setSources: (sources: string) => void;
  dateFrom: Date | null;
  setDateFrom: (dateFrom: Date | null) => void;
  dateTo: Date | null;
  setDateTo: (dateFrom: Date | null) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
}

const AdvanceSearch: React.FC<AdvanceSearchProps> = ({
  lang,
  sources,
  setSources,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  searchInput,
  setSearchInput,
}) => {
  const classes = useStyles();
  const { query } = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const from = format(dateFrom, 'yyyy/MM/dd');
    // const to = format(dateTo, 'yyyy/MM/dd');
    const from = localToUtcString(dateFrom);
    const to = localToUtcString(dateTo);

    router.push({
      pathname: '/',
      query: { ...query, sources, from, to },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              label="Source"
              type="text"
              placeholder="e.g. nytimes.com"
              margin="none"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={sources}
              onChange={(e) => setSources(e.target.value)}
              // className={classes.input}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateFromTo
              dateFrom={dateFrom}
              setDateFrom={setDateFrom}
              dateTo={dateTo}
              setDateTo={setDateTo}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              className={classes.button}
            >
              Apply This Options
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AdvanceSearch;
