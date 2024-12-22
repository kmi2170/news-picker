"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { HeadlineCategoryQuery } from "../../api/types";
import { headlinesCategories } from "../../assets/headlines-categories";

type HeadlinesCategoryButtonsProps = {
  sideMenuModeOn?: boolean;
};

const HeadlinesCategoryButtons = ({
  sideMenuModeOn,
}: HeadlinesCategoryButtonsProps) => {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category") as HeadlineCategoryQuery;
  const pathname = usePathname();
  const { replace } = useRouter();

  const [category, setCategory] = useState<HeadlineCategoryQuery>(
    categoryQuery || "all"
  );

  useEffect(() => {
    if (category !== categoryQuery) {
      setCategory(categoryQuery);
    }
  }, [categoryQuery]);

  const handleSwitchCategory = (category: HeadlineCategoryQuery) => {
    setCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        mt: sideMenuModeOn ? "1rem" : 0,
        mb: "2rem",
        p: "1rem",
        display: "flex",
        flexDirection: sideMenuModeOn ? "column" : "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
      }}
    >
      <Typography
        component="h3"
        variant="h6"
        sx={{ fontWeight: "bold", width: "100%" }}
        align={sideMenuModeOn ? "center" : "left"}
      >
        Categories
      </Typography>

      {headlinesCategories.map(({ query, name }) => {
        return (
          <Button
            key={query}
            variant="contained"
            disabled={category === query}
            onClick={() => handleSwitchCategory(query)}
            sx={{ width: "9rem" }}
          >
            {name}
          </Button>
        );
      })}
    </Box>
  );
};

export default HeadlinesCategoryButtons;
