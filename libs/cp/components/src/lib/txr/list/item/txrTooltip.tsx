import {TooltipComponent} from "@nxt-ui/components";
import {ETXRAppType, Optional} from "@nxt-ui/cp/types";
import {useRealtimeTxrNodeData} from "@nxt-ui/cp/hooks";
import styled from "@emotion/styled";

export const AppType = styled("span")`
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin: 0 0.25rem 0 0;
    padding: 0.125rem 0.75rem;
    border-radius: 0.8125rem;
    font: 400 calc(var(--fz) - 0.25rem) var(--osc);
    color: var(--blacked);
    line-height: var(--fz) + 0.125rem;
    height: 1rem;
    background: var(--caution);
`;

export const TooltipContent = styled("div")`
    > h2 {
        margin: 0 0 1.5rem;
    }
    > ul {
        margin: 0 0 0.25rem 8.25rem;
        overflow: hidden;
        font-weight: 500;
        color: var(--grey-dark);
        li {
            float: left;
            width: 4.125rem;
            margin: 0 0.3125rem 0 0;
            &:last-child {
                margin: 0;
            }
        }
        + dl {
            dd {
                width: 4.125rem;
                margin: 0 0.3125rem 0 0;
            }
        }
    }
    dl {
        display: block !important;
        overflow: hidden;
        font-size: calc(var(--fz) - 0.25rem);
        line-height: calc(var(--fz) + 0.25rem);
        margin: 0 0 1.25rem;
        &:last-child {
            margin: 0;
        }
        dt {
            float: left;
            clear: left;
            font-weight: 600;
            min-width: 7.5rem;
            margin: 0 0.75rem 0 0 !important;
        }
        dd {
            float: left;
            font-weight: 300;
        }
    }
`;

type Props = {
    appType: ETXRAppType;
    rxNodeId: Optional<number>;
};

const TxrTooltip = ({appType, rxNodeId}: Props) => {
    const {txrData} = useRealtimeTxrNodeData(rxNodeId);
    return (
        <TooltipComponent
            className="transfer-tooltip white-tooltip"
            arrow={true}
            title={
                <TooltipContent>
                    <h2>Connection Statistics</h2>
                    <dl>
                        <dt>Start Time</dt>
                        <dd>2022-08-03 14:05-04:00</dd>
                        <dt>Source</dt>
                        <dd>{txrData?.source ? "Yes" : "No"}</dd>
                        <dt>Output</dt>
                        <dd>{txrData?.output ? "Yes" : "No"}</dd>
                        <dt>Connection</dt>
                        <dd>{txrData?.connection ? "Yes" : "No"}</dd>
                        <dt>Connected to</dt>
                        <dd>
                            192.43.2.5
                            {/* {txrData?.connectedTo} */}
                        </dd>
                        <dt>RTT</dt>
                        <dd>0</dd>
                        <dt>Latency</dt>
                        <dd>
                            1000ms
                            {/* <Data>{txrData?.quality}</Data> */}
                        </dd>
                        <dt>Quality</dt>
                        <dd>
                            100%
                            {/* {txrData?.quality} */}
                        </dd>
                        <dt>Connection type</dt>
                        <dd>direct</dd>
                    </dl>
                    <ul>
                        <li>PAST 60S</li>
                        <li>TOTAL</li>
                    </ul>
                    <dl>
                        <dt>Packets Sent</dt>
                        <dd>7509</dd>
                        <dd>Total</dd>
                        <dt>Packets Lost</dt>
                        <dd>0</dd>
                        <dd>9036439</dd>
                        <dt>Packets Retx</dt>
                        <dd>0</dd>
                        <dd>13948</dd>
                        <dt>Packets Late</dt>
                        <dd>0</dd>
                        <dd>60</dd>
                        <dt>TXR Recovered</dt>
                        <dd>0</dd>
                        <dd>2756</dd>
                        <dt>FEC Recovered</dt>
                        <dd>0</dd>
                        <dd>122</dd>
                        <dt>P1 Sync Loss</dt>
                        <dd>0</dd>
                        <dd>0</dd>
                        <dt>P1 CC Errors</dt>
                        <dd>0</dd>
                        <dd>0</dd>
                    </dl>
                </TooltipContent>
            }>
            <AppType>{appType}</AppType>
        </TooltipComponent>
    );
};

export default TxrTooltip;
