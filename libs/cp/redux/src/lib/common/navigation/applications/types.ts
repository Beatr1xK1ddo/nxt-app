import {INavigationTabState, INavTab} from "../types";

export enum EIpbeNavAppList {
    manageIpbe = "Manage SDI to IP Encoders",
    createIpbe = "Create new SDI to IP Encoder",
}
export enum ETxrNavAppList {
    manageTxr = "Manage transfers",
    createTxr = "Create new transfer",
    manageProxyServerForTxr6 = "Mange Proxy Servers for TXR6",
}
export enum EChannelNavAppList {
    manageChannels = "Manage Channels",
    manageTemplates = "Manage Templates",
    manageLogotypes = "Manage Logotypes",
    appSchedule = "App schedule",
}
export enum ETranscoderNavAppList {
    manageTranscoders = "Manage transcoders",
    manageOutputServers = "Manage output servers",
    channelListCsv = "Channel list in CSV",
}
export enum ETranscoder2NavAppList {
    manageTranscoders2 = "Manage transcoders",
    createTranscoder2 = "Create transcoder",
    dashboard = "Dashboard",
    manageEncoderTemplates = "Manage encoder templates",
}

export enum EStandardsConversionNavAppList {
    manageConverter = "Manage converter",
    createNewConverter = "Create new converter",
    converterDashboard = "Converter Dashboard",
}
export enum ESlateGeneratorNavAppList {
    manageSlateGenerators = "Manage Slate Generators",
    createSlateGenerator = "Create new Slate Generator",
}
export enum ESrtNavAppList {
    manageSrt = "Manage SRT",
    createSrt = "Create SRT",
}
export enum ESptsNavAppList {
    manageSpts = "Manage SPTS",
    createSpts = "Create SPTS",
}

export enum EMptsNavAppList {
    manageMpts = "Manage muxers",
    createMpts = "Create new muxer",
}

export enum ESupervisorNavAppList {
    manageSupervisors = "Manage Supervisors",
    createSupervisor = "Create new Supervisor",
    manageSupervisorApplications = "Manage Supervisor Applications",
}

export enum ETeranexNavAppList {
    manageTeranexes = "Manage Teranexes",
    createTeranex = "Create new Teranex",
}

export enum ETimeshiftingNavAppList {
    manageTimeshifting = "Manage Timeshifting",
    createTimeshifting = "Create new Timeshifting",
}
export enum EFailoverNavAppList {
    manageFailover = "Manage Failover",
    createFailover = "Create new Failover",
}
export enum ETsForwardNavAppList {
    manageTsForward = "Manage TSForward",
    createTsForward = "Create new TSForward",
}
export enum EMultiscreenNavAppList {
    manageMultiscreens = "Manage Multiscreens",
    createMultiscreen = "Create new Multiscreen",
}
export enum EQFrameNavAppList {
    manageQFrame = "Manage QFrame",
    createQFrame = "Create new QFrame",
}

export enum EEncryptionNavAppList {
    manageEncryptions = "Manage encryptions",
    createEncryption = "Create new encryption",
}
export enum EDecryptionNavAppList {
    manageDecryption = "Manage Decryption",
    createDecryption = "Create new Decryption",
}
export enum ENxtLitePlayerNavAppList {
    manageNxtLitePlayers = "Manage NxtLite Players",
    createNxtLitePlayer = "Create new NxtLite Player",
}
export enum EFilePlayerNavAppList {
    manageFilePlayer = "Manage File Player",
    createFilePlayer = "Create new File Player",
}
export enum EHyperDeckNavAppList {
    manageHyperDecks = "Manage HyperDecks",
    createHyperDeck = "Create new HyperDeck",
}
export enum EHlsAnalyzerNavAppList {
    manageHlsAnalyzer = "Manage HLS Analyzer",
    createHlsAnalyzer = "Create new HLS Analyzer",
}

export enum ESdiPlayerNavAppList {
    manageSdiplayers = "Manage SDI players",
    createSdiPlayer = "Create new SDI player",
}

export interface INavApplicationState extends INavTab {
    ipbe: INavigationTabState<keyof typeof EIpbeNavAppList>;
    txr: INavigationTabState<keyof typeof ETxrNavAppList>;
    channel: INavigationTabState<keyof typeof EChannelNavAppList>;
    transcoder2: INavigationTabState<keyof typeof ETranscoder2NavAppList>;
    transcoder: INavigationTabState<keyof typeof ETranscoderNavAppList>;
    standardsConversion: INavigationTabState<keyof typeof EStandardsConversionNavAppList>;
    slateGenerator: INavigationTabState<keyof typeof ESlateGeneratorNavAppList>;
    srt: INavigationTabState<keyof typeof ESrtNavAppList>;
    spts: INavigationTabState<keyof typeof ESptsNavAppList>;
    mpts: INavigationTabState<keyof typeof EMptsNavAppList>;
    supervisor: INavigationTabState<keyof typeof ESupervisorNavAppList>;
    teranex: INavigationTabState<keyof typeof ETeranexNavAppList>;
    timeshifting: INavigationTabState<keyof typeof ETimeshiftingNavAppList>;
    failover: INavigationTabState<keyof typeof EFailoverNavAppList>;
    tsForward: INavigationTabState<keyof typeof ETsForwardNavAppList>;
    multiscreen: INavigationTabState<keyof typeof EMultiscreenNavAppList>;
    qFrame: INavigationTabState<keyof typeof EQFrameNavAppList>;
    decryption: INavigationTabState<keyof typeof EDecryptionNavAppList>;
    encryption: INavigationTabState<keyof typeof EEncryptionNavAppList>;
    nxtLitePlayer: INavigationTabState<keyof typeof ENxtLitePlayerNavAppList>;
    filePlayer: INavigationTabState<keyof typeof EFilePlayerNavAppList>;
    hyperDeck: INavigationTabState<keyof typeof EHyperDeckNavAppList>;
    hlsAnalyzer: INavigationTabState<keyof typeof EHlsAnalyzerNavAppList>;
    sdiPlayer: INavigationTabState<keyof typeof ESdiPlayerNavAppList>;
}
