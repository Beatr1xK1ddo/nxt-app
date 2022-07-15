//actions
import {txrListSlice, fetchTxrs} from "./slice";
const {
    reloadTxrListData,
    setTxrListViewMode,
    setTxrListPage,
    setTxrListItemsPerPage,
    setTxrListFilter,
    setTxrListFilterByKey,
    resetTxrListFilter,
    setAction,
    setSelected,
    removeSelected,
} = txrListSlice.actions;

export {
    fetchTxrs,
    reloadTxrListData,
    setTxrListViewMode,
    setTxrListPage,
    setTxrListItemsPerPage,
    setTxrListFilter,
    setTxrListFilterByKey,
    resetTxrListFilter,
    setAction,
    setSelected,
    removeSelected,
};
