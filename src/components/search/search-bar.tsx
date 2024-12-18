"use client";

import { memo, useRef, useState, FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Language } from "../../api/types";

const searchNews = memo(() => {
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
      sx={{ pt: "5rem" }}
    >
      <Typography component="h2" variant="h4">
        Search News by Keyword
      </Typography>

      <TextField
        slot="input"
        ref={inputRef}
        placeholder="Type Keyword"
        fullWidth
        autoFocus
        autoComplete="off"
        spellCheck={false}
      />

      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          disabled={language === "en"}
          onClick={() => handleSwitchLanguage("en")}
        >
          English
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={language === "jp"}
          onClick={() => handleSwitchLanguage("jp")}
          sx={{ ml: "1rem" }}
        >
          Japanese
        </Button>
        <Button type="submit" variant="outlined" sx={{ ml: "5rem" }}>
          Search
        </Button>
      </Box>
    </Box>
  );
});

export default searchNews;
