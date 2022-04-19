import { ComponentStory, Meta } from '@storybook/react';
import { InputText } from './index';
import { IInputTextProps } from './types';

const storyConfig: Meta<IInputTextProps> = {
    title: '@TextField',
    component: InputText,
};

export default storyConfig;

const Template = (props: IInputTextProps) => <InputText {...props} />;

export const Default: ComponentStory<typeof InputText> = Template.bind({});

Default.args = {
    label: 'Label',
};

export const WithIcon: ComponentStory<typeof InputText> = Template.bind({});

WithIcon.args = {
    label: 'Label',
<<<<<<< HEAD
    icon: 'search',
};
=======
    icon: 'search',
};
>>>>>>> 55be413ee5e7f69fa57977e5d67fbaa213eb7790
