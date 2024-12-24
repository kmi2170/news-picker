"use client";

import { useRef, useState, FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Language } from "../../api/types";

const SearchNews = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [language, setLanguage] = useState<Language>("en");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSwitchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const handleSearchQuerySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = inputRef.current?.querySelector("input")?.value;

    if (q) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", q);
      params.set("language", language);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearchQuerySubmit}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        slot="input"
        ref={inputRef}
        placeholder="Type Keyword"
        autoFocus
        autoComplete="off"
        spellCheck={false}
        fullWidth
        sx={{ flex: 2 }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            color: "black",
            background: "white",
            border: "2px solid black",
          }}
        >
          Search
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Button
            variant="contained"
            size="small"
            disabled={language === "en"}
            onClick={() => handleSwitchLanguage("en")}
            sx={{
              color: "black",
              background: "white",
              ":disabled": {
                color: "white",
                background: "black",
              },
            }}
          >
            English
          </Button>
          <Button
            variant="contained"
            size="small"
            disabled={language === "jp"}
            onClick={() => handleSwitchLanguage("jp")}
            sx={{
              color: "black",
              background: "white",
              ":disabled": {
                color: "white",
                background: "black",
              },
            }}
          >
            Japanese
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchNews;
