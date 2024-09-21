import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack, AuthStack} from './src/stack';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/utlis/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Loading} from './src/components';
import {StripeProvider} from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

const App = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('@access_token');
      setToken(storedToken);
      setLoading(false);
    };

    checkToken();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <NavigationContainer>
          <StripeProvider publishableKey="pk_test_51N41wCKvbhlMKkRFilEcEs3gF0FhFXA4df4vKJGhUpuPQGhNAscwUuuZNOpfCcwsdXtY9x02Ygm3krayWsJftZdX00IL8Mhy5W">
            <StatusBar
              barStyle="dark-content"
              animated={true}
              backgroundColor="#FFFAF8"
            />
            {token ? <AppStack /> : <AuthStack />}
          </StripeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
