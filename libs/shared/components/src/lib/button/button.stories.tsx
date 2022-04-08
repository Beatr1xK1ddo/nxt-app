import { ComponentStory, Meta } from '@storybook/react';
import { ButtonComponent } from './index';
import { IButtonComponentProps } from './types';
import { Icon } from '@nxt-ui/icons';
import { EColors } from '@nxt-ui/colors';

const storyConfig: Meta<IButtonComponentProps> = {
    title: '@Button',
    component: ButtonComponent,
};

export default storyConfig;

const Template = (props: IButtonComponentProps) => (
    <ButtonComponent {...props} />
);

const TemplateIconLeft = (props: IButtonComponentProps) => (
    <ButtonComponent {...props} startIcon={<Icon name="filter" color={EColors.white} />}/>
);

const TemplateIconRight = (props: IButtonComponentProps) => (
    <ButtonComponent {...props} endIcon={<Icon name="plus" color={EColors.white} />}/>
);

export const Default: ComponentStory<typeof ButtonComponent> = Template.bind(
    {}
);

Default.args = {
    label: 'Test btn',
};


export const WithIconLeft: ComponentStory<typeof ButtonComponent> = TemplateIconLeft.bind(
    {}
);

WithIconLeft.args = {
    label: 'Test btn',
};


export const WithIconRight: ComponentStory<typeof ButtonComponent> = TemplateIconRight.bind(
    {}
);

WithIconRight.args = {
    label: 'Test btn',
};
