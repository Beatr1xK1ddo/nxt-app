export enum EStatusTypes {
    active = 'active',
    error = 'error',
    stopped = 'stopped',
    cloned = 'cloned',
    new = 'new',
}

export enum ETimecodeType {
    empty = 'empty',
    notempty = 'notempty',
    rp188 = 'rp188',
    vitc = 'vitc',
}

export type IIpbeAudioChannels = {
    type: string;
    abitrate: number;
};

export type IIpbeDestinations = {
    output_port: number;
    output_ip: string;
};

export type IIbpeCard = {
    card_idx: number;
    company_id?: string;
    company_name: string | null;
    generate_thumbnails: boolean;
    id: number;
    ipbe_audio_channels: IIpbeAudioChannels[];
    ipbe_destinations: IIpbeDestinations[];
    name: string;
    node_id: string;
    node_text: string;
    run_monitor: boolean;
    vbitrate: number;
    video_format: string;
    //
    status: EStatusTypes;
    thumbnail?: string;
};

export type INode = {
    is_online: true;
    id: number;
    temperature: number;
    name: string;
    load_average: number;
    cpu: number;
    memory_used: number;
    memory_free: number;
    hostname: string;
    digit_code: string;
    cpu_governor: string;
    cpu_core: number;
};

export type ICompany = {
    id: number;
    name: string;
};

export type APIResponseTypes = IIbpeCard | INode | ICompany;

export type IArrResponse<T extends APIResponseTypes> = {
    total: number;
    data: T[];
};
