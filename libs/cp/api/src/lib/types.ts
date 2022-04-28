import { EAspectRatio, EBFrameAdaptive, EEncoderVersion, EInterlaced, EOutputType, EPreset, EProfile, EStatusTypes, ESystemType,
    ETimecode, EVideoConnection, EVideoEncoder, EVideoFormat, EYesOrNo } from '@nxt-ui/cp/types';

export enum ETimecodeType {
    empty = 'empty',
    notempty = 'notempty',
    rp188 = 'rp188',
    vitc = 'vitc',
}

export type IAudioChannels = {
    id: number,
    type: string,
    abitrate: number,
    sdi_audio_pair: number,
    audio_pid?: string,
    ac3_dialogue_normalization: number,
    audio_channels: string,
    language?: string,
}

export type IIpbeAudioChannels = Pick<IAudioChannels, 'abitrate' | 'type'>;

export type IIpbeDestinations = {
    output_port: number;
    output_ip: string;
};

export type IIbpeCard = {
    card_idx: number;
    company_id?: string;
    company_name?: string;
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

export type IDestinations = {
    id: number,
    output_ip: string,
    ttl: number,
    output_port: number,
}

export type IIpbe = {
    started_at_milliseconds: number, // ??
    company_name?: string, // ??
    company_id?: string, // ??
    node_id: string,
    node_text: string,
    slate_image_link: string,
    id: number,
    ipbe_destinations: IDestinations[],
    ipbe_audio_channels: IAudioChannels[],
    name: string,
    service_name?: string,
    card_idx: number,
    video_format: EVideoFormat,
    video_connection: EVideoConnection,
    system_type: ESystemType,
    intra_refresh: boolean,
    keyint?: string | number,
    aspect_ratio: EAspectRatio,
    output_type: EOutputType,
    max_refs: number,
    profile: EProfile,
    vbitrate?: number | string,
    vbv_maxrate?: number | string,
    vbv_bufsize?: number | string,
    threads: number,
    ts_muxrate?: number | string,
    cbr: EYesOrNo,
    lookahead?: number | string,
    bframes?: number | string,
    pcr_period?: number | string,
    pmt_period?: string | number,
    level: string,
    status: EStatusTypes,
    status_change?: unknown, // ?? 
    video_pid?: string,
    interlaced: EInterlaced,
    data_stream_opts?: string,
    encoder_version: keyof typeof EEncoderVersion,
    input_buffer?: string,
    restart_on_error: boolean,
    // halt_until?: unknown, // ??
    ignore_alerts: boolean,
    program_number?: number,
    pmt_pid?: number | string,
    pcr_pid?: number | string,
    ts_id?: number | string,
    open_gop: EYesOrNo,
    b_frame_adaptive: EBFrameAdaptive,
    scenecut_threshold?: string | number,
    timecode: ETimecode,
    slate_image?: string, // ?? array and nullable and string
    enable_psf_encoding: EYesOrNo,
    generate_thumbnails: boolean,
    enable_loopback: boolean,
    video_encoder: EVideoEncoder,
    avds2_muxer: string, // ?? no type
    preset: EPreset,
}
