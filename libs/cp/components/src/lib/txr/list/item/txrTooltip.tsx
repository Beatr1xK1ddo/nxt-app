import {TooltipComponent} from "@nxt-ui/components";
import {ETXRAppType, Optional} from "@nxt-ui/cp/types";
import {useRealtimeTxrNodeData} from "@nxt-ui/cp/hooks";
import styled from "@emotion/styled";

export const Content = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
`;

export const Header = styled("div")`
    margin-left: -8px;
    margin-right: -8px;
    padding: 5px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    text-align: center;
`;

export const ColHeader = styled("div")`
    padding: 4px 0;
    text-align: center;
`;

export const Col = styled("div")`
    overflow: hidden;
`;

export const Line = styled("div")`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

export const Title = styled("div")`
    width: 70px;
`;

export const Data = styled("div")``;

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
                    <Header>Connection Statistics</Header>
                    <Content>
                        <Col>
                            <ColHeader>Connections</ColHeader>
                            <Line>
                                <Title>Source:</Title>
                                <Data>{txrData?.source ? "Yes" : "No"}</Data>
                            </Line>
                            <Line>
                                <Title>Output:</Title>
                                <Data>{txrData?.output ? "Yes" : "No"}</Data>
                            </Line>
                            <Line>
                                <Title>Connection:</Title>
                                <Data>{txrData?.connection ? "Yes" : "No"}</Data>
                            </Line>
                            <Line>
                                <Title>Connected to:</Title>
                                <Data>192.43.2.5</Data>
                                {/* <Data>{txrData?.connectedTo}</Data> */}
                            </Line>
                            <Line>
                                <Title>Latency:</Title>
                                <Data>500ms</Data>
                                {/* <Data>{txrData?.latency}ms</Data> */}
                            </Line>
                            <Line>
                                <Title>Quality:</Title>
                                <Data>34</Data>
                                {/* <Data>{txrData?.quality}</Data> */}
                            </Line>
                        </Col>
                        <Col>
                            <ColHeader>Statistics</ColHeader>
                            <Line>
                                <Title>Packets Sent</Title>
                                <Data>{txrData?.packetsSent}32</Data>
                                <Data>1</Data>
                            </Line>
                            <Line>
                                <Title>Packets Retx</Title>
                                <Data>{txrData?.packetsRetx}54</Data>
                                <Data>32</Data>
                            </Line>
                            <Line>
                                <Title>Packets Lost</Title>
                                <Data>{txrData?.packetsLost}54</Data>
                                <Data>32</Data>
                            </Line>
                            <Line>
                                <Title>Packets Late</Title>
                                <Data>{txrData?.packetsLate}54</Data>
                                <Data>32</Data>
                            </Line>
                            <Line>
                                <Title>TXR Recovered</Title>
                                <Data>{txrData?.txrRecovered}54</Data>
                                <Data>32</Data>
                            </Line>
                            <Line>
                                <Title>FEC Recovered</Title>
                                <Data>{txrData?.fexRecovered}54</Data>
                                <Data>32</Data>
                            </Line>
                            <Line>
                                <Title>P1 Sync Loss</Title>
                                <Data>{txrData?.p1SyncLoss}54</Data>
                                <Data>32</Data>
                            </Line>
                            <Line>
                                <Title>P1 CC Errors</Title>
                                <Data>{txrData?.p1CCErrors}54</Data>
                                <Data>32</Data>
                            </Line>
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
