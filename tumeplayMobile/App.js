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
import {
  GET_HISTORIQUES,
  GET_MOBILE_USER,
} from './src/services/api/mobile_users';
const NavigationStack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const [userHistory, setUserHistory] = useState([]);
  const [points, setPoints] = useState(0);
  const [doneModules_ids, setDoneModules_ids] = useState([]);

  const [thematiques, setThematiques] = useState([]);

  const checkUserIdInStorage = async () => {
    const user_id = JSON.parse(await EncryptedStorage.getItem('user'))?.user_id;
    user.user_id = user_id;
    if (user_id) {
      setUser({...user});
    }
  };

  const useMultipleQuery = () => {
    const res1 = useQuery(GET_THEMES);
    const res2 = useQuery(GET_MOBILE_USER, {
      variables: {
        user_id: user?.user_id,
      },
    });
    const res3 = useQuery(GET_HISTORIQUES);
    return [res1, res2, res3];
  };

  const [
    {data: data1, loading: loading1},
    {data: data2, loading: loading2},
    {data: data3, loading: loading3},
  ] = useMultipleQuery();

  useEffect(() => {
    if (!loading1) {
      setThematiques(data1?.thematiques);
    }
  }, [loading1, data1]);

  const retrieveUserFromAPI = async () => {
    let userID = JSON.parse(await EncryptedStorage.getItem('user')).user_id;
    if (userID !== '') {
      setUser({...data2.utilisateursMobile});
    }
  };

  useEffect(() => {
    if (!loading2) {
      retrieveUserFromAPI();
    }
  }, [loading2, data2]);

  // const saveUserPoints = async () => {
  //   const tmpUser = await EncryptedStorage.getItem('user');
  //   let jsonUser = JSON.parse(tmpUser);
  //   if (tmpUser !== null) {
  //     jsonUser.points = points;
  //     await EncryptedStorage.setItem(
  //       'user',
  //       JSON.stringify({
  //         user_id: jsonUser.user_id,
  //         isOnboarded: jsonUser.isOnboarded,
  //         isSignedUp: jsonUser.isSignedUp,
  //         isUnder25: jsonUser.isUnder25,
  //         firstname: jsonUser.firstname,
  //         points: jsonUser.points,
  //       }),
  //     );
  //   }
  //   setUser({...jsonUser});
  // };

  // useEffect(() => {
  //   saveUserPoints();
  // }, [points]);

  const saveDoneModulesIds = async () => {
    await EncryptedStorage.setItem(
      'doneModules_id',
      JSON.stringify(doneModules_ids),
    );
  };

  useEffect(() => {
    saveDoneModulesIds();
  }, [doneModules_ids]);

  // const retrievePoints = async () => {
  //   const tmpUser = await EncryptedStorage.getItem('user');
  //   if (tmpUser !== null) {
  //     let jsonUser = JSON.parse(tmpUser);
  //     setPoints(jsonUser.points);
  //   }
  // };

  const retrieveDoneModulesIds = async () => {
    const tmpDoneModulesIds = await EncryptedStorage.getItem('doneModules_id');
    let jsonTmpDoneModulesIds = JSON.parse(tmpDoneModulesIds);
    setDoneModules_ids([...jsonTmpDoneModulesIds]);
  };

  const clearStorage = async () => {
    await EncryptedStorage.clear();
  };

  useEffect(() => {
    // clearStorage();
    // retrieveUserFromStorage();
    // retrievePoints();
    checkUserIdInStorage();
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
