//selectors
import {IProcessingState} from "./types";

export const selectGeneralProcessingState = (state: IProcessingState) => state.generalProcessing;
export const selectBackgroundProcessingState = (state: IProcessingState) => state.backgroundProcessing;
