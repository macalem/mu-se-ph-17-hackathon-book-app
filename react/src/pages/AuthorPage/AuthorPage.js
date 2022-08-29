import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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

import "./AuthorPage.css";
import Footer from "../../components/footer/Footer";

import gqlAPI from "../../api/gql";

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
    published_date: Yup.string().required("Published Date is required"),
    // genre_id: Yup.string().required("Genre is required"),
    // premium: Yup.string().required("Premium type is required"),
    file: Yup.string()
      .required("Book Link is required")
      .min(5, "Book Link must be atleast 5 characters long"),
    // description: Yup.string()
    //   .required("Description is required")
    //   .min(5, "Description must be atleast 5 characters long"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm(formOptions);

  const [date, setDate] = useState(null);
  const [genre, setGenre] = useState("");

  // Function for getting the value of genre select field...
  const handleChangeGenre = (event) => {
    setGenre(event.target.value);
  };

  // Function for getting the values of the form and console loggin it for the api developer's reference...
  const onSubmit = (form) => {
    // setSnackBarMessage("");
    // setDisableSubmitButton(true);
    // login({
    //   variables: {
    //     input: { email: form.email, password: form.password },
    //   },
    // });

    console.log(form);
  };

  return (
    <>
      <div className="author-page-back-btn">
        <Grid container spacing={12}>
          <Grid xs={2}>
            <Link className="back-btn-icon" to="/">
              <IconButton aria-label="delete">
                <ArrowBackIcon style={{ color: "white" }} />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </div>
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
              <FormGroup>
                <FormControl fullWidth>
                  <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Book Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    aria-describedby="dd-helper-text"
                    {...register("name")}
                    error={!!errors?.name}
                    helperText={
                      errors?.name
                        ? errors.name.message
                        : "Enter your book title."
                    }
                  />
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl fullWidth>
                  <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="dewey_decimal"
                    label="Dewey Decimal"
                    name="dewey_decimal"
                    autoComplete="dewey_decimal"
                    aria-describedby="dd-helper-text"
                    {...register("dewey_decimal")}
                    error={!!errors?.dewey_decimal}
                    helperText={
                      errors?.dewey_decimal
                        ? errors.dewey_decimal.message
                        : "Enter your dewy decimal number."
                    }
                  />
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl fullWidth>
                  <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="isbn"
                    label="ISBN"
                    name="isbn"
                    autoComplete="isbn"
                    aria-describedby="dd-helper-text"
                    {...register("isbn")}
                    error={!!errors?.isbn}
                    helperText={
                      errors?.isbn
                        ? errors.isbn.message
                        : "Enter your book ISBN."
                    }
                  />
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl fullWidth>
                  <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="author"
                    label="Author"
                    name="author"
                    autoComplete="author"
                    aria-describedby="dd-helper-text"
                    {...register("author")}
                    error={!!errors?.author}
                    helperText={
                      errors?.author
                        ? errors.author.message
                        : "Enter your pen-name/name."
                    }
                  />
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Publish Date"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="normal"
                          variant="standard"
                          {...register("published_date")}
                          error={!!errors?.published_date}
                          helperText={
                            errors?.published_date
                              ? errors.published_date.message
                              : null
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl fullWidth>
                  <InputLabel id="genre-select-label">Genre</InputLabel>
                  <Select
                    variant="standard"
                    labelId="genre-select-label"
                    className="genre-select-label"
                    id="genre-select"
                    value={genre}
                    label="Genre"
                    onChange={handleChangeGenre}
                  >
                    {dataGenres?.genres &&
                      dataGenres.genres.map((genre) => (
                        <MenuItem key={genre.id} value={genre.id}>
                          {genre.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl fullWidth>
                  <FormLabel
                    className="form-radio-buttons-label"
                    id="PT-row-radio-buttons-group-label"
                  >
                    Premium Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="PT-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Free"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Premium"
                    />
                  </RadioGroup>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl fullWidth>
                  <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="file"
                    label="Book Link"
                    name="file"
                    autoComplete="file"
                    aria-describedby="dd-helper-text"
                    {...register("file")}
                    error={!!errors?.file}
                    helperText={
                      errors?.file
                        ? errors.file.message
                        : "Enter your link of the e-book copy."
                    }
                  />
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl fullWidth>
                  <TextareaAutosize
                    aria-label="description textarea"
                    placeholder="Description"
                    style={{ width: `100%` }}
                    name="description"
                    minRows={5}
                  />
                </FormControl>
              </FormGroup>
              <Button
                style={{ backgroundColor: "#CF6766" }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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
