import React, {useEffect} from 'react'
import { redirect } from 'react-router-dom'
import Login from '../pages/Login'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoutes = ({children}) => {
  const access_token = useSelector(state => state.user.access)

  const navigate = useNavigate()

  useEffect(() => {
    if (!access_token) {
      navigate("/login")
    }

  }, [access_token])


  return (
    <>
      {access_token && children}
    </>
  )
}

export default PrivateRoutes