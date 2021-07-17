import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';
import format from 'date-fns/format';

import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import DateFromTo from './DateFromTo';
import { topicButtons } from './ButtonsTopic';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  button: {
    borderRadius: '15px',
    textTransform: 'capitalize',
    marginTop: '0.5rem',
    marginBottom: '1.0rem',
  },
}));

interface AdvanceSearchProps {
  lang: string;
}

const AdvanceSearch: React.FC<AdvanceSearchProps> = ({ lang }) => {
  const classes = useStyles();
  const { query } = useRouter();

  const [keywords, setKeywords] = useState('');
  const [topic, setTopic] = useState('');
  const [sources, setSources] = useState(null);

  const initDateFrom = new Date();
  initDateFrom.setDate(initDateFrom.getDate() - 7);
  const [dateFrom, setDateFrom] = useState<Date | null>(initDateFrom);
  const [dateTo, setDateTo] = useState<Date | null>(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(keywords, topic, sources, dateFrom, dateTo);
    console.log(
      keywords,
      topic,
      sources,
      format(dateFrom, 'yyyy/MM/dd'),
      format(dateTo, 'yyyy/MM/dd')
    );
    const from = format(dateFrom, 'yyyy/MM/dd');
    const to = format(dateTo, 'yyyy/MM/dd');

    router.push({
      pathname: '/',
      query: {
        ...query,
        // q: keywords,
        // lang,
        // page: 1,
        // topic,
        sources,
        from,
        to,
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* 
        <TextField
          required
          label="Keywords"
          type="text"
          placeholder=""
          margin="dense"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          // className={classes.input}
        />
        <TextField
          select
          label="Topic"
          value={topic}
          defaultValue={topic}
          onChange={(e) => setTopic(e.target.value)}
          // helperText="Please select topic"
          // InputLabelProps={{ shrink: true }}
        >
          {topicButtons.map((topicButton) => (
            <MenuItem key={topicButton.id} value={topicButton.code}>
              {topicButton.name[lang]}
            </MenuItem>
          ))}
        </TextField>
        */}

        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Source"
              type="text"
              placeholder="e.g. nytimes.com"
              margin="dense"
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
          <Grid item xs={12}>
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
