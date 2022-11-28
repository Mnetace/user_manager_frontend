import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { Home, Registration, Login } from './pages'
import {
  fetchAuthMe,
  selectIsAuth,
  selectIsBlock,
  logout,
} from './redux/slices/auth'
import axios from './axios'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const isBlock = useSelector(selectIsBlock)
  const token = window.localStorage.getItem('token')

  const [checked, setChecked] = useState([])
  const [rows, setRows] = useState([])

  const rerender = () => {
    axios.get(`/auth/all`).then(({ data }) => {
      setRows(
        data.map((items) => {
          items.createdAt = new Date(items.createdAt).toLocaleString()
          items.authAt = new Date(items.authAt).toLocaleString()
          if (items.block) {
            items.block = 'Blocked'
          } else {
            items.block = 'Unblocked'
          }
          return items
        })
      )
    })
  }

  useEffect(() => {
    dispatch(fetchAuthMe(isAuth))
  }, [rows])

  return (
    <>
      <Header
        checked={checked}
        rerender={rerender}
        isAuth={isAuth}
        logout={logout}
      />
      <Container maxWidth="lg">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setChecked={setChecked}
                rows={rows}
                rerender={rerender}
                isAuth={isAuth}
                isBlock={isBlock}
                token={token}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
