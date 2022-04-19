import { makeDuckActionFactory } from './../../utils';
const createAction = makeDuckActionFactory('loader');

export const setLoader = createAction<boolean, 'SET_LOADER'>('SET_LOADER');
