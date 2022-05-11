import {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {Button, Dropdown, InputText} from "@nxt-ui/components";
import {EColors} from "@nxt-ui/colors";
import {ETimeCodeType} from "@nxt-ui/cp/api";
import {EAppGeneralStatus, EItemsPerPage} from "@nxt-ui/cp/types";
import {ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";

import {CompanyDropdown, NodeDropdown} from "../dropdowns";

import "./filter.css";

interface IpbeFilterLocalState {
    name: string;
    nodeId: null | number;
    companyId: null | number;
    status: null | EAppGeneralStatus;
    timeCode: null | ETimeCodeType;
    itemsPerPage: EItemsPerPage;
}

const getLocalFilterInitialState = (filter: any) => ({
    name: filter.name,
    nodeId: filter.nodeId,
    companyId: filter.companyId,
    status: filter.status,
    timeCode: filter.timeCode,
    itemsPerPage: filter.pagination.itemsPerPage,
});

export const IpbeFilter: FC = () => {
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
        dispatch(ipbeListActions.reloadIpbeListData());
    }, [dispatch, localFilter]);

    return (
        <section className="filter-wrap">
            <div className="filter-list">
                <InputText label="NAME" value={localFilter.name} onChange={handleFilterChanged("name")} fullWidth />
                <NodeDropdown label="NODE" value={localFilter.nodeId} onChange={handleFilterChanged("nodeId")} />
                <CompanyDropdown
                    label="COMPANY"
                    value={localFilter.companyId}
                    onChange={handleFilterChanged("companyId")}
                />
                <Dropdown
                    label="STATUS"
                    onChange={handleFilterChanged("status")}
                    value={localFilter.status}
                    values={Object.values(EAppGeneralStatus)}
                />
                <Dropdown
                    label="TIMECODE"
                    values={Object.values(ETimeCodeType)}
                    value={localFilter.timeCode}
                    onChange={handleFilterChanged("timeCode")}
                />
                <Dropdown
                    label="ITEMS PER PAGE"
                    values={Object.values(EItemsPerPage)}
                    value={localFilter.itemsPerPage}
                    onChange={handleFilterChanged("itemsPerPage")}
                />
                <div className="filter-buttons">
                    <Button onClick={applyFilters} icon="filter" iconBefore>
                        Filter
                    </Button>
                    <Button onClick={resetFilters} style={{color: EColors.black, marginLeft: 8}} bgColor={EColors.grey}>
                        Reset
                    </Button>
                </div>
            </div>
        </section>
    );
};
