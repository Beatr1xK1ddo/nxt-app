import {EColors} from "@nxt-ui/colors";
import {ComponentStory, Meta} from "@storybook/react";
import {Button} from "./index";
import {IButtonProps} from "./types";

const storyConfig: Meta<IButtonProps> = {
    title: "@Button",
    component: Button,
};

export default storyConfig;

const Template = (props: IButtonProps) => <Button {...props}>Test</Button>;

export const Default: ComponentStory<typeof Button> = Template.bind({});

Default.args = {
    bgColor: EColors.error,
};

export const WithIconLeft: ComponentStory<typeof Button> = Template.bind({});

WithIconLeft.args = {
    icon: "filter",
    iconBefore: true,
};

export const WithIconRight: ComponentStory<typeof Button> = Template.bind({});

WithIconRight.args = {
    icon: "filter",
    iconAfter: true,
};
