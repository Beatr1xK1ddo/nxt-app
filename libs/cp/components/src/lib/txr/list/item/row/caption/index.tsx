import {FC, useCallback} from "react";
import {useNavigate} from "react-router-dom";

import {Thumbnail} from "@nxt-ui/cp/components";
import {NumericId, ETXRAppType, Optional} from "@nxt-ui/cp/types";
import TxrTooltip from "../../txrTooltip";

import "./index.css";
import ProxyStatus from "../../card/proxyStatus";
import styled from "@emotion/styled";

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

type ICardTableInfoProps = {
    id: NumericId;
    name: string;
    appType: ETXRAppType;
    proxyServersIds: Array<number>;
    rxNodeId: Optional<number>;
};

export const Caption: FC<ICardTableInfoProps> = ({id, name, appType, proxyServersIds, rxNodeId}) => {
    const navigate = useNavigate();

    const handletxrNameClick = useCallback(() => {
        navigate(`/txr/${id}`);
    }, [id, navigate]);

    return (
        <div className="table-info-wrap">
            <Thumbnail type="txr" id={id} />
            <div className="table-info-left">
                <div className="card-title-holder">
                    <h4 className="card-title" onClick={handletxrNameClick}>
                        {name}
                    </h4>
                </div>
                <div className="transfer-info-flags">
                    {appType === ETXRAppType.txr7 ? (
                        <TxrTooltip appType={appType} rxNodeId={rxNodeId} />
                    ) : (
                        <AppType>{appType}</AppType>
                    )}
                    <ProxyStatus proxyServersIds={proxyServersIds} />
                </div>
            </div>
        </div>
    );
};
