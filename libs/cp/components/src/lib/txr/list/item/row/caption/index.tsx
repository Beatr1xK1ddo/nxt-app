import {FC, useCallback} from "react";
import {useNavigate} from "react-router-dom";

import {Thumbnail} from "@nxt-ui/cp/components";
import {TooltipComponent} from "@nxt-ui/components";
import {NumericId} from "@nxt-ui/cp/types";

import "./index.css";

type ICardTableInfoProps = {
    id: NumericId;
    name: string;
    nodeId: NumericId;
};

export const Caption: FC<ICardTableInfoProps> = ({id, name, nodeId}) => {
    const navigate = useNavigate();

    const handleIpbeNameClick = useCallback(() => {
        navigate(`/ipbe/${id}`);
    }, [id, navigate]);

    return (
        <div className="table-info-wrap">
            <Thumbnail type="ipbe" id={id} />
            <div className="table-info-left">
                <div className="card-title-holder">
                    <h4 className="card-title" onClick={handleIpbeNameClick}>
                        {name}
                    </h4>
                </div>
                <div className="transfer-info-flags">
                    <div>tstransmitter6_rtp</div>
                    <TooltipComponent
                        className="transfer-tooltip"
                        arrow={true}
                        title={
                            <p className="transfer-tooltip-title">
                                PROXY SERVER
                                <br />
                                <strong>test_dv_proxy1</strong>
                                <br />
                                209.49.221.4:10001 / 1500
                            </p>
                        }>
                        <div className="proxy-on">proxy ON</div>
                    </TooltipComponent>
                    <div className="proxy-off">proxy OFF</div>
                </div>
            </div>
        </div>
    );
};
