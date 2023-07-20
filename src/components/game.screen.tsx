import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AppHeader from './common/header.component';
import strings from '@app/i18n';
import Colors from '@app/utils/colors';
import {useAppSelector} from '@app/redux/hook.redux';
import {
  calculateScore,
  isAnswerCorrect,
  shuffle,
} from '@app/helper/game.helper';
import AppButton from './common/button.component';
import {Puzzle} from '@app/entities/puzzle.entities';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@app/navigation/type.navigation';
import {useDispatch} from 'react-redux';
import {
  increaseCorrectAnswer,
  resetCorrectAnswer,
  resetScore,
  setScore,
} from '@app/redux/topic/topic.slice';

type Props = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

let cursor: number = 0;
let currentScore: number = 0;
enum AnswerStatus {
  Unknown,
  Success,
  Fail,
}

function GameScreen() {
  const topicSelector = useAppSelector(state => state.topic);
  const {puzzles} = topicSelector.selectedTopic;
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle>(
    puzzles[puzzleIndex],
  );
  const [answerArray, setAnswerArray] = useState<Array<string>>([]);
  const [hintArray, setHintArray] = useState<Array<string>>([]);
  const [question, setQuestion] = useState<string>('');
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(
    AnswerStatus.Unknown,
  );
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const navigation = useNavigation<Props>();
  const dispatch = useDispatch();

  useEffect(() => {
    _setupQuestionAndHint(currentPuzzle);
  }, [currentPuzzle]);

  useEffect(() => {
    return () => {
      dispatch(resetScore());
      dispatch(resetCorrectAnswer());
    };
  }, [dispatch]);

  function _setupQuestionAndHint(puzzle: Puzzle) {
    const answerRemoveSpace = puzzle.answer.replace(/\s+/g, '').toUpperCase();
    const answerLetters = shuffle(answerRemoveSpace.split(''));
    const hints: Array<string> = [];
    const answers: Array<string> = [];
    answerLetters.map(item => {
      hints.push(item);
      answers.push('');
    });
    setHintArray(hints);
    setAnswerArray(answers);
    setQuestion(puzzle.question);
  }

  function _dispatchScore(isCorrect: boolean) {
    currentScore += calculateScore(isCorrect, currentPuzzle);
    dispatch(setScore(currentScore));
  }

  function _dispatchCorrectAnswer(isCorrect: boolean) {
    if (isCorrect) {
      dispatch(increaseCorrectAnswer());
    }
  }

  function _moveToTheNextPuzzle() {
    const nextPuzzleIndex = puzzleIndex + 1;
    const nextPuzzle = puzzles[nextPuzzleIndex];
    _setupQuestionAndHint(nextPuzzle);
    cursor = 0;
    setPuzzleIndex(nextPuzzleIndex);
    setCurrentPuzzle(nextPuzzle);
    setAnswerStatus(AnswerStatus.Unknown);
  }

  function _onPressSubmit() {
    setButtonLoading(true);
    const isCorrect = isAnswerCorrect(answerArray, currentPuzzle);
    _dispatchScore(isCorrect);
    _dispatchCorrectAnswer(isCorrect);
    if (isCorrect) {
      setAnswerStatus(AnswerStatus.Success);
    } else {
      setAnswerStatus(AnswerStatus.Fail);
    }
    setTimeout(() => {
      setButtonLoading(false);
      if (puzzleIndex + 1 === puzzles.length) {
        cursor = 0;
        navigation.navigate('Result');
      } else {
        _moveToTheNextPuzzle();
      }
    }, 2000);
  }
  function _onPressResetAnswer() {
    _setupQuestionAndHint(currentPuzzle);
    cursor = 0;
  }

  function _onPressLetterHint(item: string, index: number) {
    if (item === '') {
      return;
    }
    if (cursor < answerArray.length) {
      const newAnswerArray = [...answerArray];
      newAnswerArray[cursor] = item;

      setAnswerArray(newAnswerArray);

      const newHintArray = [...hintArray];
      newHintArray[index] = '';
      setHintArray(newHintArray);
      cursor++;
    }
  }

  function _renderAnswerStatus() {
    switch (answerStatus) {
      case AnswerStatus.Unknown:
        return <View />;
      case AnswerStatus.Success:
        return (
          <View style={styles.status}>
            <Icons
              name="check"
              color={Colors.success}
              size={moderateScale(25)}
            />
            <Text style={styles.correctText}>
              {strings.game.your_answer_is_correct}
            </Text>
          </View>
        );
      case AnswerStatus.Fail:
        return (
          <View style={styles.status}>
            <Icons name="close" color={Colors.error} size={moderateScale(25)} />
            <Text style={styles.incorrectText}>
              {strings.game.your_answer_is_incorrect}
            </Text>
          </View>
        );
      default:
        return <View />;
    }
  }

  function _renderAnswer() {
    return answerArray.map((item, index) => {
      return (
        <View style={styles.letter} key={index.toString()}>
          <Text>{item}</Text>
        </View>
      );
    });
  }

  function _renderQuestion() {
    return (
      <View style={styles.question}>
        <Text>{question}</Text>
      </View>
    );
  }

  function _renderHints() {
    return hintArray.map((item, index) => {
      return (
        <Pressable
          style={styles.letter}
          key={index.toString()}
          onPress={() => _onPressLetterHint(item, index)}>
          <Text>{item}</Text>
        </Pressable>
      );
    });
  }

  return (
    <View style={styles.container}>
      <AppHeader titleText={strings.game.puzzles} hasButtonBack={true} />
      <View style={styles.container}>
        <Text style={styles.currentPuzzle}>
          {`${strings.game.question} ${puzzleIndex + 1}/${puzzles.length}`}
        </Text>
        <View style={styles.answerArea}>{_renderAnswer()}</View>
        {_renderQuestion()}
        <View style={styles.answerArea}>{_renderHints()}</View>
        {_renderAnswerStatus()}
      </View>
      <AppButton
        text={strings.game.reset_answer}
        onPress={_onPressResetAnswer}
        loading={buttonLoading}
      />
      <Text style={styles.or}>{strings.game.or}</Text>
      <AppButton
        text={strings.game.submit_answer}
        onPress={_onPressSubmit}
        loading={buttonLoading}
      />
    </View>
  );
}

export default GameScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  currentPuzzle: {
    marginVertical: '15@vs',
    fontSize: '17@ms',
  },
  letter: {
    width: '37@ms',
    height: '37@vs',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: '4@ms',
    margin: '2@ms',
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
  or: {
    fontWeight: 'bold',
    fontSize: '14@ms',
    marginVertical: '5@vs',
    color: Colors.border,
  },
  status: {
    paddingHorizontal: '15@ms',
    paddingVertical: '20@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  correctText: {
    fontSize: '15@ms',
    color: Colors.success,
    marginLeft: '5@ms',
  },
  incorrectText: {
    fontSize: '15@ms',
    color: Colors.error,
    marginLeft: '5@ms',
  },
});
