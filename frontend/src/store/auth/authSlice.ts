import { createSlice } from '@reduxjs/toolkit'

const initialState = {

        user : null,
        token : null ,
        refreshToken : null
        

}
  
const AuthSlice =  createSlice(
    {
        name : 'auth',
        initialState,
        reducers : {
            setAuth : (state,action)=>{
                    state.user =  action.payload.user,
                    state.token = action.payload.token,
                    state.refreshToken = action.payload.refreshToken 

            },
            logOut : (state)=>{
                state.token = null,
                state.user = null,
                state.refreshToken = null
            },
        }
    }
)

export const {setAuth,logOut} = AuthSlice.actions
export  default AuthSlice.reducer