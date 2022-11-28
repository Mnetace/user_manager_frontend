import React from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { Table } from '../components/Table'
import { logout } from '../redux/slices/auth'

export const Home = ({
  setChecked,
  rows,
  rerender,
  isAuth,
  isBlock,
  token,
}) => {
  const dispatch = useDispatch()

  if (!token && !isAuth) {
    return <Navigate to="/login" />
  }

  if (token && isAuth) {
    if (isBlock.block) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  }

  return (
    <>
      <Table setChecked={setChecked} rows={rows} rerender={rerender} />
    </>
  )
}
