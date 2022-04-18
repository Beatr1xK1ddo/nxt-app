import { ComponentStory, Meta } from '@storybook/react';
import { CardTable } from './index';
import { IIbpeCard } from '@nxt-ui/cp/api';

const storyConfig: Meta<IIbpeCard> = {
    title: '@Card',
    component: CardTable,
};

export default storyConfig;

const Template = (props: IIbpeCard) => <CardTable {...props} />;

export const Default: ComponentStory<typeof CardTable> = Template.bind({});

Default.args = {
    company_name: 'Music Or Media',
    company_id: '406',
    node_id: '1592',
    node_text: 'Music Or Media - Primary - X625798 (new-smc-02) - X625798',
    id: 412,
    ipbe_destinations: [
        {
            output_port: 1234,
            output_ip: '239.10.10.11',
        },
    ],
    ipbe_audio_channels: [
        {
            type: 'mp2',
            abitrate: 192,
        },
    ],
    name: 'Aghani_TV_Primary',
    card_idx: 1,
    video_format: '1080i50',
    vbitrate: 3000,
    run_monitor: true,
    generate_thumbnails: false,
};
