import {IIpbeEditAdvanced, IIpbeEditAdvancedError, IIpbeEditAdvancedState} from "./types";

export const selectIpbeEditAdvancedValues = (state: IIpbeEditAdvancedState): IIpbeEditAdvanced => state.values;
export const selectIpbeEditAdvancedErrors = (state: IIpbeEditAdvancedState): IIpbeEditAdvancedError => state.errors;
