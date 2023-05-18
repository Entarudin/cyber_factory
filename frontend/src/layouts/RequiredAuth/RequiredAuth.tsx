import React, { FC } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from 'constants/routes'
import { useAppSelector } from 'hooks'

const RequiredAuth: FC = () => {
  const location = useLocation()
  const { status } = useAppSelector((state) => state.auth)
  const isAuth = localStorage.getItem('isAuth') === 'true'
  const access = localStorage.getItem('access')

  if (!isAuth || !access || status === 'rejected') {
    return <Navigate to={ROUTES.login} state={{ from: location }} />
  }

  return <Outlet />
}

export { RequiredAuth }
