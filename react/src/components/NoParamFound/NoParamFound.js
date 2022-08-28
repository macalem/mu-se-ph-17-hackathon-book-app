import React from "react";
import {
  Button,
  Typography,
  CardMedia,
  Grid,
  Container,
  ThemeProvider,
} from "@mui/material";
import Theme from "../../const/theme";

function NoParam() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Container sx={{ mt: "auto", mb: "auto" }}>
          <Grid container>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                height="auto"
                image={process.env.PUBLIC_URL + "/assets/noPage.png"}
                alt="404 Page Not Found"
              />
            </Grid>
            <Grid item xs={6} sx={{ mt: "auto", mb: "auto" }}>
              <Typography gutterBottom variant="h3" fontWeight={500} color="secondary">
                PAGE NOT FOUND
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We can't find the page you're looking for.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {" "}
                You can either return to the previous page, visit our homepage.
              </Typography>
              <Container sx={{ mt: 2 }}>
                <Button size="small" variant="contained" color="secondary">
                  Home
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
export default NoParam;
