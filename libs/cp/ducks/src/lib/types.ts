import { IFilterState } from './filter/types';
import { IUiState } from './ui/types';

export interface IRootState {
    ui: IUiState;
    filter: IFilterState;
}
