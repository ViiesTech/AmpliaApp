import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const App = () => {

  useEffect(() => {
    SystemNavigationBar.stickyImmersive();
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;