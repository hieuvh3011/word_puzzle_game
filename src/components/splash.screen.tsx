import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@app/navigation/type.navigation';
import strings from '@app/i18n';
import {ScaledSheet} from 'react-native-size-matters';

type Props = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

function SplashScreen() {
  const navigation = useNavigation<Props>();
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Login'));
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{strings.splash.simple_splash}</Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: '20@ms',
  },
});
export default SplashScreen;
