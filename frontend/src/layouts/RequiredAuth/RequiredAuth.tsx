import React, { FC } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

import { ROUTES } from 'constants/routes'
import { useAppSelector } from 'hooks'

const RequiredAuth: FC = () => {
  const location = useLocation()
  const { status } = useAppSelector((state) => state.auth)
  const isAuth = Cookies.get('isAuth') === 'true'
  const access = Cookies.get('access')

  if (!isAuth || !access || status === 'rejected') {
    return <Navigate to={ROUTES.auth} state={{ from: location }} />
  }

  return <Outlet />
}

export { RequiredAuth }
