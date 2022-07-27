import {FC, useCallback, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import clsx from "clsx";
import {Button, Dropdown} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {
    EChooseActions,
    EListViewMode,
    EItemsPerPage,
    IPagination,
    EAppType,
    EChangeStatus,
    IChangeStatuses,
    EAppName,
} from "@nxt-ui/cp/types";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {DeleteModal} from "@nxt-ui/cp/components";

interface IActionsStripProps {
    appType: EAppType;
    viewMode: EListViewMode;
    pagination: IPagination;
    selected: Array<number>;
    removeItems: (selected: Array<number>) => void;
    changeStatuses: (statuses: Array<{}>) => void;
    setListViewMode: (viewMode: EListViewMode) => void;
}

export const ActionsStrip: FC<IActionsStripProps> = ({
    appType,
    viewMode,
    pagination,
    selected,
    removeItems,
    changeStatuses,
    setListViewMode,
}) => {
    const navigate = useNavigate();

    const handleAddNew = useCallback(() => navigate(`/${EAppName[appType]}`), [navigate, appType]);

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

    const changeEditActionHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const action = e.target.value as EChooseActions;
            let statuses: IChangeStatuses;
            switch (action) {
                case EChooseActions.delete:
                    setOpen(true);
                    break;
                case EChooseActions.start:
                case EChooseActions.restart:
                    statuses = selected.map((id) => ({id, statusChange: EChangeStatus.start}));
                    changeStatuses(statuses);
                    break;
                case EChooseActions.stop:
                    statuses = selected.map((id) => ({id, statusChange: EChangeStatus.stop}));
                    changeStatuses(statuses);
                    break;
                default:
                    break;
            }
        },
        [selected, changeStatuses]
    );

    const applyDelete = useCallback(() => {
        removeItems(selected);
        setOpen(false);
    }, [removeItems, selected]);

    const changeView = useCallback(
        (mode: EListViewMode) => () => {
            setListViewMode(mode);
        },
        [setListViewMode]
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
                <Dropdown
                    disabled={disabled}
                    label="CHOOSE ACTION"
                    inputWidth={210}
                    onChange={changeEditActionHandler}
                    values={Object.values(EChooseActions)}
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
