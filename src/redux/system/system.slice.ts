import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface SystemState {
  isLoading: boolean;
  textLoading: string;
}

const initialState: SystemState = {
  isLoading: false,
  textLoading: '',
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<SystemState>) => {
      state.isLoading = action.payload.isLoading;
      state.textLoading = action.payload.textLoading;
    },
  },
});

export const {setLoading} = systemSlice.actions;
export const selectSystem = (state: SystemState) => state;

export default systemSlice.reducer;
