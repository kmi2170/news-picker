"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Pagination from "@mui/material/Pagination";

const BottomPagination = ({
  count,
  page,
}: {
  count: number;
  page?: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      size="large"
      shape="circular"
      count={count}
      page={page}
      defaultPage={1}
      onChange={(_, page) => handlePageChange(page)}
    />
  );
};

export default BottomPagination;
