import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentSlice";

export const store = configureStore({
    reducer: { students: studentsReducer },
});
