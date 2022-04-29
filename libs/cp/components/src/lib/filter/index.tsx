import {ChangeEventHandler, FC, useCallback} from "react";
import "./filter.css";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {EColors} from "@nxt-ui/colors";
import {useDispatch, useSelector} from "react-redux";
import {
    clearFilter,
    EItemsPerPage,
    getNotEmptyFilters,
    IFilters,
    setCompanyFilter,
    setItemsPerPageFilter,
    setNameFilter,
    setNodeFilter,
    setStatusFilter,
    setTimecodeFilter,
} from "@nxt-ui/cp/ducks";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {CompanyDropdown, NodeDropdown} from "../dropdowns";
import {ETimecodeType} from "@nxt-ui/cp/api";
import {EStatusTypes} from "@nxt-ui/cp/types";

export const Filter: FC = () => {
    const params = useSelector(getNotEmptyFilters);

    const dispatch = useDispatch();

    const changeName = useCallback(
        (e) => {
            dispatch(setNameFilter(e.currentTarget.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const applyFilters = useCallback(() => {
        console.log("applyFilters");
    }, []);

    const resetFilters = useCallback(() => {
        dispatch(clearFilter());
    }, [dispatch]);

    const setNodeIdFilter = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            if (e.target.value) {
                dispatch(setNodeFilter(e.target.value as number));
            }
        },
        [dispatch]
    );

    const setCompanyIdFilter = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            if (e.target.value) {
                dispatch(setCompanyFilter(e.target.value as number));
            }
        },
        [dispatch]
    );

    const changeStatus = useCallback((e: SelectChangeEvent<unknown>) => {
        console.log("changeStatus event", e.target);
        dispatch(setStatusFilter(e.target.value as string));
    }, []);

    const changeItemsPerPage = useCallback((e: SelectChangeEvent<unknown>) => {
        dispatch(setItemsPerPageFilter(e.target.value as string));
    }, []);

    const changeTimecode = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(setTimecodeFilter(e.target.value as string));
        },
        [dispatch]
    );

    return (
        <section className="filter-wrap">
            <div className="filter-list">
                <InputText
                    label="NAME"
                    value={params[IFilters.name] || ""}
                    onChange={changeName}
                    fullWidth
                />
                <NodeDropdown
                    label="NODE"
                    value={params[IFilters.node]}
                    onChange={setNodeIdFilter}
                />
                <CompanyDropdown
                    label="COMPANY"
                    value={params[IFilters.company]}
                    onChange={setCompanyIdFilter}
                />
                <Dropdown
                    label="STATUS"
                    onChange={changeStatus}
                    value={params[IFilters.status]}
                    values={Object.values(EStatusTypes)}
                />
                <Dropdown
                    label="TIMECODE"
                    values={Object.values(ETimecodeType)}
                    onChange={changeTimecode}
                    value={params[IFilters.timecode]}
                />
                <Dropdown
                    label="ITEMS PER PAGE"
                    onChange={changeItemsPerPage}
                    value={params[IFilters.itemsPerPage]}
                    values={Object.values(EItemsPerPage)}
                />
                <div className="filter-buttons">
                    <Button onClick={applyFilters} icon="filter" iconBefore>
                        Filter
                    </Button>
                    <Button
                        onClick={resetFilters}
                        style={{color: EColors.black, marginLeft: 8}}
                        bgColor={EColors.grey}>
                        Reset
                    </Button>
                </div>
            </div>
        </section>
    );
};
