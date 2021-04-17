import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector, useWatchForError } from '../hooks'
import { getTopics, Topic } from '../store/features/topicsSlice'
import Section from './Section'

const SectionsList = () => {
  const topics = useAppSelector(state => state.topics)
  const dispatch = useDispatch()
  useWatchForError()
  useEffect(() => {
    if (!topics.length) {
      dispatch(getTopics())
    }
  }, [])

  const sections = topics.map(
    (topic: Topic) =>
      <Section key={topic.id} topic={topic} />
  )


  return (
    <div>
      {sections}
    </div>
  )
}

export default SectionsList