import {TooltipComponent} from "@nxt-ui/components";
import {ETXRAppType, Optional} from "@nxt-ui/cp/types";
import {useRealtimeTxrNodeData} from "@nxt-ui/cp/hooks";
import styled from "@emotion/styled";

export const Content = styled("div")`
    width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const Col = styled("div")`
    width: 50%;
    overflow: hidden;
`;

export const AppType = styled("span")`
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin: 0 4px 0 0;
    padding: 2px 12px;
    border-radius: 13px;
    font: 400 calc(var(--fz) - 4px) var(--osc);
    color: var(--blacked);
    line-height: var(--fz) + 2px;
    height: 16px;
    background: var(--caution);
`;

type Props = {
    appType: ETXRAppType;
    rxNodeId: Optional<number>;
};

const TxrTooltip = ({appType, rxNodeId}: Props) => {
    const {txrData} = useRealtimeTxrNodeData(rxNodeId);
    return (
        <TooltipComponent
            className="transfer-tooltip"
            arrow={true}
            title={
                <div>
                    <Content>
                        <Col>
                            <p>Source: {txrData?.source ? "Yes" : "No"}</p>
                            <p>Output: {txrData?.output ? "Yes" : "No"}</p>
                            <p>Connection: {txrData?.connection ? "Yes" : "No"}</p>
                            <p>Connected to: {txrData?.connectedTo}</p>
                            {/* <p>Connection type: {txrData?.connectedType}</p> */}
                            <p>RTT: {txrData?.rtt}</p>
                            <p>Latency: {txrData?.latency}ms</p>
                            <p>Quality: {txrData?.quality}</p>
                        </Col>
                        <Col>
                            <p>Packets Sent: {txrData?.packetsSent}</p>
                            <p>Packets Retx: {txrData?.packetsRetx}</p>
                            <p>Packets Lost: {txrData?.packetsLost}</p>
                            <p>Packets Late: {txrData?.packetsLate}</p>
                            <p>TXR Recovered: {txrData?.txrRecovered}</p>
                            <p>FEC Recovered: {txrData?.fexRecovered}</p>
                            <p>P1 Sync Loss: {txrData?.p1SyncLoss}</p>
                            <p>P1 CC Errors: {txrData?.p1CCErrors}</p>
                        </Col>
                    </Content>
                </div>
            }
        >
            <AppType>{appType}</AppType>
        </TooltipComponent>
    );
};

export default TxrTooltip;
