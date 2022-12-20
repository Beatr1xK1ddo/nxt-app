import {changeStatuses, removeApplications, applicationsSlice, cloneApplications} from "./slice";

const {setSelectedApplications, removeAllSelectedApplications, removeSelectedApplications, setAppFormChangedStatus} =
    applicationsSlice.actions;

export {
    changeStatuses,
    removeApplications,
    setSelectedApplications,
    removeAllSelectedApplications,
    removeSelectedApplications,
    cloneApplications,
    setAppFormChangedStatus,
};
