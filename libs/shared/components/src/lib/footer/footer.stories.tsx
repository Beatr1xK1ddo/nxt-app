import { ComponentStory, Meta } from '@storybook/react';
import { Footer } from './index';

const storyConfig: Meta = {
    title: '@Footer',
    component: Footer,
};

export default storyConfig;

const Template = () => <Footer />;

export const Default: ComponentStory<typeof Footer> = Template.bind({});
