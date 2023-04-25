import { bindActionCreators } from 'redux'
import { useAppDispatch } from './useAppDispatch'

import { authActions } from 'store/auth'

const allActions = {
  ...authActions,
}

export const useActions = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators(allActions, dispatch)
}
