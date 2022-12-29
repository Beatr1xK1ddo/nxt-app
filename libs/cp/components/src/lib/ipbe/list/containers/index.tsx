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
    padding: 0.9375rem 0.3125rem 0 6.375rem;

    @media (max-width: 62rem /*--q-l*/) {
        display: none;
    }
    @media (min-width: 87.5rem) {
        padding: 0.9375rem 0.3125rem 0 8.25rem;
    }
`;

export const HeaderTitle = styled("li")`
    width: 4.375rem;
    color: var(--grey-dark);
    font-size: calc(var(--fz) - 0.125rem);
    padding: 0 0.5rem;
    &:not(:last-child) {
        flex-shrink: 0;
    }
    &:first-of-type {
        width: 29.8%;
        @media (max-width: 100rem) {
            width: 19.5rem;
        }
        @media (max-width: 87.5rem) {
            width: 17.1875rem;
        }
        @media (max-width: 75rem) {
            width: 15.9375rem;
        }
    }
    &:nth-of-type(2) {
        width: 8.55rem;
        @media (max-width: 75rem) {
            width: 7rem;
        }
    }
    &:nth-of-type(3) {
        @media (min-width: 87.5rem) {
            width: 7.5rem;
        }
    }
    &:nth-of-type(4) {
        width: 5.8125rem;
        @media (min-width: 87.5rem) {
            width: 7.5rem;
        }
    }
    &:nth-of-type(5) {
        width: 12.0625rem;
        @media (max-width: 75rem) {
            width: 8.9375rem;
        }
    }
    &:nth-of-type(6) {
        min-width: 11.875rem;
        @media (max-width: 75rem) {
            min-width: 7.625rem;
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
