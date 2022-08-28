import React from "react";
import Container from "@mui/material/Container";
import NoParam from "../../components/NoParamFound/NoParamFound";

function PageNotFound() {
  return (
    <>
      <Container maxWidth="md">
        <NoParam />
      </Container>
    </>
  );
};

export default PageNotFound;
