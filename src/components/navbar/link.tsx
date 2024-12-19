import Link from "next/link";

import Typography from "@mui/material/Typography";

type LinkToPageProps = {
  path: string;
  currentPath: string;
  name: string;
};

const LinkToPage = ({ path, currentPath, name }: LinkToPageProps) => {
  const disabled = currentPath === path;

  console.log(path, currentPath, name);

  return (
    <>
      {disabled ? (
        <Typography
          component="h3"
          variant="h4"
          sx={{ color: "lightgrey", fontWeight: "bold" }}
        >
          {name}
        </Typography>
      ) : (
        <Link href={path}>
          <Typography
            component="h3"
            variant="h4"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            {name}
          </Typography>
        </Link>
      )}
    </>
  );
};

export default LinkToPage;
