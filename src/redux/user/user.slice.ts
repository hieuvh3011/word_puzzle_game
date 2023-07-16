import {Users} from '@app/entities/users.entities';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setLoading} from '@app/redux/system/system.slice';
import {getAllUsers} from '@app/repository/users.repository';
import {Alert} from 'react-native';

export interface UserState {
  listUser: Array<Users>;
  userLoggedIn: Users;
}

const initialState: UserState = {
  listUser: [],
  userLoggedIn: {
    id: '',
    username: '',
    fullName: '',
    score: '',
  },
};

export const fetchListUsers = createAsyncThunk(
  'fetch_list_user',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(
      setLoading({isLoading: true, textLoading: 'Getting List Users'}),
    );
    const data: Array<Users> = await getAllUsers().catch(error => {
      thunkAPI.dispatch(setLoading({isLoading: false, textLoading: ''}));
      Alert.alert('Error', error.message || 'Getting undefined error');
      return [];
    });
    thunkAPI.dispatch(setLoading({isLoading: false, textLoading: ''}));
    return data;
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Users>) => {
      Object.assign(state.userLoggedIn, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
