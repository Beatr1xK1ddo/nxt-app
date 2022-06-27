import {useDispatch, useSelector} from "react-redux";
import {ChangeEvent, FC, useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import styled from "@emotion/styled";

import {EDataProcessingStatus, EListViewMode} from "@nxt-ui/cp/types";
import {PaginationComponent} from "@nxt-ui/components";

import {TxrListItem} from "../item";
import {ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";

//todo kate: move this containers to common components
const FormContainer = styled("div")`
    background: var(--bluer);
    border-radius: 8px;
    padding: 16px 8px 8px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 992px /*--q-l*/) {
        display: block;
    }
`;

const IpbesTableContainer = styled("ul")`
    width: 100%;
    min-height: calc(100vh - 426px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const IpbesCardsContainer = styled("div")`
    width: 100%;
    min-height: calc(100vh - 426px);
    margin-top: 15px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    @media (max-width: 1400px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
    > * {
        display: flex;
        flex-direction: column;
    }
`;

const PaginationContainer = styled("div")`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 8px 0;
`;

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

const HeaderTransferTitle = styled("li")`
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

export const TxrItems: FC = () => {
    const dispatch = useDispatch();

    const viewMode = useSelector(ipbeListSelectors.selectIpbeListViewMode);
    const ipbeList = useSelector(ipbeListSelectors.selectIpbeListItems);
    const ipbeListStatus = useSelector(ipbeListSelectors.selectIpbeListStatus);
    const ipbeListFilter = useSelector(ipbeListSelectors.selectIpbeListFilter);

    const [screenSize, setScreenSize] = useState("xl");

    useEffect(() => {
        if (ipbeListStatus === EDataProcessingStatus.fetchRequired) {
            dispatch(ipbeListActions.fetchIpbes(ipbeListFilter));
        }
    }, [dispatch, ipbeListFilter, ipbeListStatus]);

    const handleResize = useCallback(() => {
        const sm = window.matchMedia("(max-width: 768px)");
        if (sm.matches) {
            setScreenSize("sm");
            return;
        }
        const md = window.matchMedia("(max-width: 992px)");
        if (md.matches) {
            setScreenSize("md");
            return;
        }
        const lg = window.matchMedia("(max-width: 1400px)");
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

    const Txrs = useMemo(() => {
        const txrs = ipbeList.map((item) => <TxrListItem key={item.id} mode={viewMode} item={item} />);
        if (viewMode === EListViewMode.card) {
            if (screenSize === "sm") {
                return <div>{txrs}</div>;
            }

            let columnsCount = 4;
            if (screenSize === "lg") columnsCount = 3;
            if (screenSize === "md") columnsCount = 2;

            const result = [];
            for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                const columnIpbes = [];
                for (let ipbeIndex = columnIndex; ipbeIndex < ipbeList.length; ipbeIndex += columnsCount) {
                    const item = ipbeList[ipbeIndex];
                    columnIpbes.push(<TxrListItem key={item.id} mode={viewMode} item={item} />);
                }
                result.push(<div key={columnIndex}>{columnIpbes}</div>);
            }
            return <IpbesCardsContainer>{result}</IpbesCardsContainer>;
        } else {
            return <IpbesTableContainer>{txrs}</IpbesTableContainer>;
        }
    }, [screenSize, ipbeList, viewMode]);

    return (
        <>
            {viewMode === EListViewMode.list && (
                <HeaderContainer>
                    <HeaderTransferTitle>NAME</HeaderTransferTitle>
                    <HeaderTransferTitle>QOS</HeaderTransferTitle>
                    <HeaderTransferTitle>STATUS</HeaderTransferTitle>
                    <HeaderTransferTitle>TX</HeaderTransferTitle>
                    <HeaderTransferTitle>PROXY</HeaderTransferTitle>
                    <HeaderTransferTitle>RX</HeaderTransferTitle>
                    <HeaderTransferTitle>ACTIONS</HeaderTransferTitle>
                </HeaderContainer>
            )}
            {Txrs}
            <PaginationContainer>
                <PaginationComponent
                    page={ipbeListFilter.pagination.page}
                    count={ipbeListFilter.pagination.pagesCount}
                    onChange={() => {
                        /*NOP*/
                    }}
                />
            </PaginationContainer>
        </>
    );
};
