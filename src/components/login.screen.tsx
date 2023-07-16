import {View, Text, Pressable, FlatList} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import React, {useEffect} from 'react';
import Colors from '@app/utils/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@app/navigation/type.navigation';
import {useNavigation} from '@react-navigation/native';
import {Users} from '@app/entities/users.entities';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppLoading from './common/loading.component';
import {useDispatch} from 'react-redux';
import {fetchListUsers, setUser} from '@app/redux/user/user.slice';
import {useAppSelector, useAppThunkDispatch} from '@app/redux/hook.redux';

type Props = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const userSelector = useAppSelector(state => state.user);
  const systemSelector = useAppSelector(state => state.system);
  const dispatch = useDispatch();
  const thunkDispatch = useAppThunkDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Props>();

  const onPressLogin = (user: Users) => {
    navigation.navigate('Home');
    dispatch(setUser(user));
  };

  useEffect(() => {
    thunkDispatch(fetchListUsers());
  }, [thunkDispatch]);

  const _renderEmptyList = () => {
    return (
      <View style={styles.container}>
        <Text>
          Some errors might happended, please try again after a few minutes
        </Text>
      </View>
    );
  };

  const _renderButtonLogin = (item: Users, index: number) => {
    return (
      <Pressable
        onPress={() => {
          onPressLogin(item);
        }}
        style={styles.button}
        key={index.toString()}>
        <Text style={styles.textButton}>{`Login as ${item.fullName}`}</Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.containerList}
        data={userSelector.listUser}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => _renderButtonLogin(item, index)}
        ListEmptyComponent={_renderEmptyList()}
      />
      <AppLoading
        isLoading={systemSelector.isLoading}
        text="Getting users list"
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    paddingHorizontal: '20@ms',
  },
  containerList: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: '15@ms',
    paddingVertical: '15@ms',
    borderRadius: '5@ms',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '15@vs',
  },
  textButton: {
    color: Colors.textWhite,
  },
});

export default LoginScreen;
