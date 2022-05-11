import {FC, useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";

import {Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {EIpbeListViewMode, EItemsPerPage} from "@nxt-ui/cp/types";
import {ipbeListSelectors, ipbeListActions} from "@nxt-ui/cp-redux";

import "./controller.css";

export const IpbeActionsStrip: FC = () => {
    const dispatch = useDispatch();
    const pagination = useSelector(ipbeListSelectors.selectIpbeListPagination);
    const viewMode = useSelector(ipbeListSelectors.selectIpbeListViewMode);

    const {from, to, itemsCount} = useMemo(() => {
        const {page, itemsPerPage, itemsCount} = pagination;
        const from = itemsPerPage === EItemsPerPage.all ? 1 : (page - 1) * Number.parseInt(itemsPerPage) + 1;
        const to = itemsPerPage === EItemsPerPage.all ? itemsCount : page * Number.parseInt(itemsPerPage) > itemsCount ? itemsCount : page * Number.parseInt(itemsPerPage);
        return {from, to, itemsCount};
    }, [pagination]);

    const changeView = useCallback(
        (mode: EIpbeListViewMode) => () => {
            dispatch(ipbeListActions.setIpbeListViewMode(mode));
        },
        [dispatch]
    );

    return (
        <div className="controller-wrap">
            <div className="controller-action">
                <Button icon="plus" iconBefore>
                    Add new
                </Button>
                <Dropdown label="CHOOSE ACTION" inputWidth={210} />
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
