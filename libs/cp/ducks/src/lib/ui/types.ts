import { ICardViewState } from './card-view/types';
import { ILoaderState } from './loader/types';

export * from './card-view/types';
export * from './loader/types';

export type IUiState = {
    cardView: ICardViewState;
    loaders: ILoaderState;
};
