import { render } from '@testing-library/react';

import { PaginationComponent } from '.';

describe('Pagination', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<PaginationComponent />);
        expect(baseElement).toBeTruthy();
    });
});
