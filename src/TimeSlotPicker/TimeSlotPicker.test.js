import { render, screen, fireEvent } from '@testing-library/react';
import TimeSlotPicker from './TimeSlotPicker';

describe('TimeSlotPicker', () => {
    test('renders the modal and selects a date and time slot', () => {
        render(<TimeSlotPicker />);

        const firstDate = screen.getByText('02');
        fireEvent.click(firstDate);

        const slotButton = screen.getByText('10:00AM');
        fireEvent.click(slotButton);

        expect(screen.getByText('Selected Time Slot:')).toBeInTheDocument();
        expect(screen.getByText('Date: 2024/08/02')).toBeInTheDocument();
        expect(screen.getByText('Time: 10:00AM - 10:30AM')).toBeInTheDocument();
    });
});
