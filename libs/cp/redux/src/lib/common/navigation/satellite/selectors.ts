import {INavigationState} from "../types";
import {createSelector} from "@reduxjs/toolkit";

export const selectNavSatellite = (state: INavigationState) => state.satellite;

export const satellite = createSelector(selectNavSatellite, (satellite) => satellite.satellite);
export const terrestrial = createSelector(selectNavSatellite, (satellite) => satellite.terrestrial);
export const mcr = createSelector(selectNavSatellite, (satellite) => satellite.mcr);
export const gsr = createSelector(selectNavSatellite, (satellite) => satellite.gsr);
export const ird = createSelector(selectNavSatellite, (satellite) => satellite.ird);
export const rfScan = createSelector(selectNavSatellite, (satellite) => satellite.rfScan);
