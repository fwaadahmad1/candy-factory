import { createSlice } from "@reduxjs/toolkit";

type assemblyLine = {
    asseblyLineName : string,
}
const INITIAL_STATE:assemblyLine = {
    asseblyLineName : ""
}
export const currAssemblySlice = createSlice({
    name : "currAssembly",
    initialState : INITIAL_STATE,
    reducers : {
        setAssemblyContext(state, action) {
            state.asseblyLineName = action.payload;
        }
    }
});

export const {setAssemblyContext} = currAssemblySlice.actions;

export const currAssemblyReducer = currAssemblySlice.reducer;