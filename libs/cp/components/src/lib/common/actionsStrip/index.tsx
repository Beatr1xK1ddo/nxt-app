import {FC, useCallback, useEffect, useMemo, useState} from "react";
import clsx from "clsx";
import {Button, Dropdown} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {
    EChooseActions,
    EListViewMode,
    EItemsPerPage,
    IPagination,
    EAppGeneralStatusChange,
    IChangeStatuses,
    EAppType,
} from "@nxt-ui/cp/types";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {DeleteModal} from "@nxt-ui/cp/components";
import {commonActions, commonSelectors} from "@nxt-ui/cp-redux";
import {useDispatch, useSelector} from "react-redux";

interface IActionsStripProps {
    appType: EAppType;
    viewMode: EListViewMode;
    pagination: IPagination;
    removeItems: (selected: Array<number>) => void;
    changeStatuses: (statuses: Array<{}>) => void;
    setListViewMode: (viewMode: EListViewMode) => void;
    cloneItems: (ids: Array<number>) => void;
}

export const ActionsStrip: FC<IActionsStripProps> = ({
    appType,
    viewMode,
    pagination,
    removeItems,
    changeStatuses,
    setListViewMode,
    cloneItems,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selected = useSelector(commonSelectors.apps.selectedApps);

    const handleAddNew = useCallback(
        () => navigate(`/${appType === EAppType.IPBE ? "ipbe" : appType}`),
        [navigate, appType]
    );

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
                    statuses = selected.map((id) => ({id, statusChange: EAppGeneralStatusChange.start}));
                    changeStatuses(statuses);
                    break;
                case EChooseActions.stop:
                    statuses = selected.map((id) => ({id, statusChange: EAppGeneralStatusChange.stop}));
                    changeStatuses(statuses);
                    break;
                case EChooseActions.clone:
                    cloneItems(selected);
                    break;
                default:
                    break;
            }
        },
        [selected, changeStatuses, cloneItems]
    );

    useEffect(() => {
        return () => {
            dispatch(commonActions.applicationActions.removeAllSelectedApplications());
        };
    }, [dispatch]);

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

    const title = useMemo(() => {
        return appType === EAppType.IPBE ? "SDI to IP Encoder" : "Transfer";
    }, [appType]);

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
                    notched={false}
                />
            </div>
            <div>
                {!!itemsCount && (
                    <>
                        <p>{`Showing ${from} to ${to} of ${itemsCount}. View as:`}</p>

                        <div className="controller-right-icons">
                            <div
                                className={clsx("block-icon", viewMode === EListViewMode.list && "active")}
                                onClick={changeView(EListViewMode.list)}
                            >
                                <Icon name="burger" />
                            </div>
                            <div
                                className={clsx("block-icon", viewMode === EListViewMode.card && "active")}
                                onClick={changeView(EListViewMode.card)}
                            >
                                <Icon name="card" />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <DeleteModal
                text={`Delete ${title}`}
                title="Confirm action"
                open={open}
                onAprove={applyDelete}
                onClose={handleMenuClose}
            />
        </div>
    );
};

export default ActionsStrip;
