import {changeStatuses, removeApplications, applicationsSlice, cloneIpbes} from "./slice";

const {setSelectedApplications, removeAllSelectedApplications, removeSelectedApplications, setAppFormStatus} =
    applicationsSlice.actions;

export {
    changeStatuses,
    removeApplications,
    setSelectedApplications,
    removeAllSelectedApplications,
    removeSelectedApplications,
    cloneIpbes,
    setAppFormStatus,
};
