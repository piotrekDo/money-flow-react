import { create } from 'zustand';

export type Mode = 'MONTH' | 'YEAR';

interface SelectedTimeState {
    selectedDate: Date,
    selectedMode: Mode
    setSelectedDate: (newDate: Date, newMode: Mode | null) => void;
}

const useSelectedTimeState = create<SelectedTimeState>(set => ({
    selectedDate: new Date(),
    selectedMode: 'MONTH',
    setSelectedDate: (newDate, newMode) => set(store => ({
        ...store,
        selectedDate: newDate,
        selectedMode: newMode ? newMode : store.selectedMode
    }))
}));

export default useSelectedTimeState;