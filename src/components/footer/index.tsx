import Typography from "@mui/material/Typography";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Typography
      component="footer"
      variant="body2"
      align="center"
      sx={{ mt: "2rem", mb: "1.5rem" }}
    >
      &copy; {year} Kemmei H.| Powered by{" "}
      {
        <Link
          href="https://newsapi.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          News API
        </Link>
      }
    </Typography>
  );
};

export default Footer;
