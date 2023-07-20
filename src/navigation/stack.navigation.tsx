import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@app/components/home.screen';
import LoginScreen from '@app/components/login.screen';
import GameScreen from '@app/components/game.screen';
import SplashScreen from '@app/components/splash.screen';
import {RootStackParamList} from './type.navigation';
import TopicScreen from '@app/components/topic.screen';
import ResultScreen from '@app/components/result.screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Splash'}>
      <Stack.Screen name={'Splash'} component={SplashScreen} />
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'Game'} component={GameScreen} />
      <Stack.Screen name={'Topic'} component={TopicScreen} />
      <Stack.Screen name={'Result'} component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
