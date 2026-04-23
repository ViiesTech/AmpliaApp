import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store/index'
import ToastMessage from './src/components/ToastMessage'
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {

  // App.js ya index.js ke top me
  if (typeof global.DOMException === 'undefined') {
    global.DOMException = class extends Error { };
  }


  useEffect(() => {
    SystemNavigationBar.stickyImmersive();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <StripeProvider publishableKey="pk_test_51TPN2L50Y2eXm2mJEmnwCVOzAeyIsGmxndXdGUoorm9J0YjgNpFpF2nTYrwtEKcFX88VP7rpSaka2dVMmS594eKn00NWRPKUvJ">
            <Routes />
            <ToastMessage position={'top'} />
          </StripeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;