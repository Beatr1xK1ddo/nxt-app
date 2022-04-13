import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];

export const ROOT_STORE = configureStore({
    reducer: rootReducer(),
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
});
