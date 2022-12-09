import {EApiDefinitionType, IDeliveryChannel, IFilterValue, IFilterValues, INotificationRuleApi} from "@nxt-ui/cp/api";
import {EFilterOption, ENotificationDeliveryChannel} from "@nxt-ui/cp/types";
import {INotificationErrorState, INotificationState} from "./types";

type ICreateNotificationMapper = {
    data?: INotificationRuleApi;
    errors: INotificationErrorState;
    error: boolean;
};

export const fetchNotificationApiMapper = (state: INotificationRuleApi): INotificationState => {
    const {type, ...rest} = state.deliveryChannel;
    const company = state.filter.definitions.find((item) => item.type === EApiDefinitionType.company_id);
    const companyId =
        typeof (company as IFilterValue)?.value === "number" ? ((company as IFilterValue)?.value as number) : null;
    const node = state.filter.definitions.find((item) => item.type === EApiDefinitionType.node_id);
    const dayTime = {
        setRange: false,
        day: null,
        timeStart: "",
        timeEnd: "",
    };
    const deliveryChannel = {
        type,
        value: rest,
    };
    const where = {
        nodeId: parseInt((node as IFilterValues)?.values[0]) ? parseInt((node as IFilterValues)?.values[0]) : null,
        appType: null,
        apps: null,
    };
    const whome = {
        company: companyId,
        employe: null,
    };
    const filter = {
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
    };
    return {
        id: state.id,
        ruleName: state.name,
        where,
        whome,
        filter,
        dayTime,
        deliveryChannel,
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
