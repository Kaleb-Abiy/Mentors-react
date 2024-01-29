import { useState } from 'react'
import './App.css'
import Landing from './pages/Landing'
import MainLayout from './layout/Layout.jsx'
import Register from './pages/Register.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.jsx';
import MentorsList from './pages/MentorsList.jsx';
import MentorsDetail from './pages/MentorsDetail.jsx';
import UserProfile from './pages/UserProfile.jsx';
import AppointmentList from './pages/AppointmentList.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import { Provider } from 'react-redux';
import store  from './redux/store.js'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/Login",
    element: <Login />,
  },

  {
    path: "/mentors",
    element: <PrivateRoutes><MentorsList /></PrivateRoutes>,
  },

  {
    path: "/mentors-detail",
    element: <PrivateRoutes><MentorsDetail /></PrivateRoutes>,
  },

  {
    path: "/user-profile",
    element: <PrivateRoutes><UserProfile /></PrivateRoutes>,
  },

  {
    path: "/appointments",
    element: <PrivateRoutes><AppointmentList /></PrivateRoutes>,
  },
]);

function App() {
  
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
