import {ReactChild, ReactNode} from "react";

export type INavigationProps = {
    username: string;
};

export type INavElem = {
    name: string;
    menu?: ReactChild | ReactNode;
};

export type INavElemList = INavElem[];
