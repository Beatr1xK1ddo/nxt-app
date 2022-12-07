import api, {IEmailDelivery, ISlackDelivery, ISmsDelivery, IUserIdDelivery} from "@nxt-ui/cp/api";
import {ENotificationDeliveryChannel} from "@nxt-ui/cp/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICpRootState} from "../../types";
import {
    EManualSelectionArr,
    EManualSelectionBool,
    INotificationErrorState,
    INotificationForm,
    isIEmailDelivery,
    isISlackDelivery,
    isISmsDelivery,
    isIUserIdDelivery,
} from "./types";
import {createNotificationApiMapper, fetchNotificationApiMapper} from "./utils";

export const NOTIFICATION_FORM = "form";

export const getNotificationsRule = createAsyncThunk(`${NOTIFICATION_FORM}/getItem`, async (ruleId: string) => {
    return await api.notifications.fetchNotificationRule(ruleId);
});

export const createNotification = createAsyncThunk(
    `${NOTIFICATION_FORM}/createNotification`,
    async (_, {getState, rejectWithValue}) => {
        const state = getState() as ICpRootState;
        const mapped = createNotificationApiMapper(state.notifications.form.values, state.common.user.user?.email);
        console.log("mapped = ", mapped.data);
        if (!mapped.error && mapped.data) {
            try {
                return await api.notifications.postNotification(mapped.data);
            } catch (e) {
                return rejectWithValue(null);
            }
        } else {
            return rejectWithValue(mapped.errors);
        }
    }
);

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
            manualSelection: {
                cpOperations: false,
                playoutEvents: false,
                mamEvents: false,
                cronEvents: false,
                selectAll: false,
                applicationEvents: false,
                ipMonitoringEvents: [],
                serverEvents: [],
            },
            keyWords: "",
        },
        dayTime: {
            setRange: false,
            day: null,
            timeStart: "",
            timeEnd: "",
        },
        deliveryChannel: {
            type: null,
            value: null,
        },
        ruleName: "",
    },
    errors: null,
};

export const userNotificationsFormSlice = createSlice({
    name: `${NOTIFICATION_FORM}`,
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.ruleName = payload;
        },
        setNode(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.where.nodeId = payload;
        },
        setAppType(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.where.appType = payload;
        },
        setApps(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.where.apps = payload;
        },
        setCompany(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.whome.company = payload;
        },
        setEmploye(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.whome.employe = payload;
        },
        setPriority(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.filter.priority = payload;
        },
        setManualSelectionBool(state, action: PayloadAction<EManualSelectionBool>) {
            const {payload} = action;
            state.values.filter.manualSelection[payload] = !state.values.filter.manualSelection[payload];
        },
        setRange(state) {
            state.values.dayTime.setRange = !state.values.dayTime.setRange;
        },
        setDayTimeDay(state, action: PayloadAction<string>) {
            state.values.dayTime.day = action.payload;
        },
        setStartTime(state, action: PayloadAction<string>) {
            state.values.dayTime.timeStart = action.payload;
        },
        setEndTime(state, action: PayloadAction<string>) {
            state.values.dayTime.timeEnd = action.payload;
        },
        setOutputType(state, action: PayloadAction<ENotificationDeliveryChannel>) {
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
            } else {
                if (!isIUserIdDelivery(state.values.deliveryChannel.value)) {
                    state.values.deliveryChannel.value = {
                        userId: "",
                    };
                }
            }
        },
        setOutputEmail(state, action: PayloadAction<string>) {
            (state.values.deliveryChannel.value as IEmailDelivery).email = action.payload;
        },
        setOutputUserId(state, action: PayloadAction<string>) {
            (state.values.deliveryChannel.value as IUserIdDelivery).userId = action.payload;
        },
        setOutputChannel(state, action: PayloadAction<string>) {
            (state.values.deliveryChannel.value as ISlackDelivery).channel = action.payload;
        },
        setOutputUsername(state, action: PayloadAction<string>) {
            (state.values.deliveryChannel.value as ISlackDelivery).username = action.payload;
        },
        setOutputPhonenumber(state, action: PayloadAction<string>) {
            (state.values.deliveryChannel.value as ISmsDelivery).phoneNumber = action.payload;
        },
        setManualSelection(state, action: PayloadAction<{field: EManualSelectionArr; value: string}>) {
            const {
                payload: {field, value},
            } = action;
            const item = state.values.filter.manualSelection[field].find((item) => item === value);
            if (item) {
                state.values.filter.manualSelection[field] = state.values.filter.manualSelection[field].filter(
                    (item) => item !== value
                );
            } else {
                state.values.filter.manualSelection[field].push(value);
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createNotification.rejected, (state, action) => {
                state.errors = action.payload as INotificationErrorState;
            })
            .addCase(getNotificationsRule.fulfilled, (state, action) => {
                const result = fetchNotificationApiMapper(action.payload);
                state.values = result;
            });
    },
});

export default userNotificationsFormSlice.reducer;
