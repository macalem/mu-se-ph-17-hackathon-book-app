import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import './Footer.css';

function Footer() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
      <MDBContainer className='pt-4'>
        <section className='mb-4'>
          <MDBBtn
            rippleColor="dark"
            floating
            size="lg"
            className='text-dark m-3'
            href='#'
            role='button'
            id="icon-bg"
          >
            <MDBIcon fab className='fab fa-facebook-f' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            floating
            size="lg"
            className='text-dark m-3'
            href='#'
            role='button'
            id="icon-bg"
          >
            <MDBIcon fab className='fa-twitter' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            floating
            size="lg"
            className='text-dark m-3'
            href='#'
            role='button'
            id="icon-bg"
          >
            <MDBIcon fab className='fa-instagram' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} id="footer-body">
        &copy; {new Date().getFullYear()} Copyright MAKABASA
      </div>
    </MDBFooter>
  );
}

export default Footer;