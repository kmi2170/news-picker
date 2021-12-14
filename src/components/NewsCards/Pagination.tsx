import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

import { selectNews, setPage } from "../../features/newsSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

interface PaginationComponentProps {
  totalPages: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalPages,
}) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { page } = useAppSelector(selectNews);

  const handleClick = (_, page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className={classes.root}>
      <Pagination
        page={page}
        count={totalPages}
        shape="rounded"
        showFirstButton
        onChange={handleClick}
      />
    </div>
  );
};

export default PaginationComponent;
