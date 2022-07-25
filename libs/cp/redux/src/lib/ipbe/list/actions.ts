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
    setSelected,
    removeSelected,
    setIpbeItemStatus,
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
    setSelected,
    removeSelected,
    applyAction,
    setIpbeItemStatus,
};
