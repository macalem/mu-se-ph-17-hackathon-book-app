import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup, Grid, Modal, ThemeProvider } from "@mui/material";
import { useState } from "react";
import "./BookCard.css";
import Theme from "../../const/theme";
import useAuth from "../../hooks/useAuth";
import roles from "../../const/roles";
// three PDF below are dummy data
import Pdf from '../../assets/Alamat-ng-Alitaptap.pdf';
import Pdf2 from '../../assets/Noli-me-Tangere.pdf';
import Pdf3 from '../../assets/Alamat-ng-Durian.pdf';

function BookCard(props) {

  let regexPropsName = props.title;
  regexPropsName = regexPropsName.replace(/\s+/g, '-');

  const { auth } = useAuth();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onButtonClick = () => {
    // using Java Script method to get PDF file
    // fetch(props.file).then((response) => {
    fetch(regexPropsName === "Alamat-ng-Alitaptap" ? 
    Pdf : regexPropsName === "Noli-me-Tangere" ? 
    Pdf2 : regexPropsName === "Alamat-ng-Durian" ? 
    Pdf3 : "")
    .then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `${props.title}.pdf`;
        alink.click();
      });
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <>
      <ThemeProvider theme={Theme}>
        <Card
          onClick={() => handleOpen()}
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
            {props.premium && <Typography  className="card-description-premium" component="div" variant="">
                PREMIUM
              </Typography> }
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: "500", height: "auto" }}
            image={props.image}
            alt={props.title}
          />
        </Card>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 700 }}>
            <Grid container columnSpacing={3}>
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  sx={{ width: "500", height: "auto" }}
                  image={props.image}
                  alt="Noli Me Tangere"
                />
              </Grid>
              <Grid item xs={6}>
                <Grid container rowSpacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={500}>
                      {" "}
                      {props.title}{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight={500}>
                      {" "}
                      AUTHOR
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1"> {props.author} </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight={500}>
                      {" "}
                      DEWEY DECIMAL{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1"> {props.dewey} </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight={500}>
                      {" "}
                      ISBN{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1"> {props.isbn} </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight={500}>
                      {" "}
                      FIRST PUBLISHED{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      {" "}
                      {props.published_date}{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {" "}
                      {props.description}{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ margin: "auto" }}>
                    <ButtonGroup>
                      <Button variant="contained" color="warning">
                        {/* Read */}
                      <a href = {regexPropsName === "Alamat-ng-Alitaptap" ? 
                      Pdf : regexPropsName === "Noli-me-Tangere" ? 
                      Pdf2 : regexPropsName === "Alamat-ng-Durian" ? 
                      Pdf3 : ""} target="_blank">Read</a>
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={onButtonClick}
                      >
                        Download
                      </Button>
                    </ButtonGroup>
                    {props.status === "PENDING" && auth?.user && auth?.roles.includes(roles.Admin) ? (
                      <ButtonGroup>
                        <Button variant="contained" color="warning">
                          Accept
                        </Button>
                        <Button variant="contained" color="error">
                          Reject
                        </Button>
                      </ButtonGroup>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  );
}

export default BookCard;
