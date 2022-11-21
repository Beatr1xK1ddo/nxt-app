import styled from "@emotion/styled";
import {FC} from "react";
import {TsStatusIcon} from "../status-icon";
import {format} from "date-fns";
import {ITableErrorState} from "@nxt-ui/cp/types";
type ITableDrawRow = {
    data?: ITableErrorState;
};

const Column = styled.td`
    padding: 1px 3px;
    font-weight: 100;
    &:first-of-type {
        width: 200px;
    }

    &:first-of-type > div {
        display: flex;
        align-items: center;
    }

    &:nth-of-type(2) {
        width: 80px;
        text-align: center;
    }

    &:not(:first-of-type) {
        text-align: left;
    }
`;

const Row = styled.tr`
    &:nth-of-type(2n) {
        background: #eef5ff;
    }
`;

export const TableRow: FC<ITableDrawRow> = ({data}) => {
    if (!data) {
        return null;
    }

    const date = data.time ? format(new Date(data.time * 1000), "yyyy-MM-dd") : "-";
    const hours = data.time ? format(new Date(data.time * 1000), "HH:mm:ss") : null;

    return (
        <Row>
            <Column>
                <div>
                    <TsStatusIcon error={data.error ? 1 : 0} />
                    {data.name}
                </div>
            </Column>
            <Column>{data.errors}</Column>
            <Column>
                <div>{date && hours ? `${date} ${hours}` : "-"}</div>
                <div>{data.description}</div>
            </Column>
        </Row>
    );
};
