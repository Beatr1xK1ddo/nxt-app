import {FC, useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {EIpbeChooseActions, EIpbeListViewMode, EItemsPerPage} from "@nxt-ui/cp/types";
import {ipbeListSelectors, ipbeListActions} from "@nxt-ui/cp-redux";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {SelectActions} from "./SelectActions";
import {SelectChangeEvent} from "@mui/material/Select/Select";

export const IpbeActionsStrip: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pagination = useSelector(ipbeListSelectors.selectIpbeListPagination);
    const viewMode = useSelector(ipbeListSelectors.selectIpbeListViewMode);
    const selected = useSelector(ipbeListSelectors.selectIpbeListSelected);
    const action = useSelector(ipbeListSelectors.selectIpbeListAction);

    const handleAddNew = useCallback(() => navigate("/ipbe"), [navigate]);

    const {from, to, itemsCount} = useMemo(() => {
        const {page, itemsPerPage, itemsCount} = pagination;
        const from = itemsPerPage === EItemsPerPage.all ? 1 : (page - 1) * Number.parseInt(itemsPerPage) + 1;
        const to =
            itemsPerPage === EItemsPerPage.all
                ? itemsCount
                : page * Number.parseInt(itemsPerPage) > itemsCount
                ? itemsCount
                : page * Number.parseInt(itemsPerPage);
        return {from, to, itemsCount};
    }, [pagination]);

    const applyActions = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const action = e.target.value as keyof typeof EIpbeChooseActions;
            dispatch(ipbeListActions.setAction(action));
            dispatch(ipbeListActions.applyAction({action, selected}));
        },
        [selected, dispatch]
    );

    const changeView = useCallback(
        (mode: EIpbeListViewMode) => () => {
            dispatch(ipbeListActions.setIpbeListViewMode(mode));
        },
        [dispatch]
    );

    const disabled = useMemo(() => {
        return Boolean(!selected.length);
    }, [selected]);

    return (
        <div className="controller-wrap">
            <div className="controller-action">
                <Button icon="plus" iconbefore onClick={handleAddNew}>
                    Add new
                </Button>
                <SelectActions
                    disabled={disabled}
                    onChange={applyActions}
                    label="CHOOSE ACTION"
                    inputWidth={210}
                    value={action}
                />
            </div>
            <div>
                <p>{`Showing ${from} to ${to} of ${itemsCount}. View as:`}</p>
                <div className="controller-right-icons">
                    <div
                        className={clsx("block-icon", viewMode === EIpbeListViewMode.list && "active")}
                        onClick={changeView(EIpbeListViewMode.list)}>
                        <Icon name="burger" />
                    </div>
                    <div
                        className={clsx("block-icon", viewMode === EIpbeListViewMode.card && "active")}
                        onClick={changeView(EIpbeListViewMode.card)}>
                        <Icon name="card" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IpbeActionsStrip;
