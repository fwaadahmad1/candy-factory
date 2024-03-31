import { createSlice } from "@reduxjs/toolkit";

type notifications = {
    notifications : string[],
}
const INITIAL_STATE:notifications = {
    notifications : []
}
export const notificationSlice = createSlice({
    name : "notification",
    initialState : INITIAL_STATE,
    reducers : {
        setNotifications(state, action) {
            state.notifications = [...state.notifications, action.payload]
        }
    }
});

export const {setNotifications} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;