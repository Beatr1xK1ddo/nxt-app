import { render } from '@testing-library/react';

import CpScreens from './cp-screens';

describe('CpScreens', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CpScreens />);
        expect(baseElement).toBeTruthy();
    });
});
