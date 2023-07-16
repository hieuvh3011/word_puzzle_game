import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import AppHeader from './common/header.component';
import strings from '@app/i18n';
import Colors from '@app/utils/colors';
import {useAppSelector} from '@app/redux/hook.redux';
import {shuffle} from '@app/repository/game.repository';
import AppButton from './common/button.component';

function GameScreen() {
  const topicSelector = useAppSelector(state => state.topic);
  const firstPuzzle = topicSelector.selectedTopic.puzzles[4];

  const answerRemoveSpace = firstPuzzle.answer
    .replace(/\s+/g, '')
    .toUpperCase();
  const letters = answerRemoveSpace.split('');
  const answerLetters = shuffle(letters);

  function _onPressSubmit() {}

  function _onPressLetterAnswer(item: string, index: number) {}

  function _onPressLetterQuestion(item: String, index: number) {}

  function _renderAnswer() {
    return letters.map((item, index) => {
      return <Pressable style={styles.letter} key={index.toString()} />;
    });
  }

  function _renderQuestion() {
    return answerLetters.map((item, index) => {
      return (
        <Pressable
          style={styles.letter}
          key={index.toString()}
          onPress={() => _onPressLetterQuestion(item, index)}>
          <Text>{item}</Text>
        </Pressable>
      );
    });
  }

  function _renderHints() {
    return (
      <View style={styles.question}>
        <Text>{firstPuzzle.question}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader titleText={strings.game.puzzles} hasButtonBack={true} />
      <View style={styles.container}>
        <Text style={styles.status}>1/5</Text>
        <View style={styles.answerArea}>{_renderAnswer()}</View>
        {_renderHints()}
        <View style={styles.answerArea}>{_renderQuestion()}</View>
      </View>
      <AppButton text={strings.game.submit_answer} onPress={_onPressSubmit} />
    </View>
  );
}

export default GameScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  status: {
    marginVertical: '15@vs',
    fontSize: '15@ms',
  },
  letter: {
    width: '25@ms',
    height: '35@vs',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: '4@ms',
    margin: '5@ms',
  },
  answerArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: '30@ms',
  },
  question: {
    marginVertical: '30@vs',
  },
});
