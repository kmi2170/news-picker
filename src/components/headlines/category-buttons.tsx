"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { HeadlineCategoryQuery } from "../../api/types";
import { headlinesCategories } from "../../assets/headlines-categories";

const HeadlinesCategoryButtons = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [category, setCategory] = useState<HeadlineCategoryQuery>("all");

  const handleSwitchCategory = (category: HeadlineCategoryQuery) => {
    setCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
      }}
    >
      {headlinesCategories.map((headlinesCategory) => {
        return (
          <Button
            variant="contained"
            size="small"
            disabled={category === headlinesCategory.query}
            onClick={() => handleSwitchCategory(headlinesCategory.query)}
          >
            {headlinesCategory.name}
          </Button>
        );
      })}
    </Box>
  );
};

export default HeadlinesCategoryButtons;
