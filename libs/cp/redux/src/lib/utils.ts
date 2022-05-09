import {createAction, PayloadActionCreator, PrepareAction} from "@reduxjs/toolkit";

const prefix = "@NXT-UI";

export const reduxActionFactory = <A extends string>(correspondingStatePart: A) => {
    function actionFactory<PA = void, T extends string = string>(type: T): PayloadActionCreator<PA, T>;
    function actionFactory<PA extends PrepareAction<any[]>, T extends string>(
        type: T,
        prepareAction: PA
    ): PayloadActionCreator<ReturnType<PA>["payload"], T>;
    function actionFactory(action: string, prepareAction?: PrepareAction<any[]>) {
        const actionName = `${prefix}/${correspondingStatePart.toUpperCase()}/${action.toUpperCase()}`;
        if (prepareAction) {
            return createAction(actionName, prepareAction);
        } else {
            return createAction(actionName);
        }
    }
    return actionFactory;
};
