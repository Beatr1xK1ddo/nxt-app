//actions
import {ipbeListSlice, fetchIpbes} from "./slice";
const {
    reloadIpbeListData,
    setIpbeListViewMode,
    setIpbeListPage,
    setIpbeListItemsPerPage,
    setIpbeListFilter,
    setIpbeListFilterByKey,
    resetIpbeListFilter,
    setAction,
} = ipbeListSlice.actions;

export {
    fetchIpbes,
    reloadIpbeListData,
    setIpbeListViewMode,
    setIpbeListPage,
    setIpbeListItemsPerPage,
    setIpbeListFilter,
    setIpbeListFilterByKey,
    resetIpbeListFilter,
    setAction,
};
