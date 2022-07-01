import {ChangeEvent, FC, useCallback, useLayoutEffect, useMemo, useState} from "react";
import styled from "@emotion/styled";

import {IIpbeListItem, EListViewMode, IPagination} from "@nxt-ui/cp/types";
import {PaginationComponent} from "@nxt-ui/components";
import {IIpbeListStateFilter} from "libs/cp/redux/src/lib/ipbe/list/types"
import {IpbeListItemProps} from "@nxt-ui/cp/types";


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

export const TableContainer = styled("ul")`
    width: 100%;
    min-height: calc(100vh - 426px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

export const CardsContainer = styled("div")`
    width: 100%;
    min-height: calc(100vh - 426px);
    margin-top: 15px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 576px) {
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
    padding: 8px 0;
`;


interface IAppsContainerProps {
    viewMode: EListViewMode;
    listItems: IIpbeListItem[];
    listStatus: string;
    itemComponent: React.FC<IpbeListItemProps>;
    pagination: IPagination;
    setPage: (e: ChangeEvent<unknown>, page: number) => void;
}

export const ApplicationsContainer: FC<IAppsContainerProps> = ({
    viewMode, 
    listItems, 
    pagination, 
    itemComponent: ItemComponent, 
    setPage
}) => {
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

    const Items = useMemo(() => {
        const items = listItems.map((item) => <ItemComponent key={item.id} mode={viewMode} item={item} />);
        if (viewMode === EListViewMode.card) {
            if (screenSize === "sm") {
                return <div>{items}</div>;
            }

            let columnsCount = 4;
            if (screenSize === "lg") columnsCount = 3;
            if (screenSize === "md") columnsCount = 2;

            const result = [];
            for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                const columnIpbes = [];
                for (let ipbeIndex = columnIndex; ipbeIndex < listItems.length; ipbeIndex += columnsCount) {
                    const item = listItems[ipbeIndex];
                    columnIpbes.push(<ItemComponent key={item.id} mode={viewMode} item={item} />);
                }
                result.push(<div key={columnIndex}>{columnIpbes}</div>);
            }
            return <CardsContainer>{result}</CardsContainer>;
        } else {
            return <TableContainer>{items}</TableContainer>;
        }
    }, [screenSize, listItems, viewMode]);

    return (
        <>
            {Items}
            <PaginationContainer>
                <PaginationComponent
                    page={pagination.page}
                    count={pagination.pagesCount}
                    onChange={setPage}
                />
            </PaginationContainer>
        </>
    );
};
