import {ReactChild, ReactNode} from "react";

export type INavElem = {
    name: string;
    menu?: ReactChild | ReactNode;
};

export type INavElemList = INavElem[];
