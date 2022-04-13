import {
    createAction,
    PayloadActionCreator,
    PrepareAction,
} from '@reduxjs/toolkit';

const prefix = '@nxt-ui';

export const makeDuckActionFactory = <D extends string>(duckName: D) => {
    function actionFactory<PA = void, T extends string = string>(
        type: T
    ): PayloadActionCreator<PA, T>;
    function actionFactory<PA extends PrepareAction<any>, T extends string>(
        type: T,
        prepareAction: PA
    ): PayloadActionCreator<ReturnType<PA>['payload'], T>;

    function actionFactory(type: string, prepareAction?: PrepareAction<any>) {
        const actionName = `${prefix}/${duckName.toLocaleLowerCase()}/${type.toUpperCase()}`;
        return createAction(actionName, prepareAction!);
    }

    return actionFactory;
};
