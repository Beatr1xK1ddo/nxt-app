import {ComponentStory, Meta} from "@storybook/react";
import {IpbeListFilter} from "./index";

const storyConfig: Meta = {
    title: "@Filter",
    component: IpbeListFilter,
};

export default storyConfig;

const Template = () => <IpbeListFilter />;

export const Default: ComponentStory<typeof IpbeListFilter> = Template.bind({});
