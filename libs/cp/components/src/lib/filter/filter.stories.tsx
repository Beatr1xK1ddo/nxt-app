import { ComponentStory, Meta } from '@storybook/react';
import { Filter } from './index';

const storyConfig: Meta = {
    title: '@Filter',
    component: Filter,
};

export default storyConfig;

const Template = () => <Filter />;

export const Default: ComponentStory<typeof Filter> = Template.bind(
    {}
);
