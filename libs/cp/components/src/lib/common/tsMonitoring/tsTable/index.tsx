import styled from "@emotion/styled";
import {IP1ErrorMapped, IP2ErrorMapped, Optional} from "@nxt-ui/cp/types";
import {FC, ReactElement, useMemo} from "react";
import {TableRow} from "./row";
import {Accordion} from "@nxt-ui/components";

type ITsMonitoring = {
    header: string | ReactElement;
    values: Optional<IP1ErrorMapped | IP2ErrorMapped>;
};

const MonitoringContainer = styled.table`
    width: 100%;
    table-layout: fixed;
    border-spacing: 0.625rem 0;
    .accordion-monitoring .MuiAccordionSummary-content {
        font-family: var(--osc-bold) !important;
        font-size: calc(var(--fz) - 0.125rem);
    }
    .MuiAccordionSummary-expandIconWrapper {
        color: var(--blacked);
    }
`;

export const MonitoringTable: FC<ITsMonitoring> = ({values, header}) => {
    const keys = useMemo(() => (values ? (Object.keys(values) as Array<keyof typeof values>) : []), [values]);

    if (!values) {
        return null;
    }

    return (
        <Accordion className="accordion-monitoring" header={header} defaultExpanded active>
            <MonitoringContainer>
                <tbody>
                    {keys.map((key) => (
                        <TableRow key={key} data={values[key]} />
                    ))}
                </tbody>
            </MonitoringContainer>
        </Accordion>
    );
};
