import {ChangeEvent, FC, useCallback, useEffect} from "react";
import styled from "@emotion/styled";
import {EDataProcessingStatus, EIpbeListViewMode} from "@nxt-ui/cp/types";
import {css} from "@emotion/react";
import {IpbeItem} from "../card";
import {useDispatch, useSelector} from "react-redux";
import {PaginationComponent} from "@nxt-ui/components";
import {ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";
import {IContainerProps} from "./types";
import {useSearchParams} from "react-router-dom";
import {filter} from "cypress/types/minimatch";

const TableContainer = css`
    display: flex;
    flex-direction: column;
`;

const CardContainer = css`
    margin-top: 15px;
    column-count: 4;
    page-break-inside: avoid;

    &:after {
        content: "";
        clear: both;
        display: block;
    }

    @media (max-width: 1400px) {
        column-count: 3;
    }
    @media (max-width: 1200px) {
        column-count: 2;
    }
    @media (max-width: 768px) {
        column-count: 1;
    }
`;
export const AppList = styled("ul")`
    column-count: 3;
    page-break-inside: avoid;
    margin: 0 0 15px;
    > .app-log {
        background: var(--bluer);
        padding: 16px 8px 8px;
        border-radius: 8px;
        margin: 0 0 15px;
        -moz-column-break-inside: avoid;
        break-inside: avoid;
        width: 100%;
    }
    @media (max-width: 1200px) {
        column-count: 2;
    }
    @media (max-width: 768px) {
        column-count: 1;
    }
`;

export const Columns: FC<{gap?: number; valign?: string; col?: number; className?: string}> =
    styled("div")<{
        gap?: number;
        col?: number;
        valign?: string;
    }>(
        ({gap, col}) => `
    gap: ${gap ? gap : 24}px;
    display: grid;
    grid-template-columns: ${
        col === 2 ? "1fr 1fr" : col === 3 ? "1fr 1fr 1fr" : col === 4 ? "1fr 1fr 1fr 1fr" : "1fr"
    };
    grid-auto-flow: row;
    margin:0 0 ${gap ? gap : 24}px;
    align-items: self-start;
`
    );
export const BorderBox: FC<{gap?: number; className?: string}> = styled("div")<{gap?: number}>(
    ({gap}) => `
    border: 1px solid var(--grey-dark);
    padding: ${gap ? gap / 1.5 : 16}px;
    margin: 0 0 ${gap ? gap : 24}px;
    border-radius: 8px;
    >div:last-child {
        margin: 0;
    }
`
);

export const FormContainer = styled("div")`
    background: var(--bluer);
    border-radius: 8px;
    padding: 16px 8px 8px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 992px /*--q-l*/) {
        display: block;
    }
`;

export const FlexHolder: FC<{justify?: string; className?: string}> = styled("div")<{
    justify?: string;
}>(
    ({justify}) => `
    justify-content: ${justify ? justify : "space-between"};
    display: flex;
    align-items: center;
    &.app-info {
        margin:0 0 16px;
        >* {
            margin:0 8px 0 0;
        }
        button[data-type='btn-icon'] {
            width: 24px;
            height: 24px;
            padding: 0;
        }
    }
    &.align-top {
        align-items: flex-start;
    }
    &.heading-section {
        margin: 0 0 16px;
        h1 {
            margin: 0 auto 0 0;
            padding: 0 10px 0 0;
        }
        .divider {
            color: var(--grey-black);
            margin: 0 0 0 10px;
        }
        button {
            background: none;
            margin: 0 0 0 10px;
          }
    }
`
);

export const IpbeItemsContainer = styled("ul")<IContainerProps>`
    width: 100%;
    min-height: calc(100vh - 426px);
    box-sizing: border-box;
    ${({mode}) => (mode === EIpbeListViewMode.list ? TableContainer : CardContainer)}
`;

export const RootContainer = styled("div")`
    flex-direction: column;
    display: flex;

    min-height: 100%;
    width: 100%;
    max-width: var(--xxl);
    margin: 0 auto;
    @media (max-width: 1400px /*--q-xxl*/) {
        max-width: var(--xl);
    }
    @media (max-width: 1200px /*--q-xl*/) {
        max-width: var(--l);
    }
    @media (max-width: 992px /*--q-l*/) {
        max-width: var(--m);
    }
    @media (max-width: 768px /*--q-m*/) {
        max-width: var(--s);
        padding: 0 8px;
        box-sizing: border-box;
    }
`;

export const PaginationContainer = styled("div")`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 8px 0;
`;

export const HeaderContainer = styled("ul")`
    margin: 0;
    width: 100%;
    display: flex;
    padding: 15px 5px 0 102px;
    @media (max-width: 992px /*--q-l*/) {
        display: none;
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
    &:first-child {
        width: 335px;
        @media (max-width: 1200px /*--q-xl*/) {
            width: 315px;
        }
    }
    &:nth-child(4) {
        width: 100px;
    }
    &:nth-child(5) {
        width: 110px;
    }
    &:nth-child(6) {
        min-width: 125px;
    }
    &:last-child {
        width: 100%;
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
    }
`;

export const IpbeItems: FC = (props) => {
    const dispatch = useDispatch();

    const viewMode = useSelector(ipbeListSelectors.selectIpbeListViewMode);
    const ipbeList = useSelector(ipbeListSelectors.selectIpbeListItems);
    const ipbeListStatus = useSelector(ipbeListSelectors.selectIpbeListStatus);
    const ipbeListFilter = useSelector(ipbeListSelectors.selectIpbeListFilter);

    useEffect(() => {
        if (ipbeListStatus === EDataProcessingStatus.fetchRequired) {
            dispatch(ipbeListActions.fetchIpbes(ipbeListFilter));
        }
    }, [dispatch, ipbeListFilter, ipbeListStatus]);

    const setPage = useCallback(
        (e: ChangeEvent<unknown>, page: number) => {
            dispatch(ipbeListActions.setIpbeListPage(page));
            dispatch(ipbeListActions.reloadIpbeListData());
        },
        [dispatch]
    );

    const ipbes = ipbeList.map((item) => <IpbeItem key={item.id} mode={viewMode} item={item} />);

    return (
        <>
            {viewMode === EIpbeListViewMode.list && (
                <HeaderContainer>
                    <HeaderTitle>NODE, NAME</HeaderTitle>
                    <HeaderTitle>STATUS</HeaderTitle>
                    <HeaderTitle>RUNTIME</HeaderTitle>
                    <HeaderTitle>INPUT</HeaderTitle>
                    <HeaderTitle>BITRATE</HeaderTitle>
                    <HeaderTitle>DESTINATION</HeaderTitle>
                    <HeaderTitle>ACTIONS</HeaderTitle>
                </HeaderContainer>
            )}
            <IpbeItemsContainer mode={viewMode}>{ipbes}</IpbeItemsContainer>
            <PaginationContainer>
                <PaginationComponent
                    page={ipbeListFilter.pagination.page}
                    count={ipbeListFilter.pagination.pagesCount}
                    onChange={setPage}
                />
            </PaginationContainer>
        </>
    );
};
