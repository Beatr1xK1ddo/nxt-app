import styled from "@emotion/styled";
import {FC} from "react";
import {TsStatusIcon} from "../status-icon";
import {format} from "date-fns";
import {ITableErrorState} from "@nxt-ui/cp/types";
type ITableDrawRow = {
    data?: ITableErrorState;
};

const Column = styled.td`
    padding: 10px;

    &:first-child > div {
        display: flex;
        align-items: center;
    }

    &:not(:first-child) {
        width: 100px;
        text-align: center;
    }
`;

const Row = styled.tr`
    &:nth-child(2n) {
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
            <Column>
                <div>{date}</div>
                <div>{hours}</div>
            </Column>
            <Column>{data.errors}</Column>
        </Row>
    );
};
