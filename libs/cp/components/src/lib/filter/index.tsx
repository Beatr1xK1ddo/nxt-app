import {FC, useCallback, useEffect} from "react";
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

export const IpbeFilter: FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector(ipbeListSelectors.selectIpbeListFilter);
    const pagination = useSelector(ipbeListSelectors.selectIpbeListPagination);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(ipbeListActions.setIpbeListFilterFromUrl(searchParams.toString()));
        dispatch(ipbeListActions.reloadIpbeListData());
    }, []);

    useEffect(() => {
        setSearchParams(filter.urlSearchParams);
    }, [filter]);

    const handleTextFilterChanged = useCallback(
        (key: string) => (e: {target: {value: any}}) => {
            dispatch(ipbeListActions.setIpbeListFilter({key, value: e.target.value}));
        },
        [dispatch]
    );

    const handleSelectFilterChanged = useCallback(
        (key: string) => (e: SelectChangeEvent<unknown>) => {
            // @ts-ignore
            dispatch(ipbeListActions.setIpbeListFilter({key, value: e.target.value}));
        },
        [dispatch]
    );

    const handleItemsPerPageChanged = useCallback(
        (e) => {
            dispatch(ipbeListActions.setIpbeListItemsPerPage(e.target.value));
        },
        [dispatch]
    );

    const resetFilters = useCallback(() => {
        dispatch(ipbeListActions.resetIpbeListFilter());
        dispatch(ipbeListActions.reloadIpbeListData());
        setSearchParams(filter.urlSearchParams);
    }, [dispatch]);

    const applyFilters = useCallback(() => {
        dispatch(ipbeListActions.reloadIpbeListData());
    }, [dispatch]);

    return (
        <section className="filter-wrap">
            <div className="filter-list">
                <InputText label="NAME" value={filter.name} onChange={handleTextFilterChanged("name")} fullWidth />
                <NodeDropdown label="NODE" value={filter.nodeId} onChange={handleSelectFilterChanged("nodeId")} />
                <CompanyDropdown
                    label="COMPANY"
                    value={filter.companyId}
                    onChange={handleSelectFilterChanged("companyId")}
                />
                <Dropdown
                    label="STATUS"
                    onChange={handleSelectFilterChanged("status")}
                    value={filter.status}
                    values={Object.values(EAppGeneralStatus)}
                />
                <Dropdown
                    label="TIMECODE"
                    values={Object.values(ETimeCodeType)}
                    value={filter.timeCode}
                    onChange={handleSelectFilterChanged("timeCode")}
                />
                <Dropdown
                    label="ITEMS PER PAGE"
                    values={Object.values(EItemsPerPage)}
                    value={pagination.itemsPerPage}
                    onChange={handleItemsPerPageChanged}
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
