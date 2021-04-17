import React from 'react';
import { Link } from 'react-router-dom';
import { StyledWrapper } from '../layout/Wrappers';

const uri = require('../assets/images/undraw_not_found_60pq.svg')

const NotFound = () => (
  <StyledWrapper>
    <h1>404 - Not Found!</h1>
    <Link to="/">
      Go Home
    </Link>
    <img src={uri} alt="" />
  </StyledWrapper>
);

export default NotFound;