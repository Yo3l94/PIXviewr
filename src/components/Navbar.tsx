import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = () => {
  return (
    <StyledNav>
      <span>PIXviewr</span>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </StyledNav>
  )
}

export default Navbar

const StyledNav = styled.nav`
background: #000000f0;
padding: 2vh;
box-shadow: 1vh 0 9px 2px #00000075;
position: sticky;
    top: 0px;
    z-index: 2;
a {
  color: white;
  tex-decoration: none;
  padding: 1vh;
}
span {
  padding-right: 2vw;
  color: dimgrey;
  font-size: 2rem;
  font-family: 'Dela Gothic One', cursive;
}
`