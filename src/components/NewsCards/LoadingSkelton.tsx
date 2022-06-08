import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingSkelton = () => {
  return (
    <Grid container justifyContent="space-between" spacing={2}>
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="rect" width={345} height={200} />
            <Skeleton
              variant="rect"
              width={345}
              height={15}
              style={{ marginTop: 10 }}
            />
            <Skeleton
              variant="rect"
              width={345}
              height={10}
              style={{ marginTop: 10 }}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingSkelton;
