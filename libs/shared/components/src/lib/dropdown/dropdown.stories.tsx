import { ComponentStory, Meta } from '@storybook/react';
import { DropdownComponent } from './index';
import { IDropdownProps } from './types';

const storyConfig: Meta<IDropdownProps> = {
    title: '@Dropdown',
    component: DropdownComponent,
};

export default storyConfig;

const Template = (props: IDropdownProps) => <DropdownComponent {...props} />;

export const Default: ComponentStory<typeof DropdownComponent> = Template.bind(
    {}
);

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

Default.args = {
    values: names,
    label: 'Choose element',
};
