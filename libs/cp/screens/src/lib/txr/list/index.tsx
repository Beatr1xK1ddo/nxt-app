import {FC, useCallback, useEffect} from "react";
import {TxrListFilter, TxrContainer, ActionsStrip} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList, useProxyServers} from "@nxt-ui/cp/hooks";
import {EAppType} from "@nxt-ui/cp/types";
import {useDispatch, useSelector} from "react-redux";
import {txrListSelectors, txrListActions, commonActions} from "@nxt-ui/cp-redux";
import {EListViewMode} from "@nxt-ui/cp/types";

export const TxrListScreen: FC = () => {
    const dispatch = useDispatch();
    useNodesList(EAppType.TXR);
    useCompaniesList(EAppType.TXR);
    useProxyServers();
    const pagination = useSelector(txrListSelectors.selectTxrListPagination);
    const viewMode = useSelector(txrListSelectors.selectTxrListViewMode);
    const setListViewMode = (mode: EListViewMode) => dispatch(txrListActions.setTxrListViewMode(mode));

    const changeStatusHandle = useCallback(
        (statuses) => {
            dispatch(commonActions.applicationActions.changeStatuses({statuses: statuses, appType: EAppType.TXR}));
        },
        [dispatch]
    );
    const removeItemsHandle = useCallback(
        (items) => {
            dispatch(commonActions.applicationActions.removeApplications({data: items, appType: EAppType.TXR}));
        },
        [dispatch]
    );
    const cloneItemsHandle = useCallback(
        (items: Array<number>) => {
            dispatch(commonActions.applicationActions.cloneApplications({ids: items, appType: EAppType.TXR}));
        },
        [dispatch]
    );

    useEffect(() => {
        return () => {
            dispatch(txrListActions.resetTxrListFilter());
            dispatch(txrListActions.clearTxrListData());
        };
    }, [dispatch]);

    return (
        <>
            <TxrListFilter />
            <ActionsStrip
                pagination={pagination}
                viewMode={viewMode}
                changeStatuses={changeStatusHandle}
                removeItems={removeItemsHandle}
                cloneItems={cloneItemsHandle}
                setListViewMode={setListViewMode}
                appType={EAppType.TXR}
            />
            <h1 className="listing-heading">Transfers list</h1>
            <TxrContainer />
        </>
    );
};
