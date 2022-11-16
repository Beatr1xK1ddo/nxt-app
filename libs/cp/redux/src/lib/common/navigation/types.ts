import {
    EChannelNavAppList,
    EDecryptionNavAppList,
    EEncryptionNavAppList,
    EFailoverNavAppList,
    EFilePlayerNavAppList,
    EHlsAnalyzerNavAppList,
    EHyperDeckNavAppList,
    EIpbeNavAppList,
    EMptsNavAppList,
    EMultiscreenNavAppList,
    ENxtLitePlayerNavAppList,
    EQFrameNavAppList,
    ESdiPlayerNavAppList,
    ESlateGeneratorNavAppList,
    ESptsNavAppList,
    ESrtNavAppList,
    EStandardsConversionNavAppList,
    ESupervisorNavAppList,
    ETeranexNavAppList,
    ETimeshiftingNavAppList,
    ETranscoder2NavAppList,
    ETranscoderNavAppList,
    ETsForwardNavAppList,
    ETxrNavAppList,
    INavApplicationState,
} from "./applications/types";
import {ELogsNavAppList, INavLogsState} from "./logs/types";
import {EIpMonitoringNavAppList, ENextomonQaNavAppList, INavMonitoringState} from "./monitoring/types";
import {ENodeNavAppList, INavNodeState} from "./node/types";
import {
    EAdReplacerNavAppList,
    EFastSyncNavAppList,
    EIngestNavAppList,
    EMamNavAppList,
    EPlayout2NavAppList,
    EPlayoutNavAppList,
    INavPlayoutState,
} from "./playout/types";
import {
    EApNavProjectList,
    EApOccasionalUseNavProjectList,
    EApTestsNavProjectList,
    ECommercialDetectionNavProjectList,
    EExportWebStreamNavProjectList,
    EHlsPacketizersNavProjectList,
    EMagsNavProjectList,
    EMediaNavProjectList,
    EMobileMultiviewNavProjectList,
    ENextomeetNavProjectList,
    EProjectsNavProjectList,
    ERaspberryNavProjectList,
    EVideoHubNavProjectList,
    EWebPlayerNavProjectList,
    INavProjectState,
} from "./projects/types";
import {
    EGsrNavAppList,
    EIrdNavAppList,
    EMcrNavAppList,
    ERfScanNavAppList,
    ESatelliteNavAppList,
    ETerrestrialNavAppList,
    INavSatelliteState,
} from "./satellite/types";

export * from "./logs/types";
export * from "./node/types";

export type ENavigationTabs =
    | keyof typeof ETxrNavAppList
    | keyof typeof EIpbeNavAppList
    | keyof typeof EChannelNavAppList
    | keyof typeof EHyperDeckNavAppList
    | keyof typeof ERfScanNavAppList
    | keyof typeof ETerrestrialNavAppList
    | keyof typeof EMcrNavAppList
    | keyof typeof EGsrNavAppList
    | keyof typeof EIrdNavAppList
    | keyof typeof ETranscoderNavAppList
    | keyof typeof EHlsAnalyzerNavAppList
    | keyof typeof EStandardsConversionNavAppList
    | keyof typeof EEncryptionNavAppList
    | keyof typeof ESlateGeneratorNavAppList
    | keyof typeof ESupervisorNavAppList
    | keyof typeof EMptsNavAppList
    | keyof typeof ENxtLitePlayerNavAppList
    | keyof typeof EMagsNavProjectList
    | keyof typeof EAdReplacerNavAppList
    | keyof typeof ERaspberryNavProjectList
    | keyof typeof EIngestNavAppList
    | keyof typeof ECommercialDetectionNavProjectList
    | keyof typeof ENextomeetNavProjectList
    | keyof typeof EFastSyncNavAppList
    | keyof typeof EMamNavAppList
    | keyof typeof EExportWebStreamNavProjectList
    | keyof typeof EMediaNavProjectList
    | keyof typeof EApTestsNavProjectList
    | keyof typeof EProjectsNavProjectList
    | keyof typeof EWebPlayerNavProjectList
    | keyof typeof EApOccasionalUseNavProjectList
    | keyof typeof EApNavProjectList
    | keyof typeof EFilePlayerNavAppList
    | keyof typeof EQFrameNavAppList
    | keyof typeof ETimeshiftingNavAppList
    | keyof typeof EFailoverNavAppList
    | keyof typeof EIpMonitoringNavAppList
    | keyof typeof EMultiscreenNavAppList
    | keyof typeof ENextomonQaNavAppList
    | keyof typeof ETsForwardNavAppList
    | keyof typeof EPlayout2NavAppList
    | keyof typeof EPlayoutNavAppList
    | keyof typeof ESdiPlayerNavAppList
    | keyof typeof EHlsPacketizersNavProjectList
    | keyof typeof ESatelliteNavAppList
    | keyof typeof ESrtNavAppList
    | keyof typeof EDecryptionNavAppList
    | keyof typeof EVideoHubNavProjectList
    | keyof typeof ESptsNavAppList
    | keyof typeof EMobileMultiviewNavProjectList
    | keyof typeof ELogsNavAppList
    | keyof typeof ETeranexNavAppList
    | keyof typeof ENodeNavAppList
    | keyof typeof ETranscoder2NavAppList;

export type INavigationSubTabState = {
    active: boolean;
    permission: string;
    disabled: boolean;
    link: string;
    key: string;
    label: string;
};
export type INavTab = {
    [key: string]: INavigationTabState<any>;
};

export type INavigationTabState<T extends ENavigationTabs = any> = {
    key: string;
    label: string;
    permission: string;
    active: boolean;
    disabled: boolean;
    tabs: {
        [key in T]: INavigationSubTabState;
    };
};

export type INavigationSimpleTabState<T extends ENavigationTabs = any> = {
    [key in T]: INavigationSubTabState;
};

export type INavigationState = {
    applications: INavApplicationState;
    projects: INavProjectState;
    playout: INavPlayoutState;
    satellite: INavSatelliteState;
    monitoring: INavMonitoringState;
    logs: INavLogsState;
    node: INavNodeState;
};

export type INavAppItemSetPayload = {
    stateName: keyof INavigationState;
    tabName?: string;
    subTabName: string;
};

export type INavAppSetPayload = {
    stateName: keyof INavigationState;
    tabName: string;
};
