export enum ECardView {
    card = 'card',
    table = 'table',
}

export type IThumbnailResponse = {
    channel: string;
    imageSrcBase64: string;
};

export enum EStatusTypes {
    active = 'active',
    error = 'error',
    stopped = 'stopped',
    cloned = 'cloned',
    new = 'new',
}

export type IRealtimeAppEvent =
    | IRealtimeAppStatusEvent
    | IRealtimeAppTimingEvent;

export type IRealtimeAppStatusEvent = {
    id: string;
    type: string;
    status: EStatusTypes;
    statusChange: string;
};

export type IRealtimeAppTimingEvent = {
    id: string;
    type: string;
    startedAt: number;
};

export enum EVideoFormat {
    PAL = "PAL",
    NTSC = "NTSC",
    "720p50" = "720p50",
    "720p59.94" = "720p59.94",
    "720p60" = "720p60",
    "1080i50" = "1080i50",
    "1080i59.94" = "1080i59.94",
    "1080i60" = "1080i60",
    "1080p23.98" = "1080p23.98",
    "1080p24" = "1080p24",
    "1080p25" = "1080p25",
    "1080p29.97" = "1080p29.97",
    "1080p30" = "1080p30",
    "1080p50" = "1080p50",
    "1080p59.94" = "1080p59.94",
    "1080p60" = "1080p60",
}

export enum EVideoConnection {
    sdi = "sdi",
    hdmi = "hdmi",
}

export enum ESystemType {
    generic = "generic",
    lowestlatency = "lowestlatency",
    lowlatency = "lowlatency",
}

export enum EAspectRatio {
    "not set" = "not set",
    "4:3" = "4:3",
    "16:9" = "16:9",
}

export enum EOutputType {
    udp = "udp",
    rtp = "rtp",
}

export enum EProfile {
    baseline = "baseline",
    main = "main",
    high = "high",
}

export enum EYesOrNo {
    yes = "yes",
    no = "no",
}

export enum ELevel {
    "3,0" = "3.0",
    "3,1" = "3.1",
    "3,2" = "3.2",
    "4,0" = "4.0",
    "4,1" = "4.1",
    "4,2" = "4.2",
    "5,0" = "5.0",
    "5,1" = "5.1",
}

export enum EInterlaced {
    auto = -1,
    no = 0,
    yes = 1,
}

export enum EBFrameAdaptive {
    disabled = 0,
    fast = 1,
    slow = 2,

}

export enum ETimecode {
    "no timecode" = "",
    rp188 = "rp188",
    vitc = "vitc",
}

export enum EVideoEncoder {
    AVC1 = "AVC1",
    QuickSync = "QuickSync",
    x264 = "x264",
}

export enum EAvds2Muxer{
    libmpegts = "libmpegts",
    mainconcept = "mainconcept",
}

export enum EPreset {
    default = "default",
    medium = "medium",
    ultrafast = "ultrafast",
    superfast = "superfast",
    veryfast = "veryfast",
    faster = "faster",
    fast = "fast",
    hp = "hp",
    hq = "hq",
    ll = "ll",
    llhq = "llhq",
    llhp = "llhp",
}

