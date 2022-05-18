import {render} from "@testing-library/react";

import {IpbeListFilter} from "./index";

describe("Filter", () => {
    it("should render successfully", () => {
        const {baseElement} = render(<IpbeListFilter />);
        expect(baseElement).toBeTruthy();
    });
});
