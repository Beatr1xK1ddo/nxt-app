import { render } from '@testing-library/react';

import Controller from './controller';

describe('Controller', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Controller />);
        expect(baseElement).toBeTruthy();
    });
});
