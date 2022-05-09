import {ComponentStory, Meta} from "@storybook/react";
import {IpbeFilter} from "./index";

const storyConfig: Meta = {
    title: "@Filter",
    component: IpbeFilter,
};

export default storyConfig;

const Template = () => <IpbeFilter />;

export const Default: ComponentStory<typeof IpbeFilter> = Template.bind({});
