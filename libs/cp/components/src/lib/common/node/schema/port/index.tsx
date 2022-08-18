import {FC, useMemo} from "react";
import {Icon} from "@nxt-ui/icons";
import {IDeckLinkDeviceStatus} from "@nxt-ui/cp/types";
import "../index.css";
import {TooltipComponent} from "@nxt-ui/components";

interface ComponentProps {
    status?: IDeckLinkDeviceStatus;
    index?: number;
    detectedMode?: string;
    pixelFormat?: string;
}

export const NodePort: FC<ComponentProps> = ({status, index, detectedMode, pixelFormat}) => {
    const portIcon = useMemo(() => {
        switch (status) {
            case "Selected":
                return <Icon className="available" name="port1" />;
            case "Available":
                return <Icon className="free" name="port" />;
            case "Busy":
                return <span className="port-unavailable"></span>;
            case "No Signal":
                return <Icon name="port" />;
            default:
                return <Icon name="port" />;
        }
    }, [status]);

    const tooltip = useMemo(() => {
        if (!status || status === "No Signal") return "No signal";
        return `${status} ${detectedMode ? detectedMode : ""} ${pixelFormat ? pixelFormat : ""}`;
    }, [status, detectedMode, pixelFormat]);

    return (
        <TooltipComponent arrow={true} title={<div>{tooltip}</div>}>
            <div className="card-text">
                {portIcon}
                <p>{index}</p>
            </div>
        </TooltipComponent>
    );
};
