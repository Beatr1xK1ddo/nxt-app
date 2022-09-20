import {FC, useCallback, useEffect} from "react";
import {ActionsStrip, IpbeListFilter, IpbeContainer} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";
import {EAppType} from "@nxt-ui/cp/types";
import {useDispatch, useSelector} from "react-redux";
import {ipbeListSelectors, ipbeListActions, commonActions} from "@nxt-ui/cp-redux";
import {EListViewMode} from "@nxt-ui/cp/types";

export const IpbeListScreen: FC = () => {
    const dispatch = useDispatch();
    useNodesList(EAppType.IPBE);
    useCompaniesList(EAppType.IPBE);
    const pagination = useSelector(ipbeListSelectors.selectIpbeListPagination);
    const viewMode = useSelector(ipbeListSelectors.selectIpbeListViewMode);
    const setListViewMode = (mode: EListViewMode) => dispatch(ipbeListActions.setIpbeListViewMode(mode));

    useEffect(() => {
        return () => {
            dispatch(commonActions.applicationActions.removeAllSelectedApplications());
        };
    }, [dispatch]);

    const changeStatusHandle = useCallback(
        (statuses) => {
            dispatch(commonActions.applicationActions.changeStatuses({statuses: statuses, appType: EAppType.IPBE}));
        },
        [dispatch]
    );
    const removeItemsHandle = useCallback(
        (items) => {
            dispatch(commonActions.applicationActions.removeApplications({data: items, appType: EAppType.IPBE}));
        },
        [dispatch]
    );

    return (
        <>
            <IpbeListFilter />
            <ActionsStrip
                pagination={pagination}
                viewMode={viewMode}
                changeStatuses={changeStatusHandle}
                removeItems={removeItemsHandle}
                setListViewMode={setListViewMode}
                appType={EAppType.IPBE}
            />
            <IpbeContainer />
        </>
    );
};
