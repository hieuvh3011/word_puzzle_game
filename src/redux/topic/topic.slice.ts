import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setLoading} from '@app/redux/system/system.slice';
import {Alert} from 'react-native';
import {Topic} from '@app/entities/topic.entities';
import strings from '@app/i18n';
import {getAllTopics} from '@app/repository/topic.repository';

export interface TopicState {
  listTopic: Array<Topic>;
  selectedTopic: Topic;
  correctAnswer: number;
  score: number;
}

const initialState: TopicState = {
  listTopic: [],
  selectedTopic: {
    id: '',
    name: '',
    puzzles: [],
  },
  correctAnswer: 0,
  score: 0,
};

export const fetchListTopic = createAsyncThunk(
  'fetch_list_topic',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(
      setLoading({
        isLoading: true,
        textLoading: strings.select_topic.getting_list_topic,
      }),
    );
    const data: Array<Topic> = await getAllTopics().catch(error => {
      thunkAPI.dispatch(setLoading({isLoading: false, textLoading: ''}));
      Alert.alert(
        strings.common.error,
        error.message || strings.common.undefined_error,
      );
      return [];
    });
    thunkAPI.dispatch(setLoading({isLoading: false, textLoading: ''}));
    return data;
  },
);

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<Topic>) => {
      Object.assign(state.selectedTopic, action.payload);
    },
    increaseCorrectAnswer: state => {
      state.correctAnswer = state.correctAnswer + 1;
    },
    resetCorrectAnswer: state => {
      state.correctAnswer = 0;
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    resetScore: state => {
      state.score = 0;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchListTopic.fulfilled, (state, action) => {
      state.listTopic = action.payload;
    });
  },
});

export const {
  setTopic,
  increaseCorrectAnswer,
  resetCorrectAnswer,
  setScore,
  resetScore,
} = topicSlice.actions;

export default topicSlice.reducer;
