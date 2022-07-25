import {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {Button, Dropdown, InputText} from "@nxt-ui/components";
import {EColors} from "@nxt-ui/colors";
import {EAppGeneralStatus, EIpbeTimeCode, EItemsPerPage, NumericId} from "@nxt-ui/cp/types";
import {ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";
import {SelectCompany, SelectNode} from "../../../common";

import "./index.css";
import {FilterButtons, FilterList} from "./style";

export const TranscodersListFilter: FC = () => {
    return (
        <section className="filter-wrap">
            <FilterList>
                <InputText label="CHANNEL NAME" fullWidth />
                <InputText label="LOCATION" fullWidth />
                <SelectNode label="NODE" value={localFilter.nodeId} onChange={handleFilterChanged("nodeId")} />
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
                    label="TIMECODE"
                    values={Object.values(EIpbeTimeCode)}
                    value={localFilter.timeCode}
                    onChange={handleFilterChanged("timeCode")}
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
