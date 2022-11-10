import {EIpbeNavAppList, ETxrNavAppList} from "./types";

export const isEIpbeNavAppList = (key: string): key is keyof typeof EIpbeNavAppList => {
    return Boolean(key) && key in EIpbeNavAppList;
};

export const isETxrNavAppList = (key: string): key is keyof typeof ETxrNavAppList => {
    return Boolean(key) && key in ETxrNavAppList;
};
