import {render} from "@testing-library/react";

import {Ibpe1} from ".";

describe("Ibpe1", () => {
    it("should render successfully", () => {
        const {baseElement} = render(<Ibpe1 />);
        expect(baseElement).toBeTruthy();
    });
});
