import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { Full } from 'unsplash-js/dist/methods/topics/types'
import { useAppSelector } from '../hooks'
import { getTopicPhotos, Topic } from '../store/features/topicsSlice'

const Section = ({ topic }: { topic: Topic }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    if (topic !== undefined) {
      dispatch(getTopicPhotos(topic.id))
    }
  }, [])

  const handleClick = () => {
    if (topic !== undefined) {
      dispatch({ type: 'topics/setCurrentTopic', payload: { ...topic, photos: [] } })
    }
    history.push('/sectionView')
  }

  return (topic !== undefined &&
    <StyledSection onClick={handleClick} data-testid='section-wrapper'>
      <h1>{topic.title}</h1>
      <StyledPhotosWrapper>
        {topic.photos?.map((photo) =>
          <StyledImg key={photo.id} src={photo.urls.thumb} />
        )}
      </StyledPhotosWrapper>
    </StyledSection>
  )
}

export default Section

const StyledSection = styled.div`
cursor: pointer;
position: relative;
margin: 8vh;
h1 {
  position: absolute;
    top: 0;
    left: 0;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    display: flex;
    justify-self: center;
    justify-items: center;
    align-items: center;
    margin: auto;
    padding: 8vw;
    color: white;
    font-size: 7rem;
    text-shadow: 0 0 12px #00000096;
}
box-shadow: 0vh 1vh 2vh -0.7vh;

@media (max-width: 900px) {
  h1 {
    padding: 7vw;
    font-size: 3.5rem;
  }
}
@media (max-width: 500px) {
  h1 {
    padding: 6vw;
    font-size: 3rem;
  }
}
`

const StyledPhotosWrapper = styled.div`
display: grid;
grid-template-columns: repeat(5, 14vw);
grid-auto-rows: 20vh;

@media (max-width: 900px) {
  grid-template-columns: repeat(5,10vw);
  overflow: hidden;
}
@media (max-width: 500px) {
  grid-template-columns: repeat(6,14vw);
  overflow: hidden;
}
`

const StyledImg = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-size: cover;
  height: 20vh;
  width: 24vh;
`