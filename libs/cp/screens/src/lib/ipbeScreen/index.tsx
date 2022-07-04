import {FC} from "react";
import {ActionsStrip, IpbeListFilter, IpbeContainer} from "@nxt-ui/cp/components";
import {useCompaniesList, useNodesList} from "@nxt-ui/cp/hooks";
import {EAppType} from "@nxt-ui/cp/types";
import {useDispatch, useSelector} from "react-redux";
import {ipbeListSelectors, ipbeListActions} from "@nxt-ui/cp-redux";
import {EListViewMode} from "@nxt-ui/cp/types";

export const IpbeListScreen: FC = () => {
    const dispatch = useDispatch();
    useNodesList(EAppType.IPBE);
    useCompaniesList(EAppType.IPBE);
    const pagination = useSelector(ipbeListSelectors.selectIpbeListPagination);
    const viewMode = useSelector(ipbeListSelectors.selectIpbeListViewMode);
    const selected = useSelector(ipbeListSelectors.selectIpbeListSelected);
    const action = useSelector(ipbeListSelectors.selectIpbeListAction);
    const setAction = (action: any) => dispatch(ipbeListActions.setAction(action));
    const applyAction = (action: any, selected: any) => dispatch(ipbeListActions.applyAction({action, selected}));
    const setListViewMode = (mode: EListViewMode) => dispatch(ipbeListActions.setIpbeListViewMode(mode));

    return (
        <>
            <IpbeListFilter />
            <ActionsStrip 
                pagination={pagination}
                viewMode={viewMode}
                selected={selected}
                action={action}
                setAction={setAction}
                applyAction={applyAction}
                setListViewMode={setListViewMode}
                appType={EAppType.IPBE}
            />
            <IpbeContainer />
        </>
    );
};
