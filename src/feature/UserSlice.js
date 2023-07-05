import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        refresh: false,
        accesstoken: ''
    },
    reducers: {
        recupUsers: (state, {payload}) => {
            if(payload){
                state.users = payload;
            }
        },
        setUsers: (state, action) => {
            // state.panier.push(action.payload);
            state.users = [...state.users,action.payload];
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        recupAccesstoken: (state, {payload}) => {
            if(payload){
                state.accesstoken = payload;
            }
        },
        
    }
});

export const {recupUsers, setUsers, recupAccesstoken} = usersSlice.actions;
export default usersSlice.reducer;