import {IIpbeCardApiItem} from "@nxt-ui/cp/api";
import {AnyAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";
import {IFormRootState} from "../../reducers";

export type IApplicationType = {
    type?: IIpbeCardApiItem["outputType"];
    ipbeDestinations?: IIpbeCardApiItem["ipbeDestinations"];
    videoOutputIp?: IIpbeCardApiItem["videoOutputIp"];
    videoOutputPort?: IIpbeCardApiItem["videoOutputPort"];
    audioOutputIp?: IIpbeCardApiItem["audioOutputIp"];
    audioOutputPort?: IIpbeCardApiItem["audioOutputPort"];
    applicationType?: IIpbeCardApiItem["applicationType"];
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
