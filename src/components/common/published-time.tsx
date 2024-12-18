import Typography from "@mui/material/Typography";
import { timePeriodFromNow, convertToLocalTime } from "../../utils/time";

const PublishedTime = ({
  publishedAt,
  withFromNow = false,
  withTime = false,
}: {
  publishedAt: string;
  withFromNow?: boolean;
  withTime?: boolean;
}) => {
  return (
    <>
      {withFromNow && (
        <Typography
          variant="body2"
          align="right"
          sx={{ width: "100%", color: "grey" }}
        >
          {timePeriodFromNow(publishedAt)}
        </Typography>
      )}
      {withTime && (
        <Typography
          variant="body2"
          align="right"
          sx={{ width: "100%", color: "grey" }}
        >
          {convertToLocalTime(publishedAt)}
        </Typography>
      )}
    </>
  );
};

export default PublishedTime;
