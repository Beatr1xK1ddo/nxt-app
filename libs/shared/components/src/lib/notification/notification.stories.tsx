import { ComponentStory, Meta } from '@storybook/react';
import { Notification } from './index';
import { ELogTypes } from './log-type/types';
import { INotificationProps } from './types';

const storyConfig: Meta<INotificationProps> = {
    title: '@Notification',
    component: Notification,
};

export default storyConfig;

const Template = (props: INotificationProps) => <Notification {...props} />;

export const Default: ComponentStory<typeof Notification> = Template.bind({});

Default.args = {
    logs: [
        {
            type: ELogTypes.event,
            tags: ['testing', 'hashtag'],
            text: 'Channel "RTVI" was restarted by scheduler at 15:55PM (IPBE)',
            date: '19 Jan, 15:56',
        },
        {
            type: ELogTypes.operation,
            tags: ['testing', 'hashtag'],
            text: 'Channel "RTVI" was restarted by scheduler at 15:55PM (IPBE)',
            date: '19 Jan, 15:56',
        },
    ],
};
