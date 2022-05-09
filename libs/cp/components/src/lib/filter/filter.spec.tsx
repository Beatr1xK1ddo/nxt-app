import {render} from "@testing-library/react";

import {IpbeFilter} from ".";

describe("Filter", () => {
    it("should render successfully", () => {
        const {baseElement} = render(<IpbeFilter />);
        expect(baseElement).toBeTruthy();
    });
});