// company - select box +
// node - select box, required +
// name - text, required, разрешенные значения /^[0-9a-zA-Z_]+$/ +
// card_idx - select box, 0-27, required -
// video_format - select box, required + 
// “PAL” => “PAL”,“NTSC” => “NTSC”,“720p50” => “720p50",“720p59.94” => “720p59.94",“720p60” => “720p60",“1080i50” => “1080i50",“1080i59.94” => “1080i59.94",“1080i60” => “1080i60",“1080p23.98” => “1080p23.98",“1080p24” => “1080p24",“1080p25” => “1080p25",“1080p29.97” => “1080p29.97",“1080p30” => “1080p30",“1080p50” => “1080p50",“1080p59.94” => “1080p59.94",“1080p60” => “1080p60",
// video_connection - select box, required +
// ‘sdi’ => ‘sdi’,‘hdmi’ => ‘hdmi’,
// system_type - select box, required + 
// “generic” => “generic”,“lowestlatency” => “lowestlatency”,“lowlatency” => “lowlatency”,
// intra_refresh - check box
// keyint - text, integer
// aspect_ratio - select box, required + 
// “not set” => “not set”,“4:3” => “4:3",“16:9” => “16:9",
// output_type - select box, required + 
// “udp” => “udp”,“rtp” => “rtp”,
// max_refs - select box, required, 0 - 10 -
// profile - select box, required + 
// “baseline” => “baseline”,“main” => “main”,“high” => “high”,
// vbitrate - text, number
// vbv_maxrate - text, number
// vbv_bufsize - text, number
// threads - select box, required 0 - 32 -
// ts_muxrate - text, number
// cbr - select box, required +
// “yes” => “yes”,“no” => “no”,
// lookahead - text, integer
// bframes - text, integer
// pcr_period - text, integer
// pmt_period - text, integer
// level - select box, required +
// “3.0” => “3.0",“3.1” => “3.1",“3.2” => “3.2",“4.0” => “4.0",“4.1” => “4.1",“4.2” => “4.2",“5.0” => “5.0",“5.1” => “5.1",
// service_name - text
// video_pid - text
// data_stream_opts - text Add SCTE (pid=N)
// interlaced - select box, required +
// ‘auto’ => -1,‘no’ => 0,‘yes’ => 1,
// run_monitor - checkbox
// restart_on_error - checkbox
// input_buffer - text Input buffer (ffmpeg only)
// program_number - text, integer
// pmt_pid - text, integer
// pcr_pid - text, integer
// ts_id - text, integer
// open_gop = select box, required +
// ‘no’ => ‘no’,‘yes’ => ‘yes’,
// b_frame_adaptive - select box, required B-frame adaptive +
// ‘Disabled’ => 0,‘Fast’ => 1,‘Slow’ => 2,
// scenecut_threshold - text, integer
// slate_image - загрузка картинки file_type Enable Preview Images
// timecode - select box, required +
// ‘no timecode’ => ‘’,‘rp188’ => ‘rp188’,‘vitc’ => ‘vitc’,
// enable_psf_encoding - select box, required +
// ‘no’ => ‘no’,‘yes’ => ‘yes’,
// generate_thumbnails - checkbox
// enable_loopback - checkbox
// video_encoder - select box, required +
// ‘AVC1’ => ‘AVC1’,‘QuickSync’ => ‘QuickSync’,‘x264’ => ‘x264’,
// avds2muxer - select box, required +
// ‘libmpegts’ => ‘libmpegts’,‘mainconcept’ => ‘mainconcept’,
// preset - select box, required +
// ‘default’ => ‘default’,‘medium’ => ‘medium’,‘ultrafast’ => ‘ultrafast’,‘superfast’ => ‘superfast’,‘veryfast’ => ‘veryfast’,‘faster’ => ‘faster’,‘fast’ => ‘fast’,‘hp’ => ‘hp’,‘hq’ => ‘hq’,‘ll’ => ‘ll’,‘llhq’ => ‘llhq’,‘llhp’ => ‘llhp’
// encoder_version - select box, required тут будет сложнее логика получения данных. пока что сделай статично
// “original ipbe, r1.0” => “v1",“ffmpeg for SDI” => “v2",“custom ipbe, r1.0.9 nxt primary” => “v3",“custom ipbe, r1.0.2 lowest latency only” => “v4",“custom ipbe, r1.0.2 real-time bitrate change” => “v5",“static ipbe, r1.0.6” => ‘v3_106’,“static ipbe, r1.2.0" => “v3_120”,“static ipbe, r1.3.1 (new)” => ‘v3_130’,“avds2” => “avds2",
// ipbe_audio_channels - коллекция значений, можно создать любое кол-во. Поля:
// type - select box, required Codec
// “mp2” => “mp2",“aac” => “aac”,“ac3” => “ac3",
// abitrate - select box, required Bitrate
// 128 => 128,192 => 192,256 => 256,384 => 384,
// sdi_audio_pair - select box, required
// “Default” => 0,“1" => 1,“2” => 2,“3" => 3,“4” => 4,“5" => 5,“6” => 6,“7" => 7,“8” => 8,
// ac3_dialogue_normalization - select box, required AC3-Audio Dialogue level
// “No normalization” => 0,-31 => -31,-30 => -30,-29 => -29,-28 => -28,-27 => -27,-26 => -26,-25 => -25,-24 => -24,-23 => -23,-22 => -22,-21 => -21,-20 => -20,-19 => -19,-18 => -18,-17 => -17,-16 => -16,-15 => -15,-14 => -14,-13 => -13,-12 => -12,-11 => -11,-10 => -10,-9 => -9,-8 => -8,-7 => -7,-6 => -6,-5 => -5,-4 => -4,-3 => -3,-2 => -2,-1 => -1,
// audio_channels - select box, required
// ‘Default’ => ‘’,‘Mono’ => ‘mono’,‘Stereo’ => ‘stereo’,‘5.0’ => ‘5.0’,‘5.1’ => ‘5.1’,
// language - text
// audio_pid - text
// ipbe_destinations - коллекция значений, можно создать любое кол-во. Поля:
// output_port - text, integer, required
// output_ip - text, ip, required
// ttl - select box, required, 0 - 64
// 18:45
// encoder_version - select box, required тут будет сложнее логика получения данных. пока что сделай статично
// “original ipbe, r1.0” => “v1",“ffmpeg for SDI” => “v2",“custom ipbe, r1.0.9 nxt primary” => “v3",“custom ipbe, r1.0.2 lowest latency only” => “v4",“custom ipbe, r1.0.2 real-time bitrate change” => “v5",“static ipbe, r1.0.6” => ‘v3_106’,“static ipbe, r1.2.0" => “v3_120”,“static ipbe, r1.3.1 (new)” => ‘v3_130’,“avds2” => “avds2",