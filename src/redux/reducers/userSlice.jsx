// Desc: Redux slice for user authentication
import {createSlice} from '@reduxjs/toolkit'
import { redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'



const userSlice = createSlice({
    name: 'user',
    initialState: {
        is_authenticated: false,
        access: localStorage.getItem("access_token"),
        refresh: localStorage.getItem("refresh_token"),
        isLoading: false,
        user: null,
    },
    reducers: {
        register: (state, action) => {
           state.access = action.payload
           state.is_authenticated = true
           state.isLoading = false
        },
        login: (state, action) => {
                console.log(action)
                state.access = action.payload
                state.is_authenticated = true
                state.isLoading = false
        },
        logout: (state) => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            state.access = null
            state.refresh = null
            state.is_authenticated = false
        },
    }

})


export const {register, login, logout} = userSlice.actions
export default userSlice.reducer