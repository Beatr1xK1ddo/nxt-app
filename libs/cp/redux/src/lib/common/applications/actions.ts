import {changeStatuses, removeApplications, applicationsSlice, cloneIpbes} from "./slice";

const {setSelectedApplications, removeAllSelectedApplications, removeSelectedApplications} = applicationsSlice.actions;

export {
    changeStatuses,
    removeApplications,
    setSelectedApplications,
    removeAllSelectedApplications,
    removeSelectedApplications,
    cloneIpbes,
};
