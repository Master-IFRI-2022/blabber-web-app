import { configureStore, createSlice } from "@reduxjs/toolkit";

const capitalDataSlice = createSlice(
    {
        name: "capitalData",
        initialState : {
            MessageToResponse : null,
            Discussion : {},
            ReceiverData : {},
            userId : "",
            baseUrl :"http://127.0.0.1:3030/",
            AuthToken : "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODgxNDk3ODMsImV4cCI6MTY5MDc0MTc4MywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjY0OWVlNDY1N2IyODRkMDFjZDg0ODc1YyIsImp0aSI6IjM4NmY3YjEwLWMzYjQtNDQ2YS04MDAzLTEzOTVhMmNiN2I3MSJ9.PGoTWXAYIDiaeEqKGvQgm93VhtbiO6CNZOHt_Kn0PhU"
        },
        reducers : {
            setMessageToResponse : (state, action)=>{
                state.MessageToResponse= action.payload;
            },
            setDiscussion: (state, action)=>{
                state.Discussion= action.payload;
            },
            setReceiverData: (state, action)=>{
                state.ReceiverData= action.payload;
            },
            setAuthToken: (state, action)=>{
                state.AuthToken= action.payload;
            },

        }
    }
)

export const capitalStore = configureStore({
    reducer: {
        capitalData : capitalDataSlice.reducer
    }
})

