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
        setUsers: (state, {payload}) => {
            // state.panier.push(action.payload);
           if (payload) {
            //  state.users = [...state.users,action.payload];
            //  localStorage.setItem("users", JSON.stringify(state.users));
            state.users.email = payload.email
            state.users.username = payload.username
            state.users.firstname = payload.prenom
            state.users.lastname = payload.nom
            // console.log(payload);
           }
        },
        setImage: (state, {payload}) => {
            // state.panier.push(action.payload);
           if (payload) {
            //  state.users = [...state.users,action.payload];
            //  localStorage.setItem("users", JSON.stringify(state.users));
            state.users.photoUrl = payload
            // console.log(payload);
           }
        },
        recupAccesstoken: (state, {payload}) => {
            if(payload){
                state.accesstoken = payload;
            }
        },
        setrefresh: (state, {payload}) => {
            if(payload== true || payload == false){
                state.refresh = payload;
                localStorage.setItem("refresh", JSON.stringify(payload));
            }
        },
        
    }
});

export const {recupUsers, setUsers, recupAccesstoken, setrefresh, setImage } = usersSlice.actions;
export default usersSlice.reducer;