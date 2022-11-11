import {INavigationState} from "../types";
import {createSelector} from "@reduxjs/toolkit";
import {activeNavTab} from "../utils";

export const selectNavProjects = (state: INavigationState) => state.projects;
export const selectActiveProjectsTab = createSelector(selectNavProjects, (projects) => activeNavTab(projects));

export const projects = createSelector(selectNavProjects, (projects) => projects.projects);
export const webPlayer = createSelector(selectNavProjects, (projects) => projects.webPlayer);
export const apOccasionalUse = createSelector(selectNavProjects, (projects) => projects.apOccasionalUse);
export const ap = createSelector(selectNavProjects, (projects) => projects.ap);
export const apTests = createSelector(selectNavProjects, (projects) => projects.apTests);
export const raspberry = createSelector(selectNavProjects, (projects) => projects.raspberry);
export const mags = createSelector(selectNavProjects, (projects) => projects.mags);
export const commercialDetection = createSelector(selectNavProjects, (projects) => projects.commercialDetection);
export const exportWebStream = createSelector(selectNavProjects, (projects) => projects.exportWebStream);
export const media = createSelector(selectNavProjects, (projects) => projects.media);
export const mobileMultiview = createSelector(selectNavProjects, (projects) => projects.mobileMultiview);
export const videoHub = createSelector(selectNavProjects, (projects) => projects.videoHub);
export const hlsPacketizers = createSelector(selectNavProjects, (projects) => projects.hlsPacketizers);
export const nextomeet = createSelector(selectNavProjects, (projects) => projects.nextomeet);
