import {FC, useCallback} from "react";
import {useNavigate} from "react-router-dom";

import {Thumbnail} from "@nxt-ui/cp/components";
import {TooltipComponent} from "@nxt-ui/components";
import {NumericId, ETXRAppType} from "@nxt-ui/cp/types";

import "./index.css";

type ICardTableInfoProps = {
    id: NumericId;
    name: string;
    appType: ETXRAppType;
};

export const Caption: FC<ICardTableInfoProps> = ({id, name, appType}) => {
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
                    <div>{appType}</div>
                    <TooltipComponent
                        className="transfer-tooltip"
                        arrow={true}
                        title={
                            // Wainting data for PROXY
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
