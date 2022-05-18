import {IIpbe} from "@nxt-ui/cp/api";
import {AnyAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";
import {IFormRootState} from "../../reducers";

export type IApplicationType = {
    type?: IIpbe["outputType"];
    ipbeDestinations?: IIpbe["ipbeDestinations"];
    videoOutputIp?: IIpbe["videoOutputIp"];
    videoOutputPort?: IIpbe["videoOutputPort"];
    audioOutputIp?: IIpbe["audioOutputIp"];
    audioOutputPort?: IIpbe["audioOutputPort"];
    errors?: {
        typeError: IFormRootState["errors"]["main"]["applicationTypeError"];
        videoOutputIpError: IFormRootState["errors"]["main"]["videoOutputIpError"];
        videoOutputPortError: IFormRootState["errors"]["main"]["videoOutputPortError"];
        audioOutputIpError: IFormRootState["errors"]["main"]["audioOutputIpError"];
        audioOutputPortError: IFormRootState["errors"]["main"]["audioOutputPortError"];
        ipbeDestinations: IFormRootState["errors"]["main"]["ipbeDestinations"];
    };
    dispatch?: Dispatch<AnyAction>;
};
