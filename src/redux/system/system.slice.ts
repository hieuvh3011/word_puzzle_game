import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface SystemState {
  loading: LoadingState;
  isRefreshing: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  textLoading: string;
}

const initialState: SystemState = {
  loading: {
    isLoading: false,
    textLoading: '',
  },
  isRefreshing: false,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<LoadingState>) => {
      Object.assign(state.loading, action.payload);
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
  },
});

export const {setLoading, setRefreshing} = systemSlice.actions;
export const selectSystem = (state: SystemState) => state;

export default systemSlice.reducer;
