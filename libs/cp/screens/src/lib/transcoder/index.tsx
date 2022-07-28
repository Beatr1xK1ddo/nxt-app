import {FC, useCallback} from "react";
import {ActionsStrip, IpbeListFilter, IpbeContainer} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";
import {EAppType} from "@nxt-ui/cp/types";
import {useDispatch, useSelector} from "react-redux";
import {ipbeListSelectors, ipbeListActions, commonActions} from "@nxt-ui/cp-redux";
import {EListViewMode} from "@nxt-ui/cp/types";

export const TranscoderListScreen: FC = () => {
    const dispatch = useDispatch();
    useNodesList(EAppType.IPBE);
    useCompaniesList(EAppType.IPBE);
    const pagination = useSelector(ipbeListSelectors.selectIpbeListPagination);
    const viewMode = useSelector(ipbeListSelectors.selectIpbeListViewMode);
    const selected = useSelector(ipbeListSelectors.selectIpbeListSelected);
    const setListViewMode = (mode: EListViewMode) => dispatch(ipbeListActions.setIpbeListViewMode(mode));

    const changeStatusHandle = useCallback((statuses) => {
        dispatch(commonActions.applicationActions.changeStatuses({statuses: statuses, appType: EAppType.IPBE}));
    }, []);
    const removeItemsHandle = useCallback((items) => {
        dispatch(commonActions.applicationActions.removeApplications({data: items, appType: EAppType.IPBE}));
    }, []);

    return (
        <>
            <span>transcoder</span>
            <IpbeListFilter />
            <ActionsStrip
                pagination={pagination}
                viewMode={viewMode}
                selected={selected}
                changeStatuses={changeStatusHandle}
                removeItems={removeItemsHandle}
                setListViewMode={setListViewMode}
                appType={EAppType.IPBE}
            />
            <IpbeContainer />
        </>
    );
};