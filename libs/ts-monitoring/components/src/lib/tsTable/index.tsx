import styled from "@emotion/styled";
import {Optional} from "@nxt-ui/cp/types";
import {IP1ErrorMapped, IP2ErrorMapped} from "@nxt-ui/ts-monitoring/types";
import {FC, useMemo} from "react";
import {TableRow} from "./row";
import {Accordion} from "@nxt-ui/components";

type ITsMonitoring = {
    header: string;
    values: Optional<IP1ErrorMapped | IP2ErrorMapped>;
};

const MonitoringContainer = styled.table`
    width: 100%;
    table-layout: fixed;
    border-spacing: 10px 0;
`;

export const MonitoringTable: FC<ITsMonitoring> = ({values, header}) => {
    const keys = useMemo(() => (values ? (Object.keys(values) as Array<keyof typeof values>) : []), [values]);

    if (!values) {
        return null;
    }

    return (
        <Accordion header={header} defaultExpanded sx={{width: "fit-content"}} active>
            <MonitoringContainer>
                <tbody>
                    {keys.map((key) => (
                        <TableRow data={values[key]} />
                    ))}
                </tbody>
            </MonitoringContainer>
        </Accordion>
    );
};
