import {render} from "@testing-library/react";

import {CheckboxComponent} from ".";

describe("Checkbox", () => {
    it("should render successfully", () => {
        const {baseElement} = render(<CheckboxComponent />);
        expect(baseElement).toBeTruthy();
    });
});
