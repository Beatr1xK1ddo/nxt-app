import {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {Button, Dropdown, InputText} from "@nxt-ui/components";
import {EColors} from "@nxt-ui/colors";
import {EAppGeneralStatus, EItemsPerPage, NumericId, ENodeType, ETXRAppType, EServerOnline} from "@nxt-ui/cp/types";
import {txrListActions, txrListSelectors} from "@nxt-ui/cp-redux";
import {SelectCompany, SelectNode} from "@nxt-ui/cp/components";

import "./index.css";
import {FilterButtons, FilterList} from "./style";

interface TxrFilterLocalState {
    name: string;
    nodeId: null | NumericId;
    nodeType: null | ENodeType;
    companyId: null | NumericId;
    status: null | EAppGeneralStatus;
    appType: null | ETXRAppType;
    serverOnline: EServerOnline;
    itemsPerPage: EItemsPerPage;
}

const getLocalFilterInitialState = (filter: any) => ({
    name: filter.name,
    nodeId: filter.nodeId,
    nodeType: filter.nodeType || ENodeType.any,
    companyId: filter.companyId,
    status: filter.status,
    appType: filter.appType,
    serverOnline: filter.serverOnline,
    itemsPerPage: filter.pagination.itemsPerPage,
});

export const TxrListFilter: FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector(txrListSelectors.selectTxrListFilter);
    const [, setSearchParams] = useSearchParams();
    const [localFilter, setLocalFilter] = useState<TxrFilterLocalState>(getLocalFilterInitialState(filter));

    useEffect(() => {
        setLocalFilter(getLocalFilterInitialState(filter));
        setSearchParams(filter.urlSearchParams);
    }, [filter, setSearchParams]);

    const handleFilterChanged = useCallback(
        (key: string) => (e: SelectChangeEvent<unknown> | {target: {value: any}}) => {
            setLocalFilter((state) => ({...state, [key]: e.target.value}));
        },
        []
    );

    const resetFilters = useCallback(() => {
        dispatch(txrListActions.resetTxrListFilter());
        dispatch(txrListActions.reloadTxrListData());
    }, [dispatch]);

    const applyFilters = useCallback(() => {
        dispatch(
            txrListActions.setTxrListFilter({
                name: localFilter.name,
                nodeId: localFilter.nodeId,
                companyId: localFilter.companyId,
                status: localFilter.status,
                appType: localFilter.appType,
                serverOnline: localFilter.serverOnline,
                nodeType: localFilter.nodeType,
            })
        );
        dispatch(txrListActions.setTxrListItemsPerPage(localFilter.itemsPerPage));
        dispatch(txrListActions.reloadTxrListData());
    }, [dispatch, localFilter]);

    return (
        <section className="filter-wrap">
            <FilterList>
                <InputText label="NAME" value={localFilter.name} onChange={handleFilterChanged("name")} fullWidth />
                <SelectNode label="NODE" value={localFilter.nodeId} onChange={handleFilterChanged("nodeId")} />
                <Dropdown
                    label="NODE TYPE"
                    values={Object.values(ENodeType)}
                    value={localFilter.nodeType}
                    onChange={handleFilterChanged("nodeType")}
                />
                <SelectCompany
                    label="COMPANY"
                    value={localFilter.companyId}
                    onChange={handleFilterChanged("companyId")}
                />
                <Dropdown
                    label="STATUS"
                    values={Object.values(EAppGeneralStatus)}
                    value={localFilter.status}
                    onChange={handleFilterChanged("status")}
                    useEmptyValue
                />
                <Dropdown
                    label="APP TYPE"
                    values={Object.values(ETXRAppType)}
                    value={localFilter.appType}
                    onChange={handleFilterChanged("appType")}
                    useEmptyValue
                />
                <Dropdown
                    label="SERVER ONLINE"
                    values={Object.values(EServerOnline)}
                    value={localFilter.serverOnline}
                    onChange={handleFilterChanged("serverOnline")}
                    useEmptyValue
                />
                <Dropdown
                    label="ITEMS PER PAGE"
                    values={Object.values(EItemsPerPage)}
                    value={localFilter.itemsPerPage}
                    onChange={handleFilterChanged("itemsPerPage")}
                />
                <FilterButtons>
                    <Button onClick={applyFilters} icon="filter" iconbefore>
                        Filter
                    </Button>
                    <Button onClick={resetFilters} style={{color: EColors.black, marginLeft: 8}} bgcolor={EColors.grey}>
                        Reset
                    </Button>
                </FilterButtons>
            </FilterList>
        </section>
    );
};
