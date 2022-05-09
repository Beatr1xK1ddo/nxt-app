import {IIpbeCardApiItem} from "@nxt-ui/cp/api";

export type IApplicationType = {
    type?: IIpbeCardApiItem["applicationType"];
    ipbeDestinations?: IIpbeCardApiItem["ipbeDestinations"];
    videoOutputIp?: IIpbeCardApiItem["videoOutputIp"];
    videoOutputPort?: IIpbeCardApiItem["videoOutputPort"];
    audioOutputIp?: IIpbeCardApiItem["audioOutputIp"];
    audioOutputPort?: IIpbeCardApiItem["audioOutputPort"];
};
