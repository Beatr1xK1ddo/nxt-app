import {configureStore} from "@reduxjs/toolkit";
import {cpRootReducer} from "./reducer";

const store = configureStore({
    reducer: cpRootReducer,
});

export default store;
