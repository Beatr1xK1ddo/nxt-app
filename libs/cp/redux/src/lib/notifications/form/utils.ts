import {
    EApiDefinitionType,
    IDeliveryChannel,
    IFilterValue,
    IFilterValues,
    INotificationMessageType,
    INotificationRuleApi,
    ISmsDelivery,
    IUserIdDelivery,
} from "@nxt-ui/cp/api";
import {EFilterOption, ENotificationDeliveryChannel, Optional} from "@nxt-ui/cp/types";
import {INotificationErrorState, INotificationState} from "./types";

type ICreateNotificationMapper = {
    data?: INotificationRuleApi;
    errors: INotificationErrorState;
    error: boolean;
};

export const dateFormat = (date: string) => {
    const hours = new Date(date).getHours().toString();
    const minuts = new Date(date).getMinutes().toString();
    return `${hours.length < 2 ? `0${hours}` : hours}:${minuts.length < 2 ? `0${minuts}` : minuts}`;
};

export const fetchNotificationApiMapper = (
    state: INotificationRuleApi,
    appTypes: Array<INotificationMessageType>
): INotificationState => {
    const {type, ...rest} = state.deliveryChannel;
    const company = state.filter.definitions.find((item) => item.type === EApiDefinitionType.company_id);
    const companyId =
        typeof (company as IFilterValue)?.value === "number" ? ((company as IFilterValue)?.value as number) : null;

    const employe = state.filter.definitions.find((item) => item.type === EApiDefinitionType.user_id);
    const employeId = (employe as IFilterValues)?.values?.[0] ? ((employe as IFilterValues).values[0] as number) : null;

    const appType = state.filter.definitions.find((item) => item.type === EApiDefinitionType.app_type);
    const appTypeId =
        typeof (appType as IFilterValues)?.values?.[0] === "string" ? (appType as IFilterValues).values[0] : null;

    const apps = state.filter.definitions.find((item) => item.type === EApiDefinitionType.app_id);
    const appsId = (apps as IFilterValues)?.values?.[0] ? parseInt((apps as IFilterValues).values[0] as string) : null;

    const node = state.filter.definitions.find((item) => item.type === EApiDefinitionType.node_id);
    const keyWord = state.filter.definitions.find((item) => item.type === EApiDefinitionType.message_text);

    const dayTime = {
        weekdays: state.deliveryTime?.weekdays ?? [],
        timerange: {
            start: "",
            end: "",
        },
        timezone: state.deliveryTime?.timezone ?? "",
    };
    if (state.deliveryTime?.timerange?.start && state.deliveryTime?.timerange?.end) {
        const [startHours, startMin] = state.deliveryTime.timerange.start.split(":");
        const [endHours, endMin] = state.deliveryTime.timerange.end.split(":");
        dayTime.timerange.start = new Date(0, 0, 0, parseInt(startHours), parseInt(startMin), 0).toString();
        dayTime.timerange.end = new Date(0, 0, 0, parseInt(endHours), parseInt(endMin), 0).toString();
    }
    const deliveryChannel = {
        type,
        value: rest,
    };
    const where = {
        nodeId: (node as IFilterValues)?.values[0] ? parseInt((node as IFilterValues).values[0] as string) : null,
        appType: appTypeId as string,
        apps: appsId,
    };
    const whome = {
        company: companyId,
        employe: employeId,
    };
    const msgTypeNames =
        (state.filter.definitions.find((item) => item.type === EApiDefinitionType.message_type) as IFilterValues)
            ?.values || [];
    const manualSelection = appTypes.filter((item) => msgTypeNames.includes(item.name));
    const priority = state.filter.definitions.find((item) => item.type === EApiDefinitionType.message_priority);
    const filter = {
        type: "and",
        priority: (priority as IFilterValues)?.values.length
            ? ((priority as IFilterValues).values as Array<number>)
            : [],
        manualSelection,
        keyWords: ((keyWord as IFilterValue)?.value as string) ?? "",
    };
    return {
        id: state.id,
        ruleName: state.name,
        where,
        whome,
        filter,
        deliveryChannel,
        dayTime,
        enabled: state.enabled,
    };
};

export const validatNotification = (state: INotificationState): boolean => {
    if (
        !state.whome.company &&
        !state.whome.employe &&
        !state.where.appType &&
        !state.where.apps &&
        !state.where.nodeId &&
        !state.filter.keyWords &&
        !state.filter.priority &&
        !state.filter.manualSelection.length
    ) {
        return false;
    } else {
        return true;
    }
};

