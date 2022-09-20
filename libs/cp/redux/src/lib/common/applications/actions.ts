import {changeStatuses, removeApplications, applicationsSlice} from "./slice";

const {setSelectedApplications, removeAllSelectedApplications, removeSelectedApplications} = applicationsSlice.actions;

export {
    changeStatuses,
    removeApplications,
    setSelectedApplications,
    removeAllSelectedApplications,
    removeSelectedApplications,
};
