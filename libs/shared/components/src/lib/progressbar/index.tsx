import {Icon} from "@nxt-ui/icons";
import "./index.css";

export function CircularProgressWithLabel(props: {value: number}) {
    return (
        <div className="progressbar">
            <Icon name="qos" {...props} />
            <div className="progress-info">
                QOS
                <strong>{`${Math.round(props.value)}`}</strong>
            </div>
        </div>
    );
}
