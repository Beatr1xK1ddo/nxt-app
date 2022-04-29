import {render} from "@testing-library/react";

import {TextComponent} from ".";

describe("Text", () => {
    it("should render successfully", () => {
        const {baseElement} = render(<TextComponent />);
        expect(baseElement).toBeTruthy();
    });
});
