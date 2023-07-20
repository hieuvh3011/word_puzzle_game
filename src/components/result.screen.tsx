import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AppHeader from './common/header.component';
import {ScaledSheet} from 'react-native-size-matters';
import strings from '@app/i18n';
import {useAppSelector, useAppThunkDispatch} from '@app/redux/hook.redux';
import AppButton from './common/button.component';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@app/navigation/type.navigation';
import {useDispatch} from 'react-redux';
import {resetCorrectAnswer, resetScore} from '@app/redux/topic/topic.slice';
import Colors from '@app/utils/colors';
import {updateScoreOfUser} from '@app/repository/users.repository';
import {refreshCurrentUser, refreshListUser} from '@app/redux/user/user.slice';

type Props = NativeStackNavigationProp<RootStackParamList, 'Result'>;

export default function ResultScreen() {
  const topicSelector = useAppSelector(state => state.topic);
  const userSelector = useAppSelector(state => state.user);
  const navigation = useNavigation<Props>();
  const dispatch = useDispatch();
  const thunkDispatch = useAppThunkDispatch();

  const _onPressGoToHome = () => {
    dispatch(resetCorrectAnswer());
    dispatch(resetScore());
    thunkDispatch(refreshListUser());
    thunkDispatch(refreshCurrentUser(userSelector.userLoggedIn));
    navigation.pop(3);
  };

  useEffect(() => {
    updateScoreOfUser(userSelector.userLoggedIn, topicSelector.score);
  }, [topicSelector.score, userSelector.userLoggedIn]);

  return (
    <View style={styles.container}>
      <AppHeader titleText="Result Screen" />
      <View style={styles.contentContainer}>
        <Text style={styles.thank}>{strings.result.thank_you}</Text>
        <Text style={styles.achievement}>
          {strings.result.your_achievement}
        </Text>
        <Text>
          <Text style={styles.correctText}>
            {`${strings.result.correct}: ${topicSelector.correctAnswer}/`}
          </Text>
          <Text style={styles.text}>
            {topicSelector.selectedTopic.puzzles.length}
          </Text>
        </Text>
        <Text>
          <Text style={styles.incorrectText}>
            {`${strings.result.incorrect}: ${
              topicSelector.selectedTopic.puzzles.length -
              topicSelector.correctAnswer
            }/`}
          </Text>
          <Text style={styles.text}>
            {topicSelector.selectedTopic.puzzles.length}
          </Text>
        </Text>
        <Text style={styles.text}>
          {`${strings.result.score}: +${topicSelector.score} ${strings.result.point}`}
        </Text>
        <Text style={styles.note}>
          {strings.result.your_score_will_be_recorded}
        </Text>
      </View>
      <AppButton
        text={strings.result.back_to_home}
        onPress={_onPressGoToHome}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: '15@ms',
  },
  thank: {
    fontSize: '16@ms',
    marginVertical: '10@vs',
    textAlign: 'center',
  },
  achievement: {
    marginTop: '15@vs',
    marginBottom: '10@vs',
    fontWeight: 'bold',
    fontSize: '14@ms',
  },
  text: {
    fontSize: '14@ms',
  },
  correctText: {
    fontSize: '14@ms',
    color: Colors.success,
  },
  incorrectText: {
    fontSize: '14@ms',
    color: Colors.error,
  },
  note: {
    fontSize: '12@ms',
    marginVertical: '10@vs',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
