import {FC, useCallback, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import clsx from "clsx";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {EChooseActions, EListViewMode, EItemsPerPage, IPagination, EAppType} from "@nxt-ui/cp/types";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {SelectActions} from "./SelectActions";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {DeleteModal} from "@nxt-ui/cp/components";

interface IActionsStripProps {
    appType: EAppType;
    viewMode: EListViewMode;
    pagination: IPagination;
    selected: Array<number>;
    action: any;
    setAction: (action: any) => void;
    applyAction: (action: any, selected: any) => void;
    setListViewMode: (viewMode: EListViewMode) => void;
}

export const ActionsStrip: FC<IActionsStripProps> = ({
    appType,
    viewMode, 
    pagination, 
    selected, 
    action,
    setAction,
    applyAction,
    setListViewMode
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddNew = useCallback(() => navigate(`/${appType}`), [navigate]);

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
            const action = e.target.value as keyof typeof EChooseActions;
            setAction(action)
            if (action !== "delete") {
                applyAction(action, selected)
            } else {
                setOpen(true);
            }
        },
        [selected, dispatch]
    );

    const applyDelete = useCallback(() => {
        if (action) {
            setAction(action)
            applyAction(action, selected)   
        }
        setOpen(false);
    }, [selected, dispatch, action]);

    const changeView = useCallback(
        (mode: EListViewMode) => () => {
            setListViewMode(mode);
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
                        className={clsx("block-icon", viewMode === EListViewMode.list && "active")}
                        onClick={changeView(EListViewMode.list)}>
                        <Icon name="burger" />
                    </div>
                    <div
                        className={clsx("block-icon", viewMode === EListViewMode.card && "active")}
                        onClick={changeView(EListViewMode.card)}>
                        <Icon name="card" />
                    </div>
                </div>
            </div>
            <DeleteModal
                text={`Delete ${appType}`}
                title="Confirm action"
                open={open}
                onAprove={applyDelete}
                onClose={handleMenuClose}
            />
        </div>
    );
};

export default ActionsStrip;
