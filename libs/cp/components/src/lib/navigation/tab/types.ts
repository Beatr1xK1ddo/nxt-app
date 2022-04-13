import { ReactChild, ReactNode } from 'react';

export type INavigationTabProps = {
    name: string;
    menu?: ReactChild | ReactNode;
};

export type IAppItem = {
    value: string;
    isActive?: boolean;
};

export type IAppItemBlock = {
    title: IAppItem;
    items: IAppItem[];
};

export type ITabMenuProps = {
    items: IAppItemBlock[];
};
