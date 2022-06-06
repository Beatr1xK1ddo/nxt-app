import {ChangeEvent, FC, useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import styled from "@emotion/styled";
import {EDataProcessingStatus, EIpbeListViewMode} from "@nxt-ui/cp/types";
import {css} from "@emotion/react";
import {IpbeListItem} from "../item";
import {useDispatch, useSelector} from "react-redux";
import {PaginationComponent} from "@nxt-ui/components";
import {ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";
import {IContainerProps} from "./types";

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

export const IpbeItemsContainer = styled("ul")<IContainerProps>`
    width: 100%;
    min-height: calc(100vh - 426px);
    box-sizing: border-box;
    ${({mode}) => (mode === EIpbeListViewMode.list ? TableContainer : CardContainer)}
`;

const GridContainer = css`
    margin-top: 15px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    page-break-inside: avoid;

    &:after {
        content: "";
        clear: both;
        display: block;
    }

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`;

export const IpbeItemsGridContainer = styled("div")<IContainerProps>`
    width: 100%;
    min-height: calc(100vh - 426px);
    box-sizing: border-box;
    ${({mode}) => (mode === EIpbeListViewMode.list ? TableContainer : GridContainer)}
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
    &:first-of-type {
        width: 335px;
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
            width: 127px;
        }
    }
    &:nth-of-type(4) {
        width: 110px;
    }
    &:nth-of-type(5) {
        width: 90px;
    }
    &:nth-of-type(6) {
        min-width: 190px;
        @media (max-width: 1400px) {
            display: none;
        }
    }
    &:last-of-type {
        width: 100%;
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
    }
`;

export const IpbeItems: FC = () => {
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

    const [screenSize, setScreenSize] = useState("xl");

    const handleResize = useCallback(() => {
        const sm = window.matchMedia("(max-width: 576px)");
        if (sm.matches) {
            setScreenSize("sm");
            return;
        }
        const md = window.matchMedia("(max-width: 992px)");
        if (md.matches) {
            setScreenSize("md");
            return;
        }
        const lg = window.matchMedia("(max-width: 1200px)");
        if (lg.matches) {
            setScreenSize("lg");
            return;
        }
        setScreenSize("xl");
    }, []);

    useLayoutEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    const Ipbes = useMemo(() => {
        const ipbes = ipbeList.map((item) => <IpbeListItem key={item.id} mode={viewMode} item={item} />);
        if (viewMode === EIpbeListViewMode.card) {
            if (screenSize === "sm") return <div style={{display: "grid", gap: "0.5rem"}}>{ipbes}</div>;

            let columnsCount = 4;
            if (screenSize === "lg") columnsCount = 3;
            if (screenSize === "md") columnsCount = 2;

            const result = [];
            for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                const columnIpbes = [];
                for (let ipbeIndex = columnIndex; ipbeIndex < ipbeList.length; ipbeIndex += columnsCount) {
                    const item = ipbeList[ipbeIndex];
                    columnIpbes.push(<IpbeListItem key={item.id} mode={viewMode} item={item} />);
                }
                result.push(
                    <div
                        key={columnIndex}
                        style={{
                            display: "grid",
                            gridTemplateRows: `repeat(${columnIpbes.length}, min-content)`,
                            rowGap: "0.5rem",
                        }}>
                        {columnIpbes}
                    </div>
                );
            }
            return <IpbeItemsGridContainer mode={viewMode}>{result}</IpbeItemsGridContainer>;
        } else {
            return <IpbeItemsContainer mode={viewMode}>{ipbes}</IpbeItemsContainer>;
        }
    }, [screenSize, ipbeList, viewMode]);

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
                    <HeaderTitle>PORTS</HeaderTitle>
                    <HeaderTitle>ACTIONS</HeaderTitle>
                </HeaderContainer>
            )}
            {Ipbes}
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
