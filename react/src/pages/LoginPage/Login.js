import { forwardRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Nav from "../../components/navBar/NavBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./Login.css";

import gqlAPI from "../../api/gql";
import roles from "../../const/roles";
import useAuth from "../../hooks/useAuth";
import Footer from "../../components/footer/Footer";

function SignUp(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Don't have an account?"}{" "}
      <Link to="/Register" variant="body2">
        Register here
      </Link>{" "}
    </Typography>
  );
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid format"),
    password: Yup.string().required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(formOptions);

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const [login] = useMutation(gqlAPI.mutations.LOGIN, {
    onCompleted: (result) => {
      console.log(result);

      const userAuth = { user: { ...result.login }, roles: result.login.roles };
      setAuth(userAuth);
      localStorage.setItem("auth", JSON.stringify(userAuth));

      setSnackBarSeverity("success");
      setSnackBarMessage("You are successfully logged in!");
      setOpenSnackbar(true);
      setDisableSubmitButton(false);
      reset();

      navigate(result.login.roles.includes(roles.Admin) ? "/admin" : "/", {
        replace: true,
      });
    },
    onError: (error) => {
      console.log(error);
      setSnackBarSeverity("error");
      setSnackBarMessage(error.message);
      setOpenSnackbar(true);
      setDisableSubmitButton(false);
    },
  });

  const onSubmit = (form) => {
    setSnackBarMessage("");
    setDisableSubmitButton(true);
    login({
      variables: {
        input: { email: form.email, password: form.password },
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
    <ThemeProvider theme={theme}>
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
        <Grid
          id="login-form"
          container
          component="main"
          sx={{ height: "100vh" }}
        >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://res.cloudinary.com/kthln10/image/upload/v1661613040/loginBanner_azfzjo.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Welcome Back!
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  {...register("email")}
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={disableSubmitButton}
                >
                  Login
                </Button>
                <SignUp sx={{ mt: 2 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
