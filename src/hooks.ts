import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import type { RootState } from './store/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSort = () => {
  const [currentSort, setSort] = useState('default')

  const onSortChange = () => {
    let nextSort;

    if (currentSort === 'down') nextSort = 'up';
    else if (currentSort === 'up') nextSort = 'default';
    else if (currentSort === 'default') nextSort = 'down';

    setSort(nextSort);
  };

  return { currentSort, onSortChange }
}

export const useWatchForError = () => {
  const error = useAppSelector(state => state.error)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('ERROR!', error)
    if (error !== '') {
      history.push('/error')
    }
  }, [error])
}