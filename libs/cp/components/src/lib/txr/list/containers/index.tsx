import {useDispatch, useSelector} from "react-redux";
import {ChangeEvent, FC, useCallback, useEffect} from "react";
import styled from "@emotion/styled";

import {EDataProcessingStatus, EListViewMode} from "@nxt-ui/cp/types";

import {TxrListItem} from "../item";
import {txrListActions, txrListSelectors} from "@nxt-ui/cp-redux";
import {ApplicationsContainer} from "@nxt-ui/cp/components";

const HeaderContainer = styled("ul")`
    margin: 0;
    width: 100%;
    display: flex;
    padding: 0.9375rem 0.3125rem 0 6.375rem;

    @media (max-width: 62rem /*--q-l*/) {
        display: none;
    }
`;

const HeaderTitle = styled("li")`
    width: 12.25rem;
    color: var(--grey-dark);
    font-size: calc(var(--fz) - 0.125rem);
    padding: 0 0.5rem;
    @media (max-width: 75rem) {
        width: 9.5rem;
    }
    &:not(:last-child) {
        flex-shrink: 0;
    }
    &:first-of-type {
        width: 21.25rem;
        @media (max-width: 87.5rem) {
            width: 17.5rem;
        }
        @media (max-width: 75rem) {
            width: 16.3125rem;
        }
    }
    &:nth-of-type(2) {
        width: 3.375rem;
    }
    &:nth-of-type(3) {
        width: 2.875rem;
        padding: 0;
        @media (max-width: 75rem) {
        }
    }
    &:nth-of-type(6) {
        @media (max-width: 75rem) {
            width: 8rem;
        }
    }
    &:last-of-type {
        width: 100%;
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
    }
`;

export const TxrContainer: FC = () => {
    const dispatch = useDispatch();

    const viewMode = useSelector(txrListSelectors.selectTxrListViewMode);
    const txrList = useSelector(txrListSelectors.selectTxrListItems);
    const txrListStatus = useSelector(txrListSelectors.selectTxrListStatus);
    const txrListFilter = useSelector(txrListSelectors.selectTxrListFilter);
    const txrListPagination = useSelector(txrListSelectors.selectTxrListPagination);

    useEffect(() => {
        if (txrListStatus === EDataProcessingStatus.fetchRequired) {
            dispatch(txrListActions.fetchTxrs(txrListFilter));
        }
    }, [dispatch, txrListFilter, txrListStatus]);

    const setPage = useCallback(
        (e: ChangeEvent<unknown>, page: number) => {
            dispatch(txrListActions.setTxrListPage(page));
            dispatch(txrListActions.reloadTxrListData());
        },
        [dispatch]
    );

    return (
        <>
            {viewMode === EListViewMode.list && (
                <HeaderContainer>
                    <HeaderTitle>NAME</HeaderTitle>
                    <HeaderTitle>QOS</HeaderTitle>
                    <HeaderTitle>STATUS</HeaderTitle>
                    <HeaderTitle>TX</HeaderTitle>
                    <HeaderTitle>PROXY</HeaderTitle>
                    <HeaderTitle>RX</HeaderTitle>
                    <HeaderTitle>ACTIONS</HeaderTitle>
                </HeaderContainer>
            )}
            <ApplicationsContainer
                viewMode={viewMode}
                listItems={txrList}
                listStatus={txrListStatus}
                itemComponent={TxrListItem}
                setPage={setPage}
                pagination={txrListPagination}
            />
        </>
    );
};
