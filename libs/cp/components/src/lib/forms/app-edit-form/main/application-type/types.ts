import {IIpbe} from "@nxt-ui/cp/api";
import {AnyAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";
import {IMainProps} from "../../types";

export type IApplicationType = {
    type?: IIpbe["applicationType"];
    ipbeDestinations?: IIpbe["ipbeDestinations"];
    videoOutputIp?: IIpbe["videoOutputIp"];
    videoOutputPort?: IIpbe["videoOutputPort"];
    audioOutputIp?: IIpbe["audioOutputIp"];
    audioOutputPort?: IIpbe["audioOutputPort"];
    errors: IMainProps["main"]["ipbeDestinationsError"];
    dispatch?: Dispatch<AnyAction>;
};
