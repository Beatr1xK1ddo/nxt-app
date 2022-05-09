import {ComponentStory, Meta} from "@storybook/react";
import {IpbeActionsStrip} from "./index";

const storyConfig: Meta = {
    title: "@Controller",
    component: IpbeActionsStrip,
};

export default storyConfig;
const Template = () => <IpbeActionsStrip />;
export const Default: ComponentStory<typeof IpbeActionsStrip> = Template.bind({});
