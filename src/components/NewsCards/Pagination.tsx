import { useState } from "react";
import router, { useRouter } from "next/router";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

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
  // setIsLoading: (isLoading: boolean) => void;
  currentPage: number;
  totalPages: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  // setIsLoading,
  currentPage,
  totalPages,
}) => {
  const classes = useStyles();
  const { query } = useRouter();

  const [page, setPage] = useState<number>(currentPage || 1);

  const handleClick = (_, page: number) => {
    console.log(page);
    setPage(page);
    // setIsLoading(true);

    router.push({
      pathname: "/",
      query: { ...query, page },
    });
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
