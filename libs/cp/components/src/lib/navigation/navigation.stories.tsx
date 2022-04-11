import { ComponentStory, Meta } from '@storybook/react';
import { Navigation } from './index';
import { INavigationProps } from './types';

const storyConfig: Meta<INavigationProps> = {
    title: '@Navigation',
    component: Navigation,
};

export default storyConfig;

const Template = (props: INavigationProps) => <Navigation {...props} />;

export const Default: ComponentStory<typeof Navigation> = Template.bind(
    {}
);

Default.args = {
    username: 'StevenQ'
}
