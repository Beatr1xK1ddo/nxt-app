import api, {
    IEmailDelivery,
    INotificationApp,
    INotificationAppType,
    INotificationEmploye,
    INotificationMessageType,
    INotificationRuleApi,
    ISlackDelivery,
    ISmsDelivery,
    IUserIdDelivery,
} from "@nxt-ui/cp/api";
import {ENotificationDeliveryChannel, ENotificationType, Optional} from "@nxt-ui/cp/types";
import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {notificationsActions} from "../../common/notifications";
import {commonActions, ICpRootState} from "../../types";
import {
    INotificationErrorState,
    INotificationForm,
    isIEmailDelivery,
    isISlackDelivery,
    isISmsDelivery,
    isIUserIdDelivery,
} from "./types";
import {createNotificationApiMapper, dateFormat, fetchNotificationApiMapper, validatNotification} from "./utils";

export const NOTIFICATION_FORM = "form";

export const getNotificationsRule = createAsyncThunk(`${NOTIFICATION_FORM}/getItem`, async (ruleId: string) => {
    return await api.notifications.fetchNotificationRule(ruleId);
});

export const createNotification = createAsyncThunk(
    `${NOTIFICATION_FORM}/createNotification`,
    async (_, {getState, rejectWithValue, dispatch}) => {
        const state = getState() as ICpRootState;
        const {valid, message} = validatNotification(state.notifications.form.values);
        if (valid) {
            const mapped = createNotificationApiMapper(
                state.notifications.form.values,
                state.notifications.form.errors,
                state.notifications.form.messageTypes.ids.length,
                state.common.user.user?.email
            );
            console.log("mapped ", mapped);
            if (!mapped.error && mapped.data) {
                dispatch(commonActions.applicationActions.setAppFormChangedStatus(false));
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore todo: damn ts build bug
                    return await api.notifications.postNotification(mapped.data);
                } catch (e) {
                    dispatch(commonActions.applicationActions.setAppFormChangedStatus(true));
                    const message = "An error occured while creating notification";
                    dispatch(notificationsActions.add({message, type: ENotificationType.error}));
                    return rejectWithValue(null);
                }
            } else {
                dispatch(commonActions.applicationActions.setAppFormChangedStatus(true));
                return rejectWithValue(mapped.errors);
            }
        } else {
            dispatch(notificationsActions.add({message, type: ENotificationType.error}));
            return rejectWithValue(null);
        }
    }
);

