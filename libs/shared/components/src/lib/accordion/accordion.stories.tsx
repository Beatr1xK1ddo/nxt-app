import {ComponentStory, Meta} from "@storybook/react";
import {AccordionComponent} from "./index";
import {IAccordionComponentProps} from "./types";

const elem = (
    <div>
        <div>Testing</div>
    </div>
);

const elem2 = (
    <div>
        <h3>Test Dropd Data</h3>
    </div>
);

const storyConfig: Meta<IAccordionComponentProps> = {
    title: "@Accordion",
    component: AccordionComponent,
};

export default storyConfig;

const Template = (props: IAccordionComponentProps) => <AccordionComponent {...props} />;

export const Default: ComponentStory<typeof AccordionComponent> = Template.bind({});

Default.args = {
    header: elem,
    content: elem2,
};
