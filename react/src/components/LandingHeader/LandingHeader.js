import HeaderImages from "../../const/const";
import { Box, Paper } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function LandingHeader() {

  return (
    <Box>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          //   height: 50,
          //   pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Carousel showArrows={false} autoPlay={true} interval={2000} infiniteLoop showThumbs={false}>
          {HeaderImages.map((step, index) => {
            return (
              <div key={index}>
                <img src={step.imgPath} alt={step.label} />
              </div>
            );
          })}
        </Carousel>
      </Paper>
    </Box>
  );
}

export default LandingHeader;
