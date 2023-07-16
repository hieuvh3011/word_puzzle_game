import {View, Text, FlatList, Pressable} from 'react-native';
import React from 'react';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Colors from '@app/utils/colors';
import AppHeader from './common/header.component';
import strings from '@app/i18n';
import AppButton from './common/button.component';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppAvatar from './common/avatar.component';
import {useAppSelector} from '@app/redux/hook.redux';
import {Users} from '@app/entities/users.entities';
import {StackActions, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@app/navigation/type.navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackNavigationProp<RootStackParamList, 'Home'>;
function HomeScreen() {
  const insets = useSafeAreaInsets();
  const userSelector = useAppSelector(state => state.user);
  const navigation = useNavigation<Props>();

  const _onPressPlayGame = () => {
    navigation.navigate('Topic');
  };

  const _onPressLogout = () => {
    navigation.dispatch(StackActions.replace('Login'));
  };

  function _renderProfile() {
    return (
      <View style={styles.profile}>
        <AppAvatar username="hieuvu" bigAvatar={true} />
        <View style={styles.userInfo}>
          <Text
            style={
              styles.labelInfo
            }>{`${strings.home.username}: ${userSelector.userLoggedIn.username}`}</Text>
          <Text
            style={
              styles.labelInfo
            }>{`${strings.home.full_name}: ${userSelector.userLoggedIn.fullName}`}</Text>
          <Text
            style={
              styles.labelInfo
            }>{`${strings.home.score}: ${userSelector.userLoggedIn.score}`}</Text>
        </View>
      </View>
    );
  }

  function _renderScoreBoardItem(item: Users, index: number) {
    return (
      <View style={styles.scoreboardItem}>
        <Text>{`#${index + 1}`}</Text>
        <View style={styles.userAndScore}>
          <Text style={styles.usernameItem}>{item.username}</Text>
          <Text style={styles.scoreItem}>{item.score}</Text>
        </View>
        <AppAvatar username={item.username} />
      </View>
    );
  }

  function _renderHeaderList() {
    return (
      <View style={styles.headerList}>
        <Text style={styles.headerListText}>{strings.home.scoreboard}</Text>
      </View>
    );
  }

  function _renderScoreBoard() {
    return (
      <FlatList
        ListHeaderComponent={_renderHeaderList()}
        data={userSelector.listUser}
        style={styles.scoreboardArea}
        renderItem={({item, index}) => _renderScoreBoardItem(item, index)}
        keyExtractor={item => item.id}
      />
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        titleText={strings.home.word_puzzle_game}
        rightComponent={
          <Pressable
            onPress={_onPressLogout}
            hitSlop={{
              bottom: 10,
              left: 10,
              right: 10,
              top: 10,
            }}>
            <Icon
              name="logout"
              size={moderateScale(17)}
              color={Colors.buttonText}
            />
          </Pressable>
        }
      />
      <View style={styles.profileAndScoreBoard}>
        {_renderProfile()}
        {_renderScoreBoard()}
      </View>

      <View style={[styles.buttonArea, {paddingBottom: insets.bottom}]}>
        <AppButton
          onPress={_onPressPlayGame}
          text={strings.home.play_a_new_game}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  profileAndScoreBoard: {
    flex: 1,
    width: '100%',
  },
  profile: {
    width: '100%',
    alignItems: 'center',
    paddingTop: '10@vs',
  },
  userInfo: {
    width: '100%',
    paddingHorizontal: '15@ms',
    paddingTop: '15@vs',
  },
  buttonArea: {
    paddingVertical: '10@vs',
  },
  labelInfo: {
    fontSize: '13@ms',
  },
  contentInfo: {
    fontSize: '13@ms',
    fontWeight: 'bold',
  },
  scoreboardArea: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '15@ms',
  },
  scoreboardItem: {
    backgroundColor: Colors.itemBackground,
    paddingVertical: '10@vs',
    marginVertical: '5@vs',
    flexDirection: 'row',
    paddingHorizontal: '15@ms',
    borderRadius: '8@ms',
    alignItems: 'center',
  },
  userAndScore: {
    paddingHorizontal: '15@ms',
    flex: 1,
  },
  usernameItem: {
    fontSize: '13@ms',
    fontStyle: 'italic',
  },
  scoreItem: {
    fontSize: '13@ms',
    fontWeight: 'bold',
  },
  headerList: {
    paddingVertical: '10@vs',
    backgroundColor: Colors.secondary,
    marginTop: '10@vs',
    alignItems: 'center',
  },
  headerListText: {
    fontSize: '15@ms',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
