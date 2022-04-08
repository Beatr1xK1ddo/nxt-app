import { render } from '@testing-library/react';

import CpDucks from './cp-ducks';

describe('CpDucks', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CpDucks />);
        expect(baseElement).toBeTruthy();
    });
});
