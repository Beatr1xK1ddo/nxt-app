import { render } from '@testing-library/react';

import { DropdownComponent } from './index';

describe('Dropdown', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DropdownComponent />);
        expect(baseElement).toBeTruthy();
    });
});
