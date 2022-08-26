import React from 'react';
import Nav from '../../components/navBar/NavBar';
import LandingHeader from '../../components/LandingHeader/LandingHeader';
import SearchBar from '../../components/SearchBar/SearchBar'

function LandingPage() {
  return (
    <>
      <Nav />
      <LandingHeader />
      <SearchBar />
    </>
  )
}

export default LandingPage