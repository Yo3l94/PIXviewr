import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError, AxiosResponse } from 'axios'
import * as Photo from 'unsplash-js/dist/methods/photos/types'
import { Full } from 'unsplash-js/dist/methods/topics/types'
import _ from 'lodash'

const PATH = 'http://localhost:3001/'

export type Topic = Full & { photos: any[] }
interface state {
  topics: Topic[]
  topicPhotos: Photo.Basic[],
  currentTopic: Topic,
  currentPhoto: Photo.Full,
  error: any,
  isLoading: boolean,
  currentRequestId: string
}

interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
  status: number
}

const initialState = {
  topics: [],
  topicPhotos: [],
  currentTopic: { photos: [] },
  currentPhoto: {
    links: { self: '', html: '' },
    urls: { small: '', regular: '', full: '', thumb: '' },
    user: { name: '', last_name: '', bio: '', profile_image: { small: '' } }, description: ''
  },
  error: '',
  isLoading: false,
  currentRequestId: undefined
} as state

export const getTopics = createAsyncThunk(
  'topics/getTopics',
  async (a, { rejectWithValue }) => {
    const response =
      await axios.get(`${PATH}topics`)
        .then((res: AxiosResponse) => {
          return res.data.results
        })
        .catch((err) => {
          let error: AxiosError<ValidationErrors> = err
          if (!error.response) {
            throw err
          }
          console.log('ERROR t: ', err)
          return rejectWithValue(error.response.data)
        })
    console.log(response)
    return response
  }
)

export const getTopicPhotos = createAsyncThunk(
  'topics/getTopicPhotos',
  async (id: string, { rejectWithValue }) => {
    const response = await axios.get(`${PATH}topic-photos/?id=${id}`)
      .then((res: AxiosResponse) => {
        return { results: res.data.results, topicId: id }
      })
      .catch((err) => {
        let error: AxiosError<ValidationErrors> = err
        if (!error.response) {
          throw err
        }
        console.log('ERROR tp: ', err)
        return rejectWithValue(error.response.data)
      })
    return response
  }
)

export const getMorePhotos = createAsyncThunk(
  'topics/getMorePhotos',
  async ({ id, page }: { id: string, page: number }, { rejectWithValue }) => {
    const response = await axios.get(`${PATH}topic-photos/?id=${id}&page=${page}&perPage=${30}`)
      .then((res: AxiosResponse) => {
        console.log('axios', res)
        return { results: res.data.results, topicId: id }
      })
      .catch((err) => {
        console.log('axios res', err)
        let error: AxiosError<ValidationErrors> = err
        if (!error.response) {
          throw err
        }
        console.log('ERROR mp: ', err)
        return rejectWithValue(error.response.data)
      })
    console.log('more photos', response)
    return response
  }
)

export const getPhoto = createAsyncThunk(
  'topics/getPhoto',
  async (id: string) => {
    const response = await axios.get(`${PATH}photo:${id}`)
    return response.data.results
  }
)

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setCurrentTopic(state, action: PayloadAction<Topic>) {
      state.currentTopic = action.payload
    },
    setCurrentPhoto(state, action: PayloadAction<Photo.Full>) {
      state.currentPhoto = action.payload
    },
    clearError(state, action: PayloadAction<Photo.Full>) {
      state.error = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopics.fulfilled, (state, action) => {
        state.isLoading = false
        state.topics = action.payload
        state.currentRequestId = undefined
      })
      .addCase(getTopics.rejected, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getTopicPhotos.fulfilled, (state, action) => {
        const iteratedTopic = state.topics.find(topic => topic.id === action.payload.topicId)
        if (!iteratedTopic) return
        state.isLoading = false
        iteratedTopic.photos = action.payload.results
      })
      .addCase(getTopicPhotos.rejected, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getMorePhotos.fulfilled, (state, action) => {
        if (!state.currentTopic) return
        state.isLoading = false
        state.currentTopic.photos.push(...action.payload.results)
      })
      .addCase(getMorePhotos.rejected, (state, action) => {
        console.log('more photos rject')
        console.log('more photos reejct inside', state, action)
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getPhoto.fulfilled, (state, action) => {
        state.currentPhoto = action.payload
      })
  }
})

export default topicsSlice.reducer