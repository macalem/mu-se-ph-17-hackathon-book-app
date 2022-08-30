import { forwardRef, useEffect, useState } from "react";
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
import { Typography, ThemeProvider } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Theme from "../../const/theme";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

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

  const [tabIndex, setTabIndex] = useState(0);
  const [status, setStatus] = useState("PENDING");

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);

    if (newValue === 0) {
      setStatus("PENDING");
    } else if (newValue === 1) {
      setStatus("APPROVED");
    } else if (newValue === 2) {
      setStatus("REJECTED");
    }
  };

  return (
    <>
      <ThemeProvider theme={Theme}>
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
          <Typography variant="h3" component="h4" color="primary" fontWeight={500}>
            Submitted Books
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab color="secondary" label="Pending" {...a11yProps(0)} />
              <Tab color="secondary" label="Approved" {...a11yProps(1)} />
              <Tab color="secondary" label="Rejected" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <Grid container spacing={12} id="grid-container">
            {data?.books.map((book) => {
              return (
                book.status === status && (
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
                      premium={book.premium}
                      updateBookStatus={updateBookStatus}
                    />
                  </Grid>
                )
              );
            })}
          </Grid>
        </Container>
      </ThemeProvider>
      <Footer />
    </>
  );
}
