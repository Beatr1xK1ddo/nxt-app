import { ComponentStory, Meta } from '@storybook/react';
import { CardTable } from './index';
import img from '../img.png';
import { ICardTableProps } from '../types';
import { EStatusTypes } from '../status/types';

const storyConfig: Meta<ICardTableProps> = {
    title: '@Card',
    component: CardTable,
};

export default storyConfig;

const Template = (props: ICardTableProps) => <CardTable {...props} />;

export const Default: ComponentStory<typeof CardTable> = Template.bind(
    {}
);

Default.args = {
    info: {
        title: 'TimesNow_Zoom_Backup',
        text: 'Onboarding Process ** TIMES Network INDIA Secondary (smc-ubuntu20-server2) - X837256',
        image: img,
    },
    status: {
        status: EStatusTypes.active
    },
    runtime: '08h 41m',
    input: {
        idx: '3',
        format: '1080i59.94'
    },
    bitrate: {
        mbps: '6 Mbps',
        kbps: '128kbps'
    },
    destination: '239.0.0.4:1234'
}