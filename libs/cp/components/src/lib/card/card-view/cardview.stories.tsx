import { ComponentStory, Meta } from '@storybook/react';
import { CardView } from './index';
import img from '../img.png';
import { ICardViewProps } from '../types';
import { EStatusTypes } from '../../types';

const storyConfig: Meta<ICardViewProps> = {
    title: '@Card',
    component: CardView,
};

export default storyConfig;

const Template = (props: ICardViewProps) => <CardView {...props} />;

export const Card: ComponentStory<typeof CardView> = Template.bind({});

Card.args = {
    info: {
        title: 'TimesNow_Zoom_Backup',
        text: 'Onboarding Process ** TIMES Network INDIA Secondary (smc-ubuntu20-server2) - X837256',
        image: img,
    },
    status: {
        status: EStatusTypes.active,
    },
    runtime: '08h 41m',
    input: {
        idx: '3',
        format: '1080i59.94',
    },
    bitrate: {
        mbps: '6 Mbps',
        kbps: '128kbps',
    },
    destination: '239.0.0.4:1234',
    performance: {
        title: 'Performance chart',
        paragraph: '239.5.171.8:1234 - Mbps / Time',
    },
    media: {
        title: 'Media chart',
        paragraph: '239.5.171.8:1234 - Mbps / Time',
    },
};
