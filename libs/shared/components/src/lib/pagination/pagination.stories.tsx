import { ComponentStory, Meta } from '@storybook/react';
import { PaginationComponent } from './index';
import { PaginationProps } from '@mui/material/Pagination';

const storyConfig: Meta<PaginationProps> = {
    title: '@Pagination',
    component: PaginationComponent,
};

export default storyConfig;

const Template = (props: PaginationProps) => <PaginationComponent {...props} />;

export const Default: ComponentStory<typeof PaginationComponent> =
    Template.bind({});

Default.args = {
    count: 10,
};
