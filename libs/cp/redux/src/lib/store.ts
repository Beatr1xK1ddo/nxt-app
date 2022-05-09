import {configureStore} from "@reduxjs/toolkit";
import {cpRootReducer} from "./reducer";

const store = configureStore({
    reducer: cpRootReducer,
    devTools: true,
});

export default store;
