import {useSelector, useDispatch} from "react-redux";
import {FC, useEffect, useCallback, ChangeEvent} from "react";

import {ipbeListSelectors, ipbeListActions} from "@nxt-ui/cp-redux";

import {IpbeListItem} from "../item";
import {ApplicationsContainer} from "@nxt-ui/cp/components"
import {EDataProcessingStatus} from "@nxt-ui/cp/types";

export const IpbeContainer: FC = () => {    
    const dispatch = useDispatch();
    const viewMode = useSelector(ipbeListSelectors.selectIpbeListViewMode);
    const ipbeList = useSelector(ipbeListSelectors.selectIpbeListItems);
    const ipbeListStatus = useSelector(ipbeListSelectors.selectIpbeListStatus);
    const ipbeListFilter = useSelector(ipbeListSelectors.selectIpbeListFilter);

    useEffect(() => {
        if (ipbeListStatus === EDataProcessingStatus.fetchRequired) {
            dispatch(ipbeListActions.fetchIpbes(ipbeListFilter));
        }
    }, [dispatch, ipbeListFilter, ipbeList]);

    const setPage = useCallback(
        (e: ChangeEvent<unknown>, page: number) => {
            dispatch(ipbeListActions.setIpbeListPage(page));
            dispatch(ipbeListActions.reloadIpbeListData());
        },
        [dispatch]
    );

    return (
        <ApplicationsContainer 
            viewMode={viewMode}
            listItems={ipbeList}
            listStatus={ipbeListStatus}
            listFilter={ipbeListFilter}
            itemComponent={IpbeListItem}
            setPage={setPage}
        />
    );
};
