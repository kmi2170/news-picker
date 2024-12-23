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
    if (category !== categoryQuery && categoryQuery != null) {
      setCategory(categoryQuery);
    }
  }, [categoryQuery]);

  const handleSwitchCategory = (category: HeadlineCategoryQuery) => {
    setCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box
      sx={(theme) => ({
        mt: sideMenuModeOn ? "1rem" : 0,
        mb: "2rem",
        p: "1rem",
        display: "flex",
        [theme.breakpoints.down("sm")]: {
          display: sideMenuModeOn ? " block" : "none",
        },
        flexDirection: "column",
        justifyContent: "flex-start",
      })}
    >
      <Typography
        component="h3"
        variant="h6"
        align={sideMenuModeOn ? "center" : "left"}
        sx={{
          mb: "1rem",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        Categories
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: sideMenuModeOn ? "column" : "row",
          justifyContent: "flex-start",
          alignItems: sideMenuModeOn ? "center" : "flex-start",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {headlinesCategories.map(({ query, name }) => {
          return (
            <Button
              key={query}
              variant="contained"
              disabled={category === query}
              onClick={() => handleSwitchCategory(query)}
              sx={{
                width: "9rem",
                color: "black",
                background: "white",
                border: "1px solid black",
                ":disabled": {
                  color: "white",
                  background: "black",
                },
              }}
            >
              {name}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default HeadlinesCategoryButtons;
