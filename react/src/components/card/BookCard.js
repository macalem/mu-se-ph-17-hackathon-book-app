import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";
import { useState } from "react";
import "./BookCard.css";
import Theme from "../../const/theme";
import BookModal from "../BookModal/BookModal";
import { height } from "@mui/system";

function BookCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateBookStatus = (id) => props.updateBookStatus(id)

  return (
    <>
      <ThemeProvider theme={Theme}>
        <Card
          onClick={() => handleOpen()}
          sx={{ display: "flex", maxHeight: 200, width: 200}}
          className={props.premium ? "book-card-premium" : "book-card"}
        >
          <Box sx={{ display: "flex", flexDirection: "column", height: "300px", textAlign:"left" }}>
            <CardContent className="card-description" sx={{ flex: "1 0 auto" }}>
              <Typography className="card-text card-text-title" component="div" variant="h5">
                {props.title}
              </Typography>
              <Typography
                className="card-text card-text-author"
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                by {props.author}
              </Typography>
            {props.premium && <Typography className="card-description-premium" component="div" variant="">
                PREMIUM
              </Typography> }
            </CardContent>
          </Box>
          <CardContent>
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            image={props.image}
            alt={props.title}
          />
          </CardContent>
        </Card>
        <BookModal
          open={open}
          handleClose={handleClose}
          updateBookStatus={updateBookStatus}
          bookID={props.bookID}
          title={props.title}
          status={props.status}
          image={props.image}
          author={props.author}
          dewey={props.dewey}
          isbn={props.isbn}
          published_date={props.published_date}
          description={props.description}
          file={props.file}
        />
      </ThemeProvider>
    </>
  );
}

export default BookCard;
