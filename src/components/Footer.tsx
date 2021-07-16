import { Grid, Typography } from '@material-ui/core';

const Footer = () => {
  const dt = new Date();
  const year = dt.getFullYear();

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

export default Footer;
