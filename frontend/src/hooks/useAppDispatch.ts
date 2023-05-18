import { useDispatch } from 'react-redux'

import { AppDispatch } from 'store/types'

const useAppDispatch = () => useDispatch<AppDispatch>()

export { useAppDispatch }
