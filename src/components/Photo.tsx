import React from 'react'
import styled from 'styled-components'
import { FacebookProvider, Like } from 'react-facebook';
import { Full } from 'unsplash-js/dist/methods/photos/types';

interface IProps {
  currentPhoto: Full
}

const Photo: React.FC<IProps> = ({ currentPhoto }) => {
  return (
    <StyledPicWrapper data-testid='photo-wrapper'>
      <StyledPic src={currentPhoto.urls.full} alt="" />
      <FacebookProvider appId='203741854585669' >
        <Like href={currentPhoto.links.self} colorScheme="light" showFaces share />
      </FacebookProvider>
      <div>
        <div style={{ display: 'flex' }}>
          <img className='profilePic' src={currentPhoto.user.profile_image.medium} />
          <p>{currentPhoto.user.name}</p>
        </div>
        <p>{currentPhoto.user.bio}</p>
        <p>{currentPhoto.description}</p>
      </div>
    </StyledPicWrapper>
  )
}

export default Photo

const StyledPicWrapper = styled.div`
  position: relative;
  padding: 2vh;

  .profilePic {
    border-radius 100%;
  }
`

const StyledPic = styled.img`
  max-width: 80vw;
  max-height: 70vh;
  margin-bottom: 3vh;
  display: flex;
  box-shadow: 0 0 15px #00000096;
`