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
    element: <MentorsList />,
  },

  {
    path: "/mentors-detail",
    element: <MentorsDetail />,
  },

  {
    path: "/user-profile",
    element: <UserProfile />,
  },
]);

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
