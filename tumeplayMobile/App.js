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
import QuizzStartPage from './src/views/QuizzStartPage';
import {useQuery} from '@apollo/client';
import {GET_THEMES} from './src/services/api/themes';
import AppContext from './AppContext';
import QuizzModule from './src/components/Quizz/QuizzModule';
import QuizzFinishScreen from './src/components/Quizz/QuizzFinishScreen';
const NavigationStack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({
    isOnboarded: false,
    isSignedUp: false,
    isUnder25: null,
    firstname: '',
  });

  const [points, setPoints] = useState(0);
  const [doneModules_ids, setDoneModules_ids] = useState([]);

  console.log('APP', doneModules_ids);

  const [thematiques, setThematiques] = useState([]);

  const {data, loading} = useQuery(GET_THEMES);

  useEffect(() => {
    if (!loading) {
      setThematiques(data?.thematiques);
    }
  }, [loading, data]);

  const saveUserPoints = async () => {
    const tmpUser = await EncryptedStorage.getItem('user');
    let jsonUser = JSON.parse(tmpUser);
    if (tmpUser !== null) {
      jsonUser.points = points;
      await EncryptedStorage.setItem(
        'user',
        JSON.stringify({
          user_id: jsonUser.user_id,
          isOnboarded: jsonUser.isOnboarded,
          isSignedUp: jsonUser.isSignedUp,
          isUnder25: jsonUser.isUnder25,
          firstname: jsonUser.firstname,
          points: jsonUser.points,
        }),
      );
    }
    setUser({...jsonUser});
  };

  useEffect(() => {
    saveUserPoints();
  }, [points]);

  const saveDoneModulesIds = async () => {
    await EncryptedStorage.setItem(
      'doneModules_id',
      JSON.stringify(doneModules_ids),
    );
  };

  useEffect(() => {
    saveDoneModulesIds();
  }, [doneModules_ids]);

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

  const retrievePoints = async () => {
    const tmpUser = await EncryptedStorage.getItem('user');
    if (tmpUser !== null) {
      let jsonUser = JSON.parse(tmpUser);
      setPoints(jsonUser.points);
    }
  };

  const retrieveDoneModulesIds = async () => {
    const tmpDoneModulesIds = await EncryptedStorage.getItem('doneModules_id');
    let jsonTmpDoneModulesIds = JSON.parse(tmpDoneModulesIds);
    console.log('retrieve', jsonTmpDoneModulesIds);
    setDoneModules_ids(jsonTmpDoneModulesIds);
  };

  // const clearStorage = async () => {
  //   await EncryptedStorage.clear();
  // };

  useEffect(() => {
    // clearStorage();
    generateuserId();
    retrieveUserFromStorage();
    retrievePoints();
    retrieveDoneModulesIds();
  }, []);

  const contextValues = {
    thematiques,
    points,
    setPoints,
    doneModules_ids,
    setDoneModules_ids,
  };

  return (
    <AppContext.Provider value={contextValues}>
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
              <NavigationStack.Screen
                name="QuizzStartPage"
                component={QuizzStartPage}
              />
              <NavigationStack.Screen
                name="QuizzModule"
                component={QuizzModule}
              />
              <NavigationStack.Screen
                name="QuizzFinishScreen"
                component={QuizzFinishScreen}
              />
            </NavigationStack.Navigator>
          </NavigationContainer>
        )}
      </Container>
    </AppContext.Provider>
  );
};

export default App;
