import styled from "@emotion/styled";
import {ITableErrorState} from "@nxt-ui/ts-monitoring/types";
import {FC} from "react";
import {TsStatusIcon} from "../status-icon";
import {format} from "date-fns";
type ITableDrawRow = {
    data?: ITableErrorState;
};

const Column = styled.td`
    padding: 10px;

    &:first-child > div {
        display: flex;
        align-items: center;
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

    const date = format(new Date(), "yyyy-MM-dd");
    const hours = format(new Date(), "HH:mm:ss");

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
