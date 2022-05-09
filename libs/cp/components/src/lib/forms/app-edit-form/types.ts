import {IIpbeCardApiItem} from "@nxt-ui/cp/api";
import {AnyAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";

export type IFormProps = Partial<IIpbeCardApiItem & {dispatch: Dispatch<AnyAction>}>;
