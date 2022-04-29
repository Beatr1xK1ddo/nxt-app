import {ComponentStory, Meta} from "@storybook/react";
import {Dropdown} from "./index";
import {IDropdownProps} from "./types";

const storyConfig: Meta<IDropdownProps<unknown>> = {
    title: "@Dropdown",
    component: Dropdown,
};

export default storyConfig;

const Template = (props: IDropdownProps<unknown>) => <Dropdown {...props} />;

export const Default: ComponentStory<typeof Dropdown> = Template.bind({});

const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
];

Default.args = {
    values: names,
    label: "Choose element",
    icon: "arrow",
};