export const fetchNotificationAppTypes = createAsyncThunk(
    `${NOTIFICATION_FORM}/fetchNotificationAppTypes`,
    async (nodeId: Optional<number>, {rejectWithValue}) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            return await api.notifications.fetchNotificationAppTypes(nodeId);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const fetchNotificationEmploye = createAsyncThunk(
    `${NOTIFICATION_FORM}/fetchNotificationEmploye`,
    async (companyId: Optional<number>, {rejectWithValue}) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            return await api.notifications.fetchNotificationEmploye(companyId);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const fetchNotificationApps = createAsyncThunk(
    `${NOTIFICATION_FORM}/fetchNotificationApps`,
    async ({appType, nodeId}: {appType?: string; nodeId?: number}, {rejectWithValue}) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            return await api.notifications.fetchNotificationApps(appType, nodeId);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const fetchNotificationMessageTypes = createAsyncThunk(
    `${NOTIFICATION_FORM}/fetchNotificationMessageTypes`,
    async (_, {rejectWithValue}) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            return await api.notifications.fetchNotificationMessageTypes();
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const appTypesAdapter = createEntityAdapter<INotificationAppType>({
    selectId: (appType) => appType.type,
    sortComparer: (a, b) => a.title.localeCompare(b.type),
});
export const employesAdapter = createEntityAdapter<INotificationEmploye>();
export const appsAdapter = createEntityAdapter<INotificationApp>();
export const messageTypesAdapter = createEntityAdapter<INotificationMessageType>({
    selectId: (messageTypes) => messageTypes.name,
});

const initialState: INotificationForm = {
    values: {
        where: {
            nodeId: null,
            appType: null,
            apps: null,
        },
        whome: {
            company: null,
            employe: null,
        },
        filter: {
            type: "and",
            priority: [6],
            manualSelection: [],
            keyWords: "",
        },
        dayTime: {
            weekdays: [],
            timerange: {
                start: "",
                end: "",
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        deliveryChannel: {
            type: null,
            value: null,
        },
        ruleName: "",
        enabled: true,
    },
    errors: null,
    appTypes: appTypesAdapter.getInitialState(),
    employes: employesAdapter.getInitialState(),
    apps: appsAdapter.getInitialState(),
    messageTypes: messageTypesAdapter.getInitialState(),
};

export const userNotificationsFormSlice = createSlice({
    name: `${NOTIFICATION_FORM}`,
    initialState,
    reducers: {
        setCopy(state, action: PayloadAction<INotificationRuleApi>) {
            const values = messageTypesAdapter
                .getSelectors((state: INotificationForm) => state.messageTypes)
                .selectAll(state);
            state.values = fetchNotificationApiMapper(action.payload, values);
            state.values.id = undefined;
        },
        setName(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.ruleName = payload;
            if (state.errors?.ruleName?.error) {
                delete state.errors.ruleName;
            }
        },
        setNode(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.where.nodeId = payload;
        },
        setAppType(state, action: PayloadAction<Optional<string>>) {
            const {payload} = action;
            state.values.where.appType = payload;
        },
        setApps(state, action: PayloadAction<Optional<number>>) {
            const {payload} = action;
            state.values.where.apps = payload;
        },
        setCompany(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.whome.company = payload;
        },
        setEmploye(state, action: PayloadAction<Optional<number>>) {
            const {payload} = action;
            state.values.whome.employe = payload;
        },
        setPriority(state, action: PayloadAction<Array<number>>) {
            const {payload} = action;
            if (!payload.length) {
                return;
            }
            if (action.payload[0] === 6 && action.payload.length > 1) {
                state.values.filter.priority = payload.filter((item) => typeof item === "number" && item !== 6);
            } else if (action.payload.includes(6)) {
                state.values.filter.priority = payload.filter((item) => item === 6);
            } else if (action.payload[0] === 1337 && action.payload.length > 1) {
                state.values.filter.priority = payload.filter((item) => item !== 1337);
            } else if (action.payload.includes(1337)) {
                state.values.filter.priority = payload.filter((item) => item === 1337);
            } else {
                state.values.filter.priority = payload.filter((item) => typeof item === "number");
            }
        },
        selectAll(state) {
            if (state.values.filter.manualSelection.length === state.messageTypes.ids.length) {
                state.values.filter.manualSelection = [];
            } else {
                const values = messageTypesAdapter
                    .getSelectors((state: INotificationForm) => state.messageTypes)
                    .selectAll(state);
                state.values.filter.manualSelection = values;
            }
        },
        setEnabled(state) {
            state.values.enabled = !state.values.enabled;
        },
        setManualSelectionBool(state, action: PayloadAction<string>) {
            const {payload} = action;
            const values = messageTypesAdapter
                .getSelectors((state: INotificationForm) => state.messageTypes)
                .selectAll(state);
            const elem = values.find((item) => item.name === payload);
            if (elem) {
                const alreadyExist = state.values.filter.manualSelection.find((item) => item.name === elem.name);
                if (alreadyExist) {
                    state.values.filter.manualSelection = state.values.filter.manualSelection.filter(
                        (item) => item.name !== elem.name
                    );
                } else {
                    state.values.filter.manualSelection.push(elem);
                }
            }
        },
        setDayTimeDay(state, action: PayloadAction<string>) {
            if (state.values.dayTime.weekdays.includes(action.payload)) {
                state.values.dayTime.weekdays = state.values.dayTime.weekdays.filter((item) => item !== action.payload);
            } else {
                state.values.dayTime.weekdays.push(action.payload);
            }
        },
        setStartTime(state, action: PayloadAction<Optional<string>>) {
            state.values.dayTime.timerange.start = action.payload;
            if (action.payload) {
                if (state.values.dayTime.timerange.end) {
                    const startDate = new Date(action.payload);
                    const endDate = new Date(state.values.dayTime.timerange.end);
                    if (startDate > endDate) {
                        state.errors = {
                            ...state.errors,
                            dayTime: {
                                timeStart: {
                                    error: true,
                                    helperText: "Start time can not be greater than end time",
                                },
                            },
                        };
                        return;
                    } else if (+startDate === +endDate) {
                        state.errors = {
                            ...state.errors,
                            dayTime: {
                                ...state.errors?.dayTime,
                                timeStart: {
                                    error: true,
                                    helperText: "Start time can not be equal end time",
                                },
                            },
                        };
                        return;
                    } else {
                        if (state.errors?.dayTime?.timeStart) {
                            delete state.errors?.dayTime.timeStart;
                        }
                        if (state.errors?.dayTime?.timeEnd) {
                            delete state.errors?.dayTime.timeEnd;
                        }
                    }
                }
                const time = dateFormat(action.payload);
                const [hours, minuts] = time.split(":");
                const intHours = parseInt(hours);
                const intMinutes = parseInt(minuts);
                if (isNaN(intHours) || isNaN(intMinutes)) {
                    state.errors = {
                        ...state.errors,
                        dayTime: {
                            ...state.errors?.dayTime,
                            timeStart: {
                                error: true,
                                helperText: "Incorrect time",
                            },
                        },
                    };
                } else if (state.errors?.dayTime?.timeStart) {
                    delete state.errors?.dayTime.timeStart;
                }
            } else {
                if (state.errors?.dayTime?.timeStart) {
                    delete state.errors?.dayTime.timeStart;
                }
                if (state.errors?.dayTime?.timeEnd) {
                    delete state.errors?.dayTime.timeEnd;
                }
            }
        },
        setEndTime(state, action: PayloadAction<Optional<string>>) {
            state.values.dayTime.timerange.end = action.payload;
            if (action.payload) {
                if (state.values.dayTime.timerange.start) {
                    const startDate = new Date(state.values.dayTime.timerange.start);
                    const endDate = new Date(action.payload);
                    if (startDate > endDate) {
                        state.errors = {
                            ...state.errors,
                            dayTime: {
                                ...state.errors?.dayTime,
                                timeStart: {
                                    error: true,
                                    helperText: "Start time can not be greater than end time",
                                },
                            },
                        };
                        return;
                    } else if (+startDate === +endDate) {
                        state.errors = {
                            ...state.errors,
                            dayTime: {
                                ...state.errors?.dayTime,
                                timeStart: {
                                    error: true,
                                    helperText: "Start time can not be equal end time",
                                },
                            },
                        };
                        return;
                    } else {
                        if (state.errors?.dayTime?.timeStart) {
                            delete state.errors?.dayTime.timeStart;
                        }
                        if (state.errors?.dayTime?.timeEnd) {
                            delete state.errors?.dayTime.timeEnd;
                        }
                    }
                }
                const time = dateFormat(action.payload);
                const [hours, minuts] = time.split(":");
                const intHours = parseInt(hours);
                const intMinutes = parseInt(minuts);
                if (isNaN(intHours) || isNaN(intMinutes)) {
                    state.errors = {
                        ...state.errors,
                        dayTime: {
                            ...state.errors?.dayTime,
                            timeEnd: {
                                error: true,
                                helperText: "Incorrect time",
                            },
                        },
                    };
                } else if (state.errors?.dayTime?.timeEnd) {
                    delete state.errors?.dayTime.timeEnd;
                }
            } else {
                if (state.errors?.dayTime?.timeEnd) {
                    delete state.errors?.dayTime.timeEnd;
                }
                if (state.errors?.dayTime?.timeStart) {
                    delete state.errors?.dayTime.timeStart;
                }
            }
        },
        setOutputType(state, action: PayloadAction<ENotificationDeliveryChannel>) {
            if (state.errors?.deliveryChannel?.type?.error) {
                delete state.errors?.deliveryChannel.type;
            }
            state.values.deliveryChannel.type = action.payload;
            if (action.payload === ENotificationDeliveryChannel.email) {
                if (!isIEmailDelivery(state.values.deliveryChannel.value)) {
                    state.values.deliveryChannel.value = {
                        email: "",
                    };
                }
            } else if (action.payload === ENotificationDeliveryChannel.sms) {
                if (!isISmsDelivery(state.values.deliveryChannel.value)) {
                    state.values.deliveryChannel.value = {
                        phoneNumber: "",
                    };
                }
            } else if (action.payload === ENotificationDeliveryChannel.slack) {
                if (!isISlackDelivery(state.values.deliveryChannel.value)) {
                    state.values.deliveryChannel.value = {
                        channel: "",
                        username: "SlackBOT",
                    };
                }
            } else if (action.payload === ENotificationDeliveryChannel.crm_ticket) {
                if (!isIUserIdDelivery(state.values.deliveryChannel.value)) {
                    state.values.deliveryChannel.value = {
                        userId: "",
                    };
                }
            }
        },
        setOutputEmail(state, action: PayloadAction<string>) {
            if (
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    action.payload
                ) ||
                action.payload === ""
            ) {
                if (state.errors?.deliveryChannel) {
                    state.errors.deliveryChannel = undefined;
                }
            } else {
                state.errors = {
                    ...state.errors,
                    deliveryChannel: {
                        value: {
                            email: {
                                error: true,
                                helperText: "Incorrect email",
                            },
                        },
                    },
                };
            }
            (state.values.deliveryChannel.value as IEmailDelivery).email = action.payload;
        },
        setOutputUserId(state, action: PayloadAction<string>) {
            (state.values.deliveryChannel.value as IUserIdDelivery).userId = action.payload;
            if (state.errors?.deliveryChannel?.value?.["userId"]) {
                delete state.errors?.deliveryChannel.value?.["userId"];
            }
        },
        setOutputChannel(state, action: PayloadAction<string>) {
            (state.values.deliveryChannel.value as ISlackDelivery).channel = action.payload;
            if (state.errors?.deliveryChannel?.value?.["channel"]) {
                delete state.errors?.deliveryChannel.value?.["channel"];
            }
        },
        setOutputUsername(state, action: PayloadAction<string>) {
            (state.values.deliveryChannel.value as ISlackDelivery).username = action.payload;
            if (state.errors?.deliveryChannel?.value?.["username"]) {
                delete state.errors?.deliveryChannel.value?.["username"];
            }
        },
        setOutputPhonenumber(state, action: PayloadAction<string>) {
            if (action.payload.length !== 11) {
                state.errors = {
                    ...state.errors,
                    deliveryChannel: {
                        value: {
                            phoneNumber: {
                                error: true,
                                helperText: "Incorrect phone number",
                            },
                        },
                    },
                };
            } else if (state.errors?.deliveryChannel) {
                state.errors.deliveryChannel = undefined;
            }
            (state.values.deliveryChannel.value as ISmsDelivery).phoneNumber = action.payload;
        },
        resetForm(state) {
            state.values = initialState.values;
            state.errors = null;
        },
        setKeywords(state, action: PayloadAction<string>) {
            state.values.filter.keyWords = action.payload;
            // state.values.filter.type = "or";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createNotification.rejected, (state, action) => {
                state.errors = action.payload as INotificationErrorState;
            })
            .addCase(getNotificationsRule.fulfilled, (state, action) => {
                const values = messageTypesAdapter
                    .getSelectors((state: INotificationForm) => state.messageTypes)
                    .selectAll(state);
                state.values = fetchNotificationApiMapper(action.payload, values);
                if (state.values.filter.manualSelection.length) {
                    state.values.filter.priority.push(1337);
                }
            })
            .addCase(fetchNotificationEmploye.fulfilled, (state, action) => {
                employesAdapter.setAll(state.employes, action.payload.data);
            })
            .addCase(fetchNotificationApps.fulfilled, (state, action) => {
                appsAdapter.setAll(state.apps, action.payload);
            })
            .addCase(fetchNotificationMessageTypes.fulfilled, (state, action) => {
                messageTypesAdapter.setAll(state.messageTypes, action.payload);
            })
            .addCase(fetchNotificationAppTypes.fulfilled, (state, action) => {
                appTypesAdapter.setAll(state.appTypes, action.payload);
            });
    },
});

export default userNotificationsFormSlice.reducer;
