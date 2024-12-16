import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2">
            Copyrihgt &copy; kmi {year}. All rights reserved. | Powerd by{' '}
            {
              <a
                href="https://newscatcherapi.com/"
                rel="noreferrer"
                target="_blank"
              >
                NewsCatcher
              </a>
            }
            .
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default memo(Footer);
