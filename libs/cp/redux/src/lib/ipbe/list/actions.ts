//actions
import {ipbeListSlice, fetchIpbes, applyAction} from "./slice";
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
};
