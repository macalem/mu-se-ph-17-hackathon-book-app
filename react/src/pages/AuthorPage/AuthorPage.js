import { forwardRef, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  FormGroup,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextareaAutosize,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./AuthorPage.css";
import Footer from "../../components/footer/Footer";

import gqlAPI from "../../api/gql";
import NavBar from "../../components/navBar/NavBar";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AuthorPage() {
  const [GetGenres, { data: dataGenres }] = useLazyQuery(
    gqlAPI.query.GET_GENRES
  );

  useEffect(() => {
    GetGenres();
  }, [GetGenres]);

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Book name is required")
      .min(3, "Book name must be atleast 3 characters long"),
    dewey_decimal: Yup.string()
      .required("Dewey Decimal is required")
      .min(3, "Dewey Decimal must be atleast 3 characters long"),
    isbn: Yup.string()
      .required("ISBN is required")
      .min(3, "ISBN must be atleast 3 characters long"),
    author: Yup.string()
      .required("Author is required")
      .min(3, "Author must be atleast 3 characters long"),
    published_date: Yup.string(),
    genre_id: Yup.string().required("Genre is required"),
    premium: Yup.string(),
    file: Yup.string()
      .required("Book Link is required")
      .min(5, "Book Link must be atleast 5 characters long"),
    description: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    // reset
  } = useForm(formOptions);

  const convertPublishedDate = (publishedDate) => {
    const pDate = new Date(publishedDate);
    return `${pDate.getFullYear()}/${pDate.getMonth()}/${pDate.getDay()}`;
  };

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const [addBook] = useMutation(gqlAPI.mutations.ADD_BOOK, {
    onCompleted: (result) => {
      console.log(result);

      setSnackBarSeverity("success");
      setSnackBarMessage("Book has been submitted!");
      setOpenSnackbar(true);
      setDisableSubmitButton(false);
      // reset();
    },
    onError: (error) => {
      console.log(error);
      setSnackBarSeverity("error");
      setSnackBarMessage(error.message);
      setOpenSnackbar(true);
      setDisableSubmitButton(false);
    },
  });

  // Function for getting the values of the form and console loggin it for the api developer's reference...
  const onSubmit = (form) => {
    if (form.published_date) {
      form.published_date = convertPublishedDate(form.published_date);
    }
    form.premium = form.premium === "true" ? true : false;
    form.status = "PENDING";
    console.log(form);

    setSnackBarMessage("");
    setDisableSubmitButton(true);
    addBook({
      variables: {
        input: { ...form },
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
      <NavBar />
      <div className="author-form-banner">
        <h2>Author Form</h2>
      </div>
      <Container fixed>
        <Grid container spacing={12}>
          <Grid className="photo-banner-holder" xs={6}>
            <img
              src="https://res.cloudinary.com/karlstorage/image/upload/v1661593098/Images/pxws8rrmhmkrnte6wwma.png"
              alt="authorbanner"
            />
          </Grid>
          <Grid xs={6}>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className="form-grp-seperator">
                <FormControl error={!!errors?.name}>
                  <InputLabel htmlFor="book-name">Book Name *</InputLabel>
                  <Input
                    {...register("name")}
                    id="name"
                    aria-describedby="bookName-helper-text"
                    type="text"
                  />
                  <FormHelperText id="bookName-helper-text">
                    {errors?.name
                      ? errors.name.message
                      : "Enter your book title."}
                  </FormHelperText>
                </FormControl>
              </FormGroup>
              <FormGroup className="form-grp-seperator">
                <FormControl error={!!errors?.dewey_decimal}>
                  <InputLabel htmlFor="dewey-decimal">
                    Dewy Decimal *
                  </InputLabel>
                  <Input
                    {...register("dewey_decimal")}
                    id="dewey_decimal"
                    aria-describedby="dd-helper-text"
                    type="number"
                  />
                  <FormHelperText id="dd-helper-text">
                    {errors?.name
                      ? errors.name.message
                      : "Enter your dewy decimal number."}
                  </FormHelperText>
                </FormControl>
              </FormGroup>
              <FormGroup className="form-grp-seperator">
                <FormControl error={!!errors?.isbn}>
                  <InputLabel htmlFor="ISBN">ISBN *</InputLabel>
                  <Input
                    {...register("isbn")}
                    id="isbn"
                    aria-describedby="isbn-helper-text"
                    type="number"
                  />
                  <FormHelperText id="isbn-helper-text">
                    {errors?.name
                      ? errors.name.message
                      : "Enter your book ISBN."}
                  </FormHelperText>
                </FormControl>
              </FormGroup>
              <FormGroup className="form-grp-seperator">
                <FormControl error={!!errors?.author}>
                  <InputLabel htmlFor="Author">Author *</InputLabel>
                  <Input
                    {...register("author")}
                    id="author"
                    aria-describedby="author-helper-text"
                    type="text"
                  />
                  <FormHelperText id="author-helper-text">
                    {errors?.name
                      ? errors.name.message
                      : "Enter your pen-name/name."}
                  </FormHelperText>
                </FormControl>
              </FormGroup>
              <FormGroup className="form-grp-seperator">
                <FormControl>
                  <Controller
                    name="published_date"
                    control={control}
                    defaultValue={null}
                    render={({ field: { value, onChange, ...restField } }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Published Date"
                          value={value}
                          onChange={(newValue) => {
                            onChange(newValue);
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </FormControl>
              </FormGroup>
              <FormGroup className="form-grp-seperator">
                <FormControl fullWidth error={!!errors?.genre_id}>
                  <InputLabel id="genre-select-label">Genre *</InputLabel>
                  <Controller
                    control={control}
                    name="genre_id"
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="genre-select-label"
                        className="genre-select-label"
                        id="genre-select"
                        label="Genre"
                      >
                        {dataGenres?.genres &&
                          dataGenres.genres.map((genre) => (
                            <MenuItem key={genre.id} value={genre.id}>
                              {genre.name}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                  <FormHelperText id="author-helper-text">
                    {errors?.genre_id
                      ? errors.genre_id.message
                      : "Select your book's genre."}
                  </FormHelperText>
                </FormControl>
              </FormGroup>
              <FormGroup className="form-grp-seperator">
                <FormControl>
                  <FormLabel
                    className="form-radio-buttons-label"
                    id="PT-row-radio-buttons-group-label"
                  >
                    Premium Type
                  </FormLabel>
                  <Controller
                    control={control}
                    name="premium"
                    defaultValue="false"
                    aria-labelledby="PT-row-radio-buttons-group-label"
                    row
                    render={({ field }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Free"
                        />
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Premium"
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </FormGroup>
              <FormGroup className="form-grp-seperator">
                <FormControl error={!!errors?.file}>
                  <InputLabel htmlFor="bookL">Book Link</InputLabel>
                  <Input
                    {...register("file")}
                    id="file"
                    aria-describedby="file-helper-text"
                  />
                  <FormHelperText id="file-helper-text">
                    {errors?.name
                      ? errors.name.message
                      : "Enter your link of the e-book copy."}
                  </FormHelperText>
                </FormControl>
              </FormGroup>
              <FormGroup className="form-grp-seperator">
                <TextareaAutosize
                  aria-label="description textarea"
                  placeholder="Description"
                  style={{ width: `100%` }}
                  name="description"
                  minRows={5}
                  {...register("description")}
                />
              </FormGroup>
              <Button
                style={{ backgroundColor: "#CF6766" }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={disableSubmitButton}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default AuthorPage;
