import {FC, useCallback, useMemo, useState} from "react";
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
import {DeleteIpbeModal} from "@nxt-ui/cp/components";

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
            if (action !== "delete") {
                dispatch(ipbeListActions.applyAction({action, selected}));
            } else {
                setOpen(true);
            }
        },
        [selected, dispatch]
    );

    const applyDelete = useCallback(() => {
        if (action) {
            dispatch(ipbeListActions.setAction(action));
            dispatch(ipbeListActions.applyAction({action, selected}));
        }
        setOpen(false);
    }, [selected, dispatch, action]);

    const changeView = useCallback(
        (mode: EIpbeListViewMode) => () => {
            dispatch(ipbeListActions.setIpbeListViewMode(mode));
        },
        [dispatch]
    );

    const disabled = useMemo(() => {
        return Boolean(!selected.length);
    }, [selected]);

    const [open, setOpen] = useState<boolean>(false);

    const handleMenuClose = useCallback(() => {
        setOpen(false);
    }, []);

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
            <DeleteIpbeModal
                text="Are you shure that you whant to delete this item?"
                title="Delete item"
                open={open}
                onAprove={applyDelete}
                onClose={handleMenuClose}
            />
        </div>
    );
};

export default IpbeActionsStrip;
