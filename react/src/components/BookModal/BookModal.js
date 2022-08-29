import { forwardRef, useState } from "react";
import { useMutation } from "@apollo/client";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup, Grid, Modal } from "@mui/material";

import useAuth from "../../hooks/useAuth";
import roles from "../../const/roles";
import gqlAPI from "../../api/gql";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const BookModal = ({
  open,
  handleClose,
  updateBookStatus,
  bookID,
  title,
  status,
  image,
  author,
  dewey,
  isbn,
  published_date,
  description,
  file,
}) => {
  const { auth } = useAuth();

  const onDownloadClick = () => {
    // using Java Script method to get PDF file
    // fetch(file).then((response) => {
    fetch(file).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `${title}.pdf`;
        alink.click();
      });
    });
  };

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const [updateStatus] = useMutation(gqlAPI.mutations.UPDATE_BOOK_STATUS, {
    onCompleted: (result) => {
      console.log(result);

      updateBookStatus(bookID);
    },
    onError: (error) => {
      console.log(error);
      setSnackBarSeverity("error");
      setSnackBarMessage(error.message);
      setOpenSnackbar(true);
      setDisableSubmitButton(false);
    },
  });

  const onAcceptSubmit = (form) => {
    setSnackBarMessage("");
    setDisableSubmitButton(true);
    setSnackBarMessage("Approved!");
    updateStatus({
      variables: {
        input: { id: bookID, status: "APPROVED" },
      },
    });
  };

  const onRejectedSubmit = (form) => {
    setSnackBarMessage("");
    setDisableSubmitButton(true);
    setSnackBarMessage("Rejected!");
    updateStatus({
      variables: {
        input: { id: bookID, status: "REJECTED" },
      },
    });
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState();
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 700, position: "absolute", overflowY: "scroll", maxHeight: "90%"}}>
          <Grid container columnSpacing={3}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                sx={{ width: "500", height: "auto" }}
                image={image || "/assets/noimage.png"}
                alt="Noli Me Tangere"
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container rowSpacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h4" fontWeight={500}>
                    {title}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight={500}>
                    AUTHOR
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"> {author} </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight={500}>
                    DEWEY DECIMAL
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"> {dewey} </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight={500}>
                    ISBN
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"> {isbn} </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight={500}>
                    FIRST PUBLISHED
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{published_date}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1"> {description} </Typography>
                </Grid>
                <Grid item xs={12} sx={{ margin: "auto" }}>
                  <ButtonGroup>
                    <Button variant="contained" color="warning">
                      <a href={file} target="_blank" rel="noreferrer">
                        Read
                      </a>
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={onDownloadClick}
                    >
                      Download
                    </Button>
                  </ButtonGroup>
                  {status === "PENDING" &&
                  auth?.user &&
                  auth?.roles.includes(roles.Admin) ? (
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={onAcceptSubmit}
                        disabled={disableSubmitButton}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={onRejectedSubmit}
                        disabled={disableSubmitButton}
                      >
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
    </>
  );
};

export default BookModal;
