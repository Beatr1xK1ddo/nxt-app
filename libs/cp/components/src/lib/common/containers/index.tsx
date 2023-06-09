import {ChangeEvent, FC, useCallback, useLayoutEffect, useMemo, useState} from "react";
import styled from "@emotion/styled";

import {EListViewMode, IPagination} from "@nxt-ui/cp/types";
import {PaginationComponent} from "@nxt-ui/components";
import {ListItemProps} from "@nxt-ui/cp/types";

export const FormContainer = styled("div")`
    background: var(--bluer);
    border-radius: 0.5rem;
    padding: 1rem 0.5rem 0.5rem;
    display: flex;
    justify-content: space-between;
    @media (max-width: 62rem /*--q-l*/) {
        display: block;
    }
`;

export const TableContainer = styled("ul")`
    width: 100%;
    min-height: calc(100vh - 26.625rem);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

export const CardsContainer = styled("div")`
    width: 100%;
    min-height: calc(100vh - 26.625rem);
    margin-top: 0.9375rem;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;

    @media (max-width: 130rem) {
        grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 90rem) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 75rem) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 62rem) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 36rem) {
        grid-template-columns: 1fr;
    }
    > * {
        display: flex;
        flex-direction: column;
    }
`;

export const PaginationContainer = styled("div")`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
`;

export const EmptyContainer = styled("div")`
    width: 100%;
    min-height: calc(100vh - 26.625rem);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    padding: 0.5rem 0;
`;

interface IAppsContainerProps {
    viewMode: EListViewMode;
    listItems: any[];
    listStatus: string;
    itemComponent: React.FC<ListItemProps>;
    pagination: IPagination;
    setPage: (e: ChangeEvent<unknown>, page: number) => void;
}

export const ApplicationsContainer: FC<IAppsContainerProps> = ({
    viewMode,
    listItems,
    pagination,
    itemComponent: ItemComponent,
    setPage,
}) => {
    const [screenSize, setScreenSize] = useState("xl");

    const handleResize = useCallback(() => {
        const sm = window.matchMedia("(max-width: 36rem)");
        if (sm.matches) {
            setScreenSize("sm");
            return;
        }
        const md = window.matchMedia("(max-width: 62rem)");
        if (md.matches) {
            setScreenSize("md");
            return;
        }
        const lg = window.matchMedia("(max-width: 75rem)");
        if (lg.matches) {
            setScreenSize("lg");
            return;
        }
        const xl = window.matchMedia("(max-width: 90rem)");
        if (xl.matches) {
            setScreenSize("xl");
            return;
        }
        const xxl = window.matchMedia("(max-width: 130rem)");
        if (xxl.matches) {
            setScreenSize("xxl");
            return;
        }
        setScreenSize("xxxl");
    }, []);

    useLayoutEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    const Items = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (listItems.length === 0) return null;
        const items = listItems.map((item) => <ItemComponent key={item.id} mode={viewMode} item={item} />);
        if (viewMode === EListViewMode.card) {
            if (screenSize === "sm") {
                return <div>{items}</div>;
            }

            let columnsCount = 6;
            if (screenSize === "xxl") columnsCount = 5;
            if (screenSize === "xl") columnsCount = 4;
            if (screenSize === "lg") columnsCount = 3;
            if (screenSize === "md") columnsCount = 2;

            const result = [];
            for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                const columnIpbes = [];
                for (let ipbeIndex = columnIndex; ipbeIndex < listItems.length; ipbeIndex += columnsCount) {
                    const item = listItems[ipbeIndex];
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    columnIpbes.push(<ItemComponent key={item.id} mode={viewMode} item={item} />);
                }
                result.push(<div key={columnIndex}>{columnIpbes}</div>);
            }
            return <CardsContainer>{result}</CardsContainer>;
        } else {
            return <TableContainer>{items}</TableContainer>;
        }
    }, [listItems, viewMode, ItemComponent, screenSize]);

    return (
        <>
            {listItems.length === 0 && <EmptyContainer>No applications available.</EmptyContainer>}
            {Items}
            {!!listItems.length && (
                <PaginationContainer>
                    <PaginationComponent page={pagination.page} count={pagination.pagesCount} onChange={setPage} />
                </PaginationContainer>
            )}
        </>
    );
};
