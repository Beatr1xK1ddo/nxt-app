import {IIpbe} from "@nxt-ui/cp/api";

export type IApplicationType = {
    type?: IIpbe["applicationType"];
    ipbeDestinations?: IIpbe["ipbeDestinations"];
    videoOutputIp?: IIpbe["videoOutputIp"];
    videoOutputPort?: IIpbe["videoOutputPort"];
    audioOutputIp?: IIpbe["audioOutputIp"];
    audioOutputPort?: IIpbe["audioOutputPort"];
};
