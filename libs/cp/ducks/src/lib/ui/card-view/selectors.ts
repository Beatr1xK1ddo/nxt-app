import { IRootState } from '../../types';

export const getCardViewMode = (state: IRootState) => state.ui.cardView;
