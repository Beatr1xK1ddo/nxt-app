import {FC} from "react";
import {useSelector} from "react-redux";

import {processingSelectors} from "@nxt-ui/cp-redux";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";

import "./index.css";

export const ProcessingContainer: FC = ({children}) => {
    const generalProcessing = useSelector(processingSelectors.selectGeneralProcessingState);

    return (
        <div className="loader-container-root">
            <div className={`loader-wrap ${generalProcessing ? "active" : ""}`}>
                <LinearProgress />
            </div>
            <div className="loader-content-block">{children}</div>
            <div className={`loader-popup ${generalProcessing ? "active" : ""}`} />
        </div>
    );
};
