import api, {
    IEmailDelivery,
    INotificationApp,
    INotificationAppType,
    INotificationEmploye,
    INotificationMessageType,
    ISlackDelivery,
    ISmsDelivery,
    IUserIdDelivery,
} from "@nxt-ui/cp/api";
import {ENotificationDeliveryChannel, Optional} from "@nxt-ui/cp/types";
import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {notificationsActions} from "../../common/notifications";
import {ICpRootState} from "../../types";
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
        const valid = validatNotification(state.notifications.form.values);
        if (valid) {
            const mapped = createNotificationApiMapper(state.notifications.form.values, state.common.user.user?.email);
            console.log("mapped ", mapped);
            if (!mapped.error && mapped.data) {
                try {
                    return await api.notifications.postNotification(mapped.data);
                } catch (e) {
                    const message = "An error occured while creating notification";
                    dispatch(notificationsActions.add({message}));
                    return rejectWithValue(null);
                }
            } else {
                return rejectWithValue(mapped.errors);
            }
        } else {
            const message =
                "You must select one of this fields: ['whome', 'where', 'priority', 'manual selection', 'keyword]";
            dispatch(notificationsActions.add({message}));
            return rejectWithValue(null);
        }
    }
);

export const fetchNotificationAppTypes = createAsyncThunk(
    `${NOTIFICATION_FORM}/fetchNotificationAppTypes`,
    async (_, {rejectWithValue}) => {
        try {
            return await api.notifications.fetchNotificationAppTypes();
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
    async (appType: string, {rejectWithValue}) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            return await api.notifications.fetchNotificationApps(appType);
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
            priority: null,
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
        setAppType(state, action: PayloadAction<string>) {
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
        setEmploye(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.whome.employe = payload;
        },
        setPriority(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.filter.priority = payload;
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
        setStartTime(state, action: PayloadAction<string>) {
            if (state.values.dayTime.timerange.end) {
                const startDate = +new Date(action.payload);
                const endDate = +new Date(state.values.dayTime.timerange.end);
                if (startDate > endDate) {
                    state.errors = {
                        ...state.errors,
                        dayTime: {
                            timeStart: {
                                error: true,
                                helperText: "Start date can not be greater than end date",
                            },
                        },
                    };
                } else if (state.errors?.dayTime?.timeStart) {
                    delete state.errors?.dayTime?.timeStart;
                }

                if (startDate === endDate) {
                    state.errors = {
                        ...state.errors,
                        dayTime: {
                            ...state.errors?.dayTime,
                            timeEnd: {
                                error: true,
                                helperText: "End date can not be equal start date",
                            },
                        },
                    };
                }
            }
            state.values.dayTime.timerange.start = action.payload;
        },
        setEndTime(state, action: PayloadAction<string>) {
            if (state.values.dayTime.timerange.start) {
                const startDate = +new Date(state.values.dayTime.timerange.start);
                const endDate = +new Date(action.payload);
                if (startDate > endDate) {
                    state.errors = {
                        ...state.errors,
                        dayTime: {
                            timeStart: {
                                error: true,
                                helperText: "Start date can not be greater than end date",
                            },
                        },
                    };
                } else if (state.errors?.dayTime?.timeStart) {
                    delete state.errors?.dayTime?.timeStart;
                }

                if (startDate === endDate) {
                    state.errors = {
                        ...state.errors,
                        dayTime: {
                            ...state.errors?.dayTime,
                            timeEnd: {
                                error: true,
                                helperText: "End date can not be equal start date",
                            },
                        },
                    };
                }
                const time = dateFormat(action.payload);
                const [hours, minuts] = time.split(":");
                console.log("hours ", hours);
                console.log("minuts ", minuts);
            }
            state.values.dayTime.timerange.end = action.payload;
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
                        username: "",
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
        },
        setKeywords(state, action: PayloadAction<string>) {
            state.values.filter.keyWords = action.payload;
            state.values.filter.type = "or";
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
