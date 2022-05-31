import {ipbeEditMainFormSlice} from "./slice";

const {
    changeName,
    changeCompany,
    changeNode,
    changeVideoConnection,
    changeEncoder,
    changeApplication,
    changeInputFormat,
    changeOutputType,
    changeLatency,
    changeVideoOutputIp,
    changeAudioOutputIp,
    changeOutputIp,
    changeVideoOutputPort,
    changeAudioOutputPort,
    changeOutputPort,
    changeTtl,
    changeSDIDevice,
    addIpbeDestination,
    deleteIpbeDestination,
} = ipbeEditMainFormSlice.actions;

export {
    changeName,
    changeCompany,
    changeNode,
    addIpbeDestination,
    changeVideoConnection,
    changeEncoder,
    changeApplication,
    changeInputFormat,
    changeOutputType,
    changeLatency,
    changeVideoOutputIp,
    changeAudioOutputIp,
    changeOutputIp,
    changeVideoOutputPort,
    changeAudioOutputPort,
    changeOutputPort,
    changeTtl,
    changeSDIDevice,
    deleteIpbeDestination,
};
