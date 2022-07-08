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
    padding: 15px 5px 0 102px;

    @media (max-width: 992px /*--q-l*/) {
        display: none;
    }
`;

const HeaderTitle = styled("li")`
    width: 196px;
    color: var(--grey-dark);
    font-size: calc(var(--fz) - 2px);
    padding: 0 8px;
    @media (max-width: 1200px) {
        width: 152px;
    }
    &:not(:last-child) {
        flex-shrink: 0;
    }
    &:first-of-type {
        width: 340px;
        @media (max-width: 1400px) {
            width: 280px;
        }
        @media (max-width: 1200px) {
            width: 261px;
        }
    }
    &:nth-of-type(2) {
        width: 54px;
    }
    &:nth-of-type(3) {
        width: 46px;
        padding: 0;
        @media (max-width: 1200px) {
        }
    }
    &:nth-of-type(6) {
        @media (max-width: 1200px) {
            width: 128px;
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
