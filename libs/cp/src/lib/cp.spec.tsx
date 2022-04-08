import { render } from '@testing-library/react';

import Cp from './cp';

describe('Cp', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Cp />);
        expect(baseElement).toBeTruthy();
    });
});
