import React, {useState, useEffect} from 'react';
import Container from './src/components/global/Container';
import Onboarding from './src/views/Onboarding';
import Signup from './src/views/Signup';
import EncryptedStorage from 'react-native-encrypted-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContentsPage from './src/views/Contents';
import ContentPage from './src/views/Contents/ContentPage';
import Navbar from './src/components/Navbar';

const NavigationStack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({
    isOnboarded: false,
    isSignedUp: false,
    isUnder25: null,
    firstname: '',
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

  // const clearStorage = async () => {
  //   await EncryptedStorage.clear();
  // };

  useEffect(() => {
    // clearStorage();
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
            <NavigationStack.Screen name="Home" component={Navbar} />
            <NavigationStack.Screen
              name="ContentsPage"
              component={ContentsPage}
            />
            <NavigationStack.Screen name="Content" component={ContentPage} />
          </NavigationStack.Navigator>
        </NavigationContainer>
      )}
    </Container>
  );
};

export default App;
