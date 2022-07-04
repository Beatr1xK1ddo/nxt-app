import type {FC} from "react";
import {TxrListFilter, TxrContainer, ActionsStrip} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";
import { EAppType } from "@nxt-ui/cp/types";
import {useDispatch, useSelector} from "react-redux";
import {txrListSelectors, txrListActions} from "@nxt-ui/cp-redux";
import {EListViewMode} from "@nxt-ui/cp/types";

export const TxrListScreen: FC = () => {
    const dispatch = useDispatch();
    useNodesList(EAppType.TXR);
    useCompaniesList(EAppType.TXR);
    const pagination = useSelector(txrListSelectors.selectTxrListPagination);
    const viewMode = useSelector(txrListSelectors.selectTxrListViewMode);
    const selected = useSelector(txrListSelectors.selectTxrListSelected);
    const action = useSelector(txrListSelectors.selectTxrListAction);
    const setAction = (action: any) => dispatch(txrListActions.setAction(action));
    const applyAction = (action: any, selected: any) => dispatch(txrListActions.applyAction({action, selected}));
    const setListViewMode = (mode: EListViewMode) => dispatch(txrListActions.setTxrListViewMode(mode));

    return (
        <>
            <TxrListFilter />
            <ActionsStrip 
                pagination={pagination}
                viewMode={viewMode}
                selected={selected}
                action={action}
                setAction={setAction}
                applyAction={applyAction}
                setListViewMode={setListViewMode}
                appType={EAppType.IPBE}
            />
            <TxrContainer />
        </>
    );
};
