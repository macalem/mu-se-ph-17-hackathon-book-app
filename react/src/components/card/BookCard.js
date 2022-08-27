import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "./BookCard.css";

function BookCard(props) {
  return (
    <Card
      sx={{ display: "flex" }}
      className={props.premium ? "book-card-premium" : "book-card"}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent className="card-description" sx={{ flex: "1 0 auto" }}>
          <Typography className="card-text" component="div" variant="h5">
            {props.title}
          </Typography>
          <Typography
            className="card-text"
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.author}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "500", height: "auto" }}
        image={props.image}
        alt="Noli Me Tangere"
      />
    </Card>
  );
}

export default BookCard;
