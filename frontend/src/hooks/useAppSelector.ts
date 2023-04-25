import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootState } from 'store/types'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { useAppSelector }
