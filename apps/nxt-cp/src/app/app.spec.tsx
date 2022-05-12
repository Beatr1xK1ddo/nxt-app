import {render} from "@testing-library/react";

import {BrowserRouter} from "react-router-dom";

import Cp from "./app";

describe("App", () => {
    it("should render successfully", () => {
        const {baseElement} = render(
            <BrowserRouter>
                <Cp />
            </BrowserRouter>
        );

        expect(baseElement).toBeTruthy();
    });

    it("should have a greeting as the title", () => {
        const {getByText} = render(
            <BrowserRouter>
                <Cp />
            </BrowserRouter>
        );

        expect(getByText(/Welcome nxt-cp/gi)).toBeTruthy();
    });
});
