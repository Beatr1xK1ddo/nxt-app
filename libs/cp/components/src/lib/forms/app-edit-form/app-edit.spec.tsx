import { render } from '@testing-library/react';

import { AppEditForm } from '.';

describe('AppEdit', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<AppEditForm />);
        expect(baseElement).toBeTruthy();
    });
});
