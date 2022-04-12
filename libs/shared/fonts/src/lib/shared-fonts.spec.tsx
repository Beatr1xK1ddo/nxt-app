import { render } from '@testing-library/react';

import SharedFonts from './shared-fonts';

describe('SharedFonts', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<SharedFonts />);
        expect(baseElement).toBeTruthy();
    });
});
