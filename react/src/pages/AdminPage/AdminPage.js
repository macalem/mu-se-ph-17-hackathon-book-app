import React, { forwardRef, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import "../LandingPage/LandingPage.css";

import Nav from "../../components/navBar/NavBar";
import BookCard from "../../components/card/BookCard";
import Footer from "../../components/footer/Footer";

import gqlAPI from "../../api/gql";
import { Typography } from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminPage() {
  const [GetBooks, { data, refetch }] = useLazyQuery(gqlAPI.query.GET_BOOKS, {
    variables: {
      filter: "",
    },
  });

  useEffect(() => {
    GetBooks();
  }, [GetBooks]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState();
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const updateBookStatus = (id) => {
    setSnackBarMessage("Book's status successfully updated");
    setSnackBarSeverity("success");
    setOpenSnackbar(true);

    refetch({
      filter: "",
    });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleSnackbarClose}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackBarSeverity}
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <Nav />
      <Container className="login-body">
        <Typography variant="h4" component="h4">
          Submitted Books
        </Typography>
        <Grid container spacing={12} id="grid-container">
          {data?.books.map((book) => {
            return (
              book.status === "PENDING" && (
                <Grid xs={4} key={book.id}>
                  <BookCard
                    bookID={book.id}
                    title={book.name}
                    author={book.author}
                    image={book.cover}
                    description={book.description}
                    published_date={book.published_date}
                    dewey={book.dewey_decimal}
                    isbn={book.isbn}
                    status={book.status}
                    file={book.file}
                    updateBookStatus={updateBookStatus}
                  />
                </Grid>
              )
            );
          })}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
