import { sharedFonts } from './shared-fonts';

describe('sharedFonts', () => {
    it('should work', () => {
        expect(sharedFonts()).toEqual('shared-fonts');
    });
});
