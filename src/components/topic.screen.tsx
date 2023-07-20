import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import AppHeader from './common/header.component';
import strings from '@app/i18n';
import {useAppSelector, useAppThunkDispatch} from '@app/redux/hook.redux';
import AppLoading from './common/loading.component';
import {Topic} from '@app/entities/topic.entities';
import AppButton from './common/button.component';
import Colors from '@app/utils/colors';
import {fetchListTopic, setTopic} from '@app/redux/topic/topic.slice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@app/navigation/type.navigation';

type Props = NativeStackNavigationProp<RootStackParamList, 'Home'>;

function TopicScreen() {
  const topicSelector = useAppSelector(state => state.topic);
  const systemSelector = useAppSelector(state => state.system);
  const thunkDispatch = useAppThunkDispatch();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props>();

  useEffect(() => {
    thunkDispatch(fetchListTopic());
  }, [thunkDispatch]);

  function _onPressSelectTopic(topic: Topic) {
    dispatch(setTopic(topic));
    navigation.navigate('Game');
  }

  function _renderItemTopic(item: Topic) {
    return (
      <AppButton
        text={item.name.toUpperCase()}
        onPress={() => _onPressSelectTopic(item)}
        style={styles.button}
        textStyle={styles.textButton}
      />
    );
  }

  function _renderEmptyList() {
    return (
      <View style={styles.emptyContainer}>
        <Text>{strings.common.undefined_error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        titleText={strings.select_topic.select_topic_screen}
        hasButtonBack={true}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {strings.select_topic.please_select_topic}
        </Text>
        <FlatList
          data={topicSelector.listTopic}
          renderItem={({item}) => _renderItemTopic(item)}
          keyExtractor={item => item.id}
          ListEmptyComponent={_renderEmptyList()}
        />
      </View>
      <AppLoading
        isLoading={systemSelector.loading.isLoading}
        text={systemSelector.loading.textLoading}
      />
    </View>
  );
}

export default TopicScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: '15@ms',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'left',
    marginVertical: '10@vs',
    fontSize: '14@ms',
  },
  button: {
    backgroundColor: Colors.blurGreen,
  },
  textButton: {
    color: Colors.text,
  },
});
