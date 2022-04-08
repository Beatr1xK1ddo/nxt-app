import { ComponentStory, Meta } from '@storybook/react';
import { Navigation } from './index';

const storyConfig: Meta = {
    title: '@Navigation',
    component: Navigation,
};

export default storyConfig;

const Template = () => <Navigation />;

export const Default: ComponentStory<typeof Navigation> = Template.bind({});
