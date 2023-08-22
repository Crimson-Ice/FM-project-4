// store.js
import { configureStore } from "@reduxjs/toolkit";
import ageReducer from "./ageSlice"; // Assurez-vous de mettre le bon chemin

const store = configureStore({
    reducer: {
        age: ageReducer,
    },
});

export default store;
