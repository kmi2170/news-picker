import Pagination from "@mui/material/Pagination";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";

import { selectNews, setPage } from "../../../slice/newsSlice";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";

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

const PaginationComponent = ({ totalPages }: PaginationComponentProps) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { page } = useAppSelector(selectNews);

  const handleClick = (_: React.ChangeEvent<unknown>, page: number) => {
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
