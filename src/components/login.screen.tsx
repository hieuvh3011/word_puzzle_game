import {View, Text, Pressable} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import React from 'react';
import Colors from '@app/utils/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@app/navigation/type.navigation';
import {useNavigation} from '@react-navigation/native';

type Props = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<Props>();
  const onPressLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPressLogin} style={styles.button}>
        <Text style={styles.textButton}>Login as fake user</Text>
      </Pressable>
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
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: '15@ms',
    paddingVertical: '15@ms',
    borderRadius: '5@ms',
  },
  textButton: {
    color: Colors.textWhite,
  },
});

export default LoginScreen;
