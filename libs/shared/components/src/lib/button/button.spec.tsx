import { render } from '@testing-library/react';

import { ButtonComponent } from '.';

describe('Button', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ButtonComponent />);
        expect(baseElement).toBeTruthy();
    });
});
