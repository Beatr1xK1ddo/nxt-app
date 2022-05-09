//actions
import {ipbeListSlice, fetchIpbes} from "./slice";

const {
    reloadIpbeListData,
    setIpbeListViewMode,
    setIpbeListPage,
    setIpbeListItemsPerPage,
    setIpbeListFilter,
    resetIpbeListFilter,
    setIpbeListFilterFromUrl,
} = ipbeListSlice.actions;

export {
    fetchIpbes,
    reloadIpbeListData,
    setIpbeListViewMode,
    setIpbeListPage,
    setIpbeListItemsPerPage,
    setIpbeListFilter,
    resetIpbeListFilter,
    setIpbeListFilterFromUrl,
};
