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
    border-spacing: 10px 0;
    .MuiTreeItem-label {
      
        font-size: calc(var(--fz) - 2px);
    }
    .accordion-monitoring .MuiAccordionSummary-content {
        font-family: var(--osc-bold) !important;
        font-size: calc(var(--fz) - 2px);
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
                {keys.map((key) => (
                    <TableRow data={values[key]} />
                ))}
            </MonitoringContainer>
        </Accordion>
    );
};
