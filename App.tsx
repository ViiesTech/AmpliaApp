import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {store,persistor} from './src/redux/store/index'
import ToastMessage from './src/components/ToastMessage'

const App = () => {

  useEffect(() => {
    SystemNavigationBar.stickyImmersive();
  }, []);

  return (
  <Provider store={store}>  
    <PersistGate persistor={persistor} loading={null}>
    <NavigationContainer>
      <Routes />
      <ToastMessage position={'top'} />
    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
};

export default App;