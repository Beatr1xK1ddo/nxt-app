import {changeStatuses, removeApplications, applicationsSlice, cloneApplications} from "./slice";

const {setSelectedApplications, removeAllSelectedApplications, removeSelectedApplications, setAppFormStatus} =
    applicationsSlice.actions;

export {
    changeStatuses,
    removeApplications,
    setSelectedApplications,
    removeAllSelectedApplications,
    removeSelectedApplications,
    cloneApplications,
    setAppFormStatus,
};
