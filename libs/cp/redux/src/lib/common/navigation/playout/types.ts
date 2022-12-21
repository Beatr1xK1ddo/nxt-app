import {INavigationTabState, INavTab} from "../types";

export enum EPlayoutNavAppList {
    playoutManageChannels = "Manage channels",
    playoutCreateChannel = "Create new channel",
    playoutDashboard = "Dashboard",
    playoutManageLogo = "Manage logo",
    playoutLiveSources = "Live Sources",
}

export enum EPlayout2NavAppList {
    playout2ManageChannels = "Manage channels",
    playout2LivePlayoutMonitor = "Live Playout Monitor",
    playout2ManagePlaylists = "Manage Playlists",
    playout2MediaLibrary = "Media Library",
    playout2LiveSources = "Live Sources",
}

export enum EIngestNavAppList {
    ingestManageRecording = "Manage Recording",
    ingestCreateRecording = "Create new Recording",
}
export enum EMamNavAppList {
    mamManageUserStorage = "Manage User Storage",
    mamCreateUserStorage = "Create new User Storage",
}
export enum EFastSyncNavAppList {
    fastSyncManageFastSync = "Manage Fast Sync",
    fastSyncCreateFastSync = "Create Fast Sync",
}

export enum EAdReplacerNavAppList {
    adReplacerManageAdReplacer = "Manage ad replacer",
}

export interface INavPlayoutState extends INavTab {
    playout: INavigationTabState<keyof typeof EPlayoutNavAppList>;
    playout2: INavigationTabState<keyof typeof EPlayout2NavAppList>;
    ingest: INavigationTabState<keyof typeof EIngestNavAppList>;
    mam: INavigationTabState<keyof typeof EMamNavAppList>;
    fastSync: INavigationTabState<keyof typeof EFastSyncNavAppList>;
    adReplacer: INavigationTabState<keyof typeof EAdReplacerNavAppList>;
}
