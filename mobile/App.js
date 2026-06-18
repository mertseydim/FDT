import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './context';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [auth, setAuth] = useState({ token: null, userId: null, username: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Giriş Yap' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Kayıt Ol' }} />
          <Stack.Screen name="Feed" component={FeedScreen} options={{ title: 'Forum Akışı' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}