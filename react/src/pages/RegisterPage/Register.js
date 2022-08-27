import { forwardRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./Register.css";

import useAuth from "../../hooks/useAuth";

import Nav from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";

function SignIn(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Already a member?"} <Link to="/Login">Login here</Link>{" "}
    </Typography>
  );
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

// Define mutation
const REGISTER_READER = gql`
  mutation Register($input: RegisterUserRequest!) {
    register(input: $input) {
      id
      name
      email
      roles
    }
  }
`;

export default function Register() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const from = "/";

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(4, "Name must be atleast 4 characters long"),
    email: Yup.string().required("Email is required").email("Invalid format"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be atleast 4 characters long"),
    confirmpassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(formOptions);

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const [registerReader] = useMutation(REGISTER_READER, {
    onCompleted: (result) => {
      console.log(result);

      const userAuth = {
        user: { ...result.register },
        roles: result.register.roles,
      };
      setAuth(userAuth);
      localStorage.setItem("auth", JSON.stringify(userAuth));

      setSnackBarSeverity("success");
      setSnackBarMessage("You are successfully registered!");
      setOpenSnackbar(true);
      setDisableSubmitButton(false);
      reset();

      navigate(from, { replace: true });
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
    registerReader({
      variables: {
        input: { email: form.email, name: form.name, password: form.password },
      },
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
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
              backgroundImage: "url(https://res.cloudinary.com/kthln10/image/upload/v1661614919/registerBanner_rvjylh.jpg)",
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
                Create an Account
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
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="false"
                  {...register("name")}
                  error={!!errors?.name}
                  helperText={errors?.name ? errors.name.message : null}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  id="confirmpassword"
                  autoComplete="current-password"
                  {...register("confirmpassword")}
                  error={!!errors?.confirmpassword}
                  helperText={
                    errors?.confirmpassword
                      ? errors.confirmpassword.message
                      : null
                  }
                />
                <div className="Show_Password">
                  <FormControlLabel
                    control={<Checkbox value="show" color="primary" />}
                    label="Show Password"
                    onChange={onShowPassword}
                  />
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={disableSubmitButton}
                >
                  Register
                </Button>
                <SignIn sx={{ mt: 2 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
