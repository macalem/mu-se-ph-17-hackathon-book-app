import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button, Grid, Box, ThemeProvider } from "@mui/material";
import Theme from "../../const/theme";

function PendingBookCards(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={props.title} />
        <CardMedia
          component="img"
          height="194"
          image={props.image}
          alt="Noli Me Tangere"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            by {props.author}
          </Typography>
          <CardActions disableSpacing>
            <Box sx={{ margin: "auto" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary">
                    Accept
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" color="error">
                    Reject
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardActions>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default PendingBookCards;
