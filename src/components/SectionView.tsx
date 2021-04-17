import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch } from 'react-redux'
import { useAppSelector, useSort, useWatchForError } from '../hooks'
import { getMorePhotos } from '../store/features/topicsSlice'
import styled from 'styled-components'
import Modal from '../layout/Modal'
import { useHistory } from 'react-router'
import Photo from './Photo'
import { BiSortZA, BiSortAZ, BiSort } from 'react-icons/bi'

export const SectionView = () => {
  const history = useHistory()
  const currentTopic = useAppSelector(state => state.currentTopic)
  const currentPhoto = useAppSelector(state => state.currentPhoto)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [detailsOpened, setDetailsOpened] = useState(false)
  const { currentSort, onSortChange } = useSort()
  const { currentSort: secondSort, onSortChange: onSecondSortChange } = useSort()
  const [curSortType, setType] = useState('likes')

  useWatchForError()

  useEffect(() => {
    if (currentTopic.id === undefined) return history.push('/')
    dispatch(getMorePhotos({ id: currentTopic.id, page }))
  }, [page])

  const handleToggle = () => setDetailsOpened(!detailsOpened)
  const handleNext = () => setPage(page + 1)
  const handlePhotoClick = (photo: any) => () => {
    dispatch({ type: 'topics/setCurrentPhoto', payload: photo })
    setDetailsOpened(true)
  }

  const handleSort = (type: 'likes' | 'date') => () => {
    setType(type)
    if (type === 'likes') {
      return onSortChange()
    } else {
      return onSecondSortChange()
    }
  }

  const sortTypes: any = {
    date: {
      up: {
        component: BiSortZA,
        fn: (a: any, b: any) => Date.parse(b.created_at) - Date.parse(a.created_at)
      },
      down: {
        component: BiSortAZ,
        fn: (a: any, b: any) => Date.parse(a.created_at) - Date.parse(b.created_at)
      },
      default: {
        component: BiSort,
        fn: (a: any, b: any) => a
      }
    },
    likes: {
      up: {
        component: BiSortZA,
        fn: (a: any, b: any) => b.likes - a.likes
      },
      down: {
        component: BiSortAZ,
        fn: (a: any, b: any) => a.likes - b.likes
      },
      default: {
        component: BiSort,
        fn: (a: any, b: any) => a
      }
    }
  };

  const photosToRender = [...currentTopic.photos].sort(sortTypes[curSortType][currentSort].fn).map((photo: any) => {
    return (
      <StyledImage key={photo.id} onClick={handlePhotoClick(photo)} >
        <div className='wrapper'>
          <img className='image' src={photo.urls.thumb} alt="" />
          <div className='hide myDiv'>
            <p>{photo.likes} likes</p>
            <p>{photo.user.location}</p>
          </div>
        </div>
      </StyledImage>
    )
  })

  return (
    <div>
      <StyledFiltersWrapper>
        <div onClick={handleSort('likes')} className='filter-btn'>
          {sortTypes.likes[currentSort].component()}
          Likes
        </div>
        <div onClick={handleSort('date')} className='filter-btn'>
          {sortTypes.date[secondSort].component()}
          Date
        </div>
      </StyledFiltersWrapper>
      <StyledInfiniteScroll
        dataLength={currentTopic.photos.length}
        next={handleNext}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {photosToRender}
      </StyledInfiniteScroll>
      <Modal on={detailsOpened} toggle={handleToggle}>
        <Photo currentPhoto={currentPhoto} />
      </Modal>
    </div>
  )
}

const StyledImage = styled.div`
  height: fit-content;
    width: fit-content;
    margin-bottom: 2vh;
  .wrapper {
    position: relative;
      // overflow: hidden;
      // display: -webkit-box;
      // justify-content: center;
      // align-items: center;
  }

  .hide {
    display: none;
  }

  .myDiv {
    color: #fff;
    top: 0;
    left: 0;
    width: -webkit-fill-available;
    height: calc(100% - 4vw);
    padding: 2vw;
    line-height: 1;

    background: rgba(0,0,0,0.5);
    position: absolute
  }

  .image {
  	// display: block;
    // object-fit: cover;

    //   width: 100% !important;
    // height: auto !important;
    margin: auto;
    box-shadow: 0vh 1vh 2vh -0.7vh;
  }

  .image:hover + .hide {
    display: block;
    width: scale(1.2);
    height: scale(1.2);
  }
`

const screenWidths = [
  1200,
  1000,
  800,
  400,
]
let mediaQueries = ''

const StyledInfiniteScroll = styled(InfiniteScroll)`
  line-height: 0;

  width: 90vw;
   
  -webkit-column-count: 5;
  -webkit-column-gap:   0px;
  -moz-column-count:    5;
  -moz-column-gap:      0px;
  column-count:         5;
  column-gap:           0px;  

  ${screenWidths.map((width, idx) => {
  const cols = screenWidths.length - idx
  return mediaQueries += `
    @media (max-width: ${width}px) {
      -moz-column-count:    ${cols};
      -webkit-column-count: ${cols};
      column-count:         ${cols};
    }
    `})}
  ${mediaQueries}
`
const StyledFiltersWrapper = styled.nav`
  display: flex;
  position: sticky;
  top: 9vh;
  background: white;
  z-index: 1;
  padding: 1vh;
  .filter-btn {
    background: darkgray;
    padding: 0.5vw;
    border-radius: 0.4em;
    margin-right: 2vw;
    cursor: pointer;
  }
`