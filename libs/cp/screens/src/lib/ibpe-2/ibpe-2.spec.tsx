import {render} from "@testing-library/react";

import {Ibpe2} from "./index";

describe("Ibpe2", () => {
    it("should render successfully", () => {
        const {baseElement} = render(<Ibpe2 />);
        expect(baseElement).toBeTruthy();
    });
});
