import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; // <-- Добавили 'type'

interface FilterState {
  title: string;
  minVoltage: string;
  maxVoltage: string;
}

const initialState: FilterState = {
  title: '',
  minVoltage: '',
  maxVoltage: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterState>) => {
        state.title = action.payload.title;
        state.minVoltage = action.payload.minVoltage;
        state.maxVoltage = action.payload.maxVoltage;
    },
    resetFilters: () => initialState
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
