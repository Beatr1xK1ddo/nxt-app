import {FC, useMemo} from "react";
import "./style.scss";

export enum EMonitoringType {
    bitrate = "bitrate",
    muxrate = "muxrate",
}

const BitrateMonitoringIcon: FC<{type: EMonitoringType}> = ({type}) => {
    const color = useMemo(() => {
        return type === EMonitoringType.bitrate ? "#EA3D2F" : "#0C7E2B";
    }, [type]);
    return (
        <svg width="29" height="6" viewBox="0 0 29 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.7393 3.75C12.6344 3.53934 12.5625 3.28935 12.5625 3C12.5625 2.71065 12.6344 2.46066 12.7393 2.25H1.94328L2.17892 2.80443L2.26203 3L2.17892 3.19557L1.94328 3.75H12.7393Z"
                fill={color}
                stroke={color}
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.951956 5.11535C1.01568 5.1419 1.08887 5.11177 1.11542 5.04804L1.42775 4.29845L1.9796 2.99997L1.42792 1.70189L1.42757 1.70107L1.11542 0.95189C1.08887 0.888165 1.01568 0.858031 0.951956 0.884583C0.888231 0.911135 0.858096 0.984319 0.884648 1.04804L1.19732 1.79845L1.70796 2.99997L1.19732 4.20148L0.884648 4.95189C0.858096 5.01562 0.888231 5.0888 0.951956 5.11535Z"
                fill={color}
            />
            <path
                d="M16.2607 3.75C16.3656 3.53934 16.4375 3.28935 16.4375 3C16.4375 2.71065 16.3656 2.46066 16.2607 2.25H27.0567L26.8211 2.80443L26.738 3L26.8211 3.19557L27.0567 3.75H16.2607Z"
                fill={color}
                stroke={color}
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M28.048 5.11535C27.9843 5.1419 27.9111 5.11177 27.8846 5.04804L27.5723 4.29845L27.0204 2.99997L27.5721 1.70189L27.5724 1.70107L27.8846 0.95189C27.9111 0.888165 27.9843 0.858031 28.048 0.884583C28.1118 0.911135 28.1419 0.984319 28.1154 1.04804L27.8027 1.79845L27.292 2.99997L27.8027 4.20148L28.1154 4.95189C28.1419 5.01562 28.1118 5.0888 28.048 5.11535Z"
                fill={color}
            />
            <circle cx="15" cy="3" r="2" stroke={color} stroke-width="2" />
        </svg>
    );
};

export default BitrateMonitoringIcon;
