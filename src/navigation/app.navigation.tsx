import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStack from './stack.navigation';

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default AppNavigation;
