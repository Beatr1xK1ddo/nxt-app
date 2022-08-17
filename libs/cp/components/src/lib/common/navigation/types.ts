import {ReactChild, ReactNode} from "react";

export type INavigationProps = {
    username: string;
};

export type INavElem = {
    name: string;
    menu?: ReactChild | ReactNode;
};

export type INavElemList = INavElem[];

export type IAppItem = {
    key: string;
    value: string;
    path: string;
    active?: boolean;
};

export type IAppItemBlock = {
    title: IAppItem;
    items?: IAppItem[];
};
