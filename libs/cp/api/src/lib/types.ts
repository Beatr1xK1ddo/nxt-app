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
    company_id: number | null;
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
};

// const data2: ICardViewProps = {
//     info: {
//         title: 'TimesNow_Zoom_Backup',
//         text: 'Onboarding Process ** TIMES Network INDIA Secondary (smc-ubuntu20-server2) - X837256',
//         image: img,
//     },
//     status: {
//         status: EStatusTypes.active,
//     },
//     runtime: '08h 41m',
//     input: {
//         idx: '3',
//         format: '1080i59.94',
//     },
//     bitrate: {
//         mbps: '6 Mbps',
//         kbps: '128kbps',
//     },
//     destination: '239.0.0.4:1234',
//     performance: {
//         title: 'Testing',
//         paragraph: 'Testing',
//     },
//     media: {
//         title: 'Testing',
//         paragraph: 'Testing',
//     },
// };

export type ICardResponse = {
    total: number;
    data: IIbpeCard[];
};
