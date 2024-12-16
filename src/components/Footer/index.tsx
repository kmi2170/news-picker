import Typography from "@mui/material/Typography";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Typography component="footer" variant="body2">
      &copy; {year} Kemmei H.| Powered by{" "}
      {
        <a href="https://newsapi.org/" rel="noreferrer" target="_blank">
          News API
        </a>
      }
    </Typography>
  );
};

export default Footer;
