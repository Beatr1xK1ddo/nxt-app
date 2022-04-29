import {ComponentStory, Meta} from "@storybook/react";
import {Icon} from "./icon";
import {IIconProps} from "./types";
import {EColors} from "@nxt-ui/colors";

const storyConfig: Meta<IIconProps> = {
    title: "@Icons",
    component: Icon,
    argTypes: {
        color: {
            options: EColors,
            control: {type: "select"},
        },
    },
};

export default storyConfig;

const Template = (props: IIconProps) => <Icon {...props} />;

export const Default: ComponentStory<typeof Icon> = Template.bind({});

Default.args = {
    name: "filter",
};
