import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import NotFound from "../../components/NotFound/NotFound";
import Nav from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";

const theme = createTheme();

function PageNotFound() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Container className="login-body">
        <NotFound />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default PageNotFound;
