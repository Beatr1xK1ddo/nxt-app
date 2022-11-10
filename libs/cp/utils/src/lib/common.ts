import {INavigationSimpleTabState, INavTab} from "@nxt-ui/cp-redux";

export const isINavTab = (data: INavTab | INavigationSimpleTabState): data is INavTab => {
    const key = Object.keys(data)[0];
    const field = data[key as keyof typeof data];
    return field && typeof field === "object" && "tabs" in field;
};
