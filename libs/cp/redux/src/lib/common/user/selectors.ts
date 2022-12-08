import {createSelector} from "@reduxjs/toolkit";
import {IUserState} from "./types";

export const userSelector = (state: IUserState) => state.user;
export const userStatusSelector = (state: IUserState) => state.status;
export const emailSelector = createSelector(userSelector, (user) => user?.email);
