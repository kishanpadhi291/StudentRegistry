import React from 'react';
import { render } from '@testing-library/react';
import HobbiesDropdown from './HobbiesDropdown';

describe('HobbiesDropdown', () => {
    it('Renders HobbiesDropdown without crashing', () => {
        const { container } = render(<HobbiesDropdown />);
        expect(container).toBeTruthy()
    });

    it('Sets default values correctly in HobbiesDropdown', () => {
        const defaultValue = 'Reading,Coding';
        const { getByLabelText } = render(<HobbiesDropdown defaultValue={defaultValue} />);

        const selectedChips = getByLabelText('Hobbies').querySelectorAll('.MuiChip-label');
        expect(selectedChips).toHaveLength(defaultValue.split(',').length);
        selectedChips.forEach((chip, index) => {
            expect(chip.textContent).toBe(defaultValue.split(',')[index]);
        });
    });

})

