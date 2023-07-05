import { configureStore } from "@reduxjs/toolkit";

import usersReducer from '../feature/UserSlice';

export default configureStore({
    reducer: {
        users: usersReducer,
    },
    devTools: true,
})