export const createNotificationApiMapper = (
    state: INotificationState,
    error: Optional<INotificationErrorState>,
    messageTypeLength: number,
    email?: string
): ICreateNotificationMapper => {
    const result: ICreateNotificationMapper = {
        data: undefined,
        errors: {},
        error: false,
    };
    if (!state.ruleName) {
        result.error = true;
        result.errors.ruleName = {
            error: true,
            helperText: "Required field",
        };
    }

    if (!state.deliveryChannel.type) {
        result.error = true;
        result.errors.deliveryChannel = {...result.errors.deliveryChannel};
        result.errors.deliveryChannel.type = {
            error: true,
            helperText: "Required field",
        };
    }

    if (error?.dayTime?.timeEnd?.error) {
        result.error = true;
        result.errors.dayTime = {
            timeEnd: error.dayTime.timeEnd,
        };
    }
    if (error?.dayTime?.timeStart?.error) {
        result.error = true;
        result.errors.dayTime = {
            ...result.errors.dayTime,
            timeStart: error.dayTime.timeStart,
        };
    }

    const keys = Object.keys(state.deliveryChannel.value || {}) as Array<
        keyof INotificationState["deliveryChannel"]["value"]
    >;

    keys.forEach((key) => {
        if (!state.deliveryChannel.value?.[key]) {
            result.error = true;
            result.errors.deliveryChannel = {
                value: {
                    ...result.errors.deliveryChannel?.value,
                    [key]: {
                        error: true,
                        helperText: "This field can not be empty",
                    },
                },
            };
        }
    });

    const cpDelivery =
        state.deliveryChannel.type === ENotificationDeliveryChannel.cp_notification
            ? ({userId: email} as IUserIdDelivery)
            : state.deliveryChannel.type === ENotificationDeliveryChannel.sms
            ? {phoneNumber: `+${(state.deliveryChannel.value as ISmsDelivery).phoneNumber}`}
            : (state.deliveryChannel.value as IDeliveryChannel);

    if (!result.error) {
        result.data = {
            name: state.ruleName,
            userId: email || "",
            deliveryChannel: {
                type: state.deliveryChannel.type as ENotificationDeliveryChannel,
                ...cpDelivery,
            },
            filter: {
                type: state.filter.type as EFilterOption,
                definitions: [],
            },
            enabled: state.id ? state.enabled : true,
        };
        if (state.filter.manualSelection.length && state.filter.manualSelection.length !== messageTypeLength) {
            result.data.filter.definitions.push({
                type: EApiDefinitionType.message_type,
                values: state.filter.manualSelection.map((item) => item.name),
            });
        }
        if (state.filter.keyWords) {
            result.data.filter.definitions.push({
                type: EApiDefinitionType.message_text,
                value: state.filter.keyWords,
            });
        }
        if (state.dayTime.weekdays) {
            result.data.deliveryTime = {
                weekdays: state.dayTime.weekdays,
            };
        }
        if (state.dayTime.timerange.start && state.dayTime.timerange.end) {
            result.data.deliveryTime = {
                ...result.data.deliveryTime,
                timerange: {
                    start: dateFormat(state.dayTime.timerange.start),
                    end: dateFormat(state.dayTime.timerange.end),
                },
                timezone: state.dayTime.timezone,
            };
        }
        if (state.filter.priority.length) {
            result.data.filter.definitions.push({
                type: EApiDefinitionType.message_priority,
                values: state.filter.priority,
            });
        }
        if (state.whome.company) {
            result.data.filter.definitions.push({
                type: EApiDefinitionType.company_id,
                value: state.whome.company,
            });
        }
        if (state.where.nodeId) {
            result.data.filter.definitions.push({
                type: EApiDefinitionType.node_id,
                values: [state.where.nodeId.toString()],
            });
        }
        if (state.id) {
            result.data.id = state.id;
        }
        if (state.where.appType) {
            result.data.filter.definitions.push({
                type: EApiDefinitionType.app_type,
                values: [state.where.appType],
            });
        }
        if (state.where.apps) {
            result.data.filter.definitions.push({
                type: EApiDefinitionType.app_id,
                values: [state.where.apps.toString()],
            });
        }
        if (state.whome.employe) {
            result.data.filter.definitions.push({
                type: EApiDefinitionType.user_id,
                values: [state.whome.employe.toString()],
            });
        }
    }
    return result;
};
