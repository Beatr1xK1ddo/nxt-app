import { render } from '@testing-library/react';

import CpComponents from './cp-components';

describe('CpComponents', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CpComponents />);
        expect(baseElement).toBeTruthy();
    });
});
