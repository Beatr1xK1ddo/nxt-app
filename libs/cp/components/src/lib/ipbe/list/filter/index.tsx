import {FC, KeyboardEventHandler, useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {Button, Dropdown, InputText} from "@nxt-ui/components";
import {EColors} from "@nxt-ui/colors";
import {
    EAppGeneralStatus,
    EDropdownEmptyType,
    EIpbeTimeCode,
    EItemsPerPage,
    NumericId,
    Optional,
} from "@nxt-ui/cp/types";
import {ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";
import {SelectCompany, SelectNode} from "../../../common";

import "./index.css";
import {FilterButtons, FilterList} from "./style";

interface IpbeFilterLocalState {
    name: string;
    nodeId: Optional<NumericId>;
    companyId: Optional<NumericId>;
    status: Optional<EAppGeneralStatus>;
    timeCode: Optional<EIpbeTimeCode>;
    itemsPerPage: EItemsPerPage;
}

const getLocalFilterInitialState = (filter: any) => ({
    name: filter.name,
    nodeId: filter.nodeId,
    companyId: filter.companyId,
    status: filter.status || "",
    timeCode: filter.timeCode || "",
    itemsPerPage: filter.pagination.itemsPerPage,
});

export const IpbeListFilter: FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector(ipbeListSelectors.selectIpbeListFilter);
    const [, setSearchParams] = useSearchParams();
    const [localFilter, setLocalFilter] = useState<IpbeFilterLocalState>(getLocalFilterInitialState(filter));

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
        dispatch(ipbeListActions.resetIpbeListFilter());
        dispatch(ipbeListActions.reloadIpbeListData());
    }, [dispatch]);

    const applyFilters = useCallback(() => {
        dispatch(
            ipbeListActions.setIpbeListFilter({
                name: localFilter.name,
                nodeId: localFilter.nodeId,
                companyId: localFilter.companyId,
                status: localFilter.status,
                timeCode: localFilter.timeCode,
            })
        );
        dispatch(ipbeListActions.setIpbeListItemsPerPage(localFilter.itemsPerPage));
        dispatch(ipbeListActions.setIpbeListPage(1));
        dispatch(ipbeListActions.reloadIpbeListData());
    }, [dispatch, localFilter]);

    const handleSubmit = useCallback(
        (e) => {
            if (e.key === "Enter") {
                applyFilters();
            }
        },
        [applyFilters]
    ) as KeyboardEventHandler<HTMLDivElement>;

    const statusValues = useMemo(
        () =>
            Object.values(EAppGeneralStatus).filter((value) => {
                const condition =
                    value === EAppGeneralStatus.restarting ||
                    value === EAppGeneralStatus.starting ||
                    value === EAppGeneralStatus.stopping;
                return !condition;
            }),
        []
    );

    return (
        <section className="filter-wrap">
            <FilterList>
                <InputText
                    label="NAME"
                    value={localFilter.name}
                    onChange={handleFilterChanged("name")}
                    onKeyDown={handleSubmit}
                    fullWidth
                />
                <SelectNode label="NODE" value={localFilter.nodeId} onChange={handleFilterChanged("nodeId")} />
                <SelectCompany
                    label="COMPANY"
                    value={localFilter.companyId}
                    onChange={handleFilterChanged("companyId")}
                />
                <Dropdown
                    label="STATUS"
                    values={statusValues}
                    value={localFilter.status}
                    onChange={handleFilterChanged("status")}
                    emptyValue={EDropdownEmptyType.ANY}
                />
                <Dropdown
                    label="ITEMS PER PAGE"
                    values={Object.values(EItemsPerPage)}
                    value={localFilter.itemsPerPage}
                    onChange={handleFilterChanged("itemsPerPage")}
                />
                <FilterButtons className="filter-buttons">
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
