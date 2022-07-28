import {FC, useCallback} from "react";
import {useNavigate} from "react-router-dom";

import {Thumbnail} from "@nxt-ui/cp/components";
import {NumericId, ETXRAppType} from "@nxt-ui/cp/types";

import "./index.css";
import ProxyStatus from "../../card/proxyStatus";

type ICardTableInfoProps = {
    id: NumericId;
    name: string;
    appType: ETXRAppType;
    proxyServersIds: Array<number>;
};

export const Caption: FC<ICardTableInfoProps> = ({id, name, appType, proxyServersIds}) => {
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
                    <ProxyStatus proxyServersIds={proxyServersIds} />
                </div>
            </div>
        </div>
    );
};
