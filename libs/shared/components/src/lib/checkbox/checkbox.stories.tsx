import {ComponentStory, Meta} from "@storybook/react";
import {CheckboxComponent} from "./index";
import {CheckboxProps} from "@mui/material/Checkbox";

const storyConfig: Meta<CheckboxProps> = {
    title: "@Checkbox",
    component: CheckboxComponent,
};

export default storyConfig;

const Template = (props: CheckboxProps) => <CheckboxComponent {...props} />;

export const Default: ComponentStory<typeof CheckboxComponent> = Template.bind({});
