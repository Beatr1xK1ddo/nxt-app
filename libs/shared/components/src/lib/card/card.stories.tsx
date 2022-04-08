import { ComponentStory, Meta } from '@storybook/react';
import { Card } from './index';

const storyConfig: Meta = {
    title: '@Card',
    component: Card,
};

export default storyConfig;

const Template = () => <Card />;

export const Default: ComponentStory<typeof Card> = Template.bind({});

// Default.args = {
//     label: 'Test btn',
// };
