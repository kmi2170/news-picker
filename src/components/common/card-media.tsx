import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

const CardImage = ({
  imgUrl,
  width,
  height,
}: {
  imgUrl: string;
  width?: string | undefined;
  height: string;
}) => {
  return (
    <>
      {imgUrl ? (
        <CardMedia
          component="img"
          src={imgUrl}
          alt={`headline ${imgUrl}`}
          sx={{ width, height }}
        />
      ) : (
        <Box
          sx={{
            width,
            height,
            background: "lightgrey",
          }}
        />
      )}
    </>
  );
};

export default CardImage;
