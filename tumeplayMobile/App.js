import React, {useState, useEffect} from 'react';
import Container from './src/components/global/Container';
import Onboarding from './src/views/Onboarding';
import Signup from './src/views/Signup';
import Thematiques from './src/views/Thematiques';
import EncryptedStorage from 'react-native-encrypted-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContentsPage from './src/views/Contents';

const NavigationStack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({
    isOnboarded: false,
    isSignedUp: false,
    isUnder25: null,
  });

  const generateuserId = () => {
    const user_id =
      Date.now().toString(36) + Math.random().toString(36).substr(2);
    user.user_id = user_id;
    setUser({...user});
  };

  const retrieveUserFromStorage = async () => {
    const tmpUser = await EncryptedStorage.getItem('user');
    if (tmpUser !== null) {
      let jsonUser = JSON.parse(tmpUser);
      setUser({...jsonUser});
    } else {
      generateuserId();
    }
  };

  const clearStorage = async () => {
    await EncryptedStorage.clear();
  };

  useEffect(() => {
    clearStorage();
    generateuserId();
    retrieveUserFromStorage();
  }, []);

  return (
    <Container>
      {!user?.isOnboarded && <Onboarding user={user} setUser={setUser} />}
      {user?.isOnboarded && !user?.isSignedUp && (
        <Signup user={user} setUser={setUser} />
      )}
      {user?.isOnboarded && user?.isSignedUp && (
        <NavigationContainer>
          <NavigationStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <NavigationStack.Screen
              name="Thematiques"
              component={Thematiques}
            />
            <NavigationStack.Screen
              name="ContentsPage"
              component={ContentsPage}
            />
            <NavigationStack.Screen name="Content" component={ContentsPage} />
          </NavigationStack.Navigator>
        </NavigationContainer>
      )}
    </Container>
  );
};

export default App;
