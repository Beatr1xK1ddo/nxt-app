import { ComponentStory, Meta } from '@storybook/react';
import { TextComponent } from './index';
import { TextFieldProps } from '@mui/material/TextField';

const storyConfig: Meta<TextFieldProps> = {
    title: '@TextField',
    component: TextComponent,
};

export default storyConfig;

const Template = (props: TextFieldProps) => <TextComponent {...props} />;

export const Default: ComponentStory<typeof TextComponent> = Template.bind({});

Default.args = {
    label: 'Label',
};
