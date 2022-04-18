import { ComponentStory, Meta } from '@storybook/react';
import { CardView } from './index';
import { IIbpeCard } from '@nxt-ui/cp/api';

const storyConfig: Meta<IIbpeCard> = {
    title: '@Card',
    component: CardView,
};

export default storyConfig;

const Template = (props: IIbpeCard) => <CardView {...props} />;

export const Card: ComponentStory<typeof CardView> = Template.bind({});

Card.args = {
    card_idx: 3,
    company_name: null,
    generate_thumbnails: false,
    id: 868,
    ipbe_audio_channels: [],
    ipbe_destinations: [],
    name: 'Arihant_IPBE_from_L2_SDI',
    node_id: '2447',
    node_text: 'L2_Testing_NXT4_No_Front_Panel (NXT-RXm3-4S-359) - M963245',
    run_monitor: true,
    vbitrate: 3000,
    video_format: 'PAL',
};
