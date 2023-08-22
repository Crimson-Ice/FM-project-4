// AgeSlice.js
import { createSlice } from "@reduxjs/toolkit";

export interface ageState {
    year: string;
    month: string;
    day: string;
}

const initialState: ageState = {
    year: "- -",
    month: "- -",
    day: "- -",
};

const ageSlice = createSlice({
    name: "age",
    initialState,
    reducers: {
        changeAge: (state, action) => {
            state.day = action.payload[0];
            state.month = action.payload[1];
            state.year = action.payload[2];
        },
    },
});

export const { changeAge } = ageSlice.actions;

export default ageSlice.reducer;
