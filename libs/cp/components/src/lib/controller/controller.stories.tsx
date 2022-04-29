import {ComponentStory, Meta} from "@storybook/react";
import {Controller} from "./index";
import {IControllerProps} from "./types";

const storyConfig: Meta<IControllerProps> = {
    title: "@Controller",
    component: Controller,
};

export default storyConfig;

const Template = (props: IControllerProps) => <Controller {...props} />;

export const Default: ComponentStory<typeof Controller> = Template.bind({});

Default.args = {
    from: 1,
    to: 20,
    len: 50,
};
