import {useSelector, useDispatch} from "react-redux";
import {FC, useEffect, useCallback, ChangeEvent} from "react";
import {ipbeListSelectors, ipbeListActions} from "@nxt-ui/cp-redux";
import {IpbeListItem} from "../item";
import {ApplicationsContainer} from "@nxt-ui/cp/components";
import {EDataProcessingStatus, EListViewMode} from "@nxt-ui/cp/types";
import styled from "@emotion/styled";

export const HeaderContainer = styled("ul")`
    margin: 0;
    width: 100%;
    display: flex;
    padding: 15px 5px 0 102px;

    @media (max-width: 992px /*--q-l*/) {
        display: none;
    }
    @media (min-width: 1400px) {
        padding: 15px 5px 0 132px;
    }
`;

export const HeaderTitle = styled("li")`
    width: 70px;
    color: var(--grey-dark);
    font-size: calc(var(--fz) - 2px);
    padding: 0 8px;
    &:not(:last-child) {
        flex-shrink: 0;
    }
    &:first-of-type {
        width: 34%;
        @media (max-width: 1400px) {
            width: 275px;
        }
        @media (max-width: 1200px) {
            width: 255px;
        }
    }
    &:nth-of-type(2) {
        width: 140px;
        @media (max-width: 1200px) {
            width: 112px;
        }
    }
    &:nth-of-type(3) {
        @media (min-width: 1400px) {
            width: 120px;
        }
    }
    &:nth-of-type(4) {
        width: 93px;
        @media (min-width: 1400px) {
            width: 120px;
        }
    }
    &:nth-of-type(5) {
        width: 193px;
        @media (max-width: 1200px) {
            width: 143px;
        }
    }
    &:nth-of-type(6) {
        min-width: 190px;
        @media (max-width: 1200px) {
            min-width: 122px;
        }
    }
    &:last-of-type {
        width: 100%;
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
    }
`;

export const IpbeContainer: FC = () => {
    const dispatch = useDispatch();
    const viewMode = useSelector(ipbeListSelectors.selectIpbeListViewMode);
    const ipbeList = useSelector(ipbeListSelectors.selectIpbeListItems);
    const ipbeListStatus = useSelector(ipbeListSelectors.selectIpbeListStatus);
    const ipbeListFilter = useSelector(ipbeListSelectors.selectIpbeListFilter);
    const ipbeListPagination = useSelector(ipbeListSelectors.selectIpbeListPagination);

    useEffect(() => {
        if (ipbeListStatus === EDataProcessingStatus.fetchRequired) {
            dispatch(ipbeListActions.fetchIpbes(ipbeListFilter));
        }
    }, [dispatch, ipbeListFilter, ipbeList, ipbeListStatus]);

    const setPage = useCallback(
        (e: ChangeEvent<unknown>, page: number) => {
            dispatch(ipbeListActions.setIpbeListPage(page));
            dispatch(ipbeListActions.reloadIpbeListData());
        },
        [dispatch]
    );

    return (
        <>
            {viewMode === EListViewMode.list && (
                <HeaderContainer>
                    <HeaderTitle>NODE, NAME</HeaderTitle>
                    <HeaderTitle>STATUS</HeaderTitle>
                    <HeaderTitle>RUNTIME</HeaderTitle>
                    <HeaderTitle>BITRATE</HeaderTitle>
                    <HeaderTitle>DESTINATION</HeaderTitle>
                    <HeaderTitle>INPUT</HeaderTitle>
                    <HeaderTitle>ACTIONS</HeaderTitle>
                </HeaderContainer>
            )}
            <ApplicationsContainer
                viewMode={viewMode}
                listItems={ipbeList}
                listStatus={ipbeListStatus}
                pagination={ipbeListPagination}
                itemComponent={IpbeListItem}
                setPage={setPage}
            />
        </>
    );
};
