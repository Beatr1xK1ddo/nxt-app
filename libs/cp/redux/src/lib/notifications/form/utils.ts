import {
    EApiDefinitionType,
    IDeliveryChannel,
    IFilterValue,
    IFilterValues,
    INotificationMessageType,
    INotificationRuleApi,
} from "@nxt-ui/cp/api";
import {EFilterOption, ENotificationDeliveryChannel} from "@nxt-ui/cp/types";
import {INotificationErrorState, INotificationState} from "./types";

type ICreateNotificationMapper = {
    data?: INotificationRuleApi;
    errors: INotificationErrorState;
    error: boolean;
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
    const employeId = (employe as IFilterValues)?.values?.[0] ? parseInt((employe as IFilterValues).values[0]) : null;

    const appType = state.filter.definitions.find((item) => item.type === EApiDefinitionType.app_type);
    const appTypeId =
        typeof (appType as IFilterValues)?.values?.[0] === "string" ? (appType as IFilterValues).values[0] : null;

    const apps = state.filter.definitions.find((item) => item.type === EApiDefinitionType.app_id);
    const appsId = (apps as IFilterValues)?.values?.[0] ? parseInt((apps as IFilterValues).values[0]) : null;

    const node = state.filter.definitions.find((item) => item.type === EApiDefinitionType.node_id);
    const dayTime = {
        weekdays: state.deliveryTime?.weekdays ?? [],
        timerange: {
            start: state.deliveryTime?.timerange?.start
                ? new Date(`${state.deliveryTime.timerange.start}`.split(":").join(" ")).toString()
                : "",
            end: state.deliveryTime?.timerange?.end
                ? new Date(`${state.deliveryTime.timerange.end}`.split(":").join(" ")).toString()
                : "",
        },
        timezone: state.deliveryTime?.timezone ?? "",
    };
    const deliveryChannel = {
        type,
        value: rest,
    };
    const where = {
        nodeId: parseInt((node as IFilterValues)?.values[0]) ? parseInt((node as IFilterValues)?.values[0]) : null,
        appType: appTypeId,
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
        priority: (priority as IFilterValues)?.values[0] ? parseInt((priority as IFilterValues).values[0]) : null,
        manualSelection,
        // manualSelection: msgTypes.map((item) => ({ active: true, category})),
        keyWords: "",
    };
    return {
        id: state.id,
        ruleName: state.name,
        where,
        whome,
        filter,
        deliveryChannel,
        dayTime,
    };
};

export const createNotificationApiMapper = (state: INotificationState, email?: string): ICreateNotificationMapper => {
    const result: ICreateNotificationMapper = {
        data: undefined,
        errors: {},
        error: false,
    };
    // if (!state.where.nodeId) {
    //     result.error = true;
    //     result.errors.where = {...result.errors.where};
    //     result.errors.where.nodeId = {
    //         error: true,
    //         helperText: "Required field",
    //     };
    // }
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
    const keys = Object.keys(state.deliveryChannel.value || {}) as Array<
        keyof INotificationState["deliveryChannel"]["value"]
    >;
    keys.forEach((key) => {
        if (!state.deliveryChannel.value?.[key]) {
            result.error = true;
            result.errors.deliveryChannel = {
                value: {
                    [key]: {
                        error: true,
                        helperText: "This field can not be empty",
                    },
                },
            };
        }
    });
    if (!result.error) {
        result.data = {
            name: state.ruleName,
            userId: email || "",
            deliveryChannel: {
                type: state.deliveryChannel.type as ENotificationDeliveryChannel,
                ...(state.deliveryChannel.value as IDeliveryChannel),
            },
            filter: {
                type: state.filter.type as EFilterOption,
                definitions: [],
            },
        };
        if (state.filter.manualSelection) {
            result.data.filter.definitions.push({
                type: EApiDefinitionType.message_type,
                values: state.filter.manualSelection.map((item) => item.name),
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
                    start: `${new Date(state.dayTime.timerange.start).getHours()}:${new Date(
                        state.dayTime.timerange.start
                    ).getMinutes()}`,
                    end: `${new Date(state.dayTime.timerange.end).getHours()}:${new Date(
                        state.dayTime.timerange.end
                    ).getMinutes()}`,
                },
                timezone: state.dayTime.timezone,
            };
        }
        if (state.filter.priority) {
            result.data.filter.definitions.push({
                type: EApiDefinitionType.message_priority,
                values: [state.filter.priority.toString()],
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
