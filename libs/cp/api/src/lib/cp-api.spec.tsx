import { render } from '@testing-library/react';

import CpApi from './cp-api';

describe('CpApi', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CpApi />);
        expect(baseElement).toBeTruthy();
    });
});
