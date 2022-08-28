import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import NoParam from "../../components/NoParamFound/NoParamFound";

const PageNotFound = (props) => {
  return (
    <>
      <Container maxWidth="md">
        <NoParam />
      </Container>
    </>
  );
};

export default PageNotFound;
