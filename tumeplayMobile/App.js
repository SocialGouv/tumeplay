import React, {useState, useEffect} from 'react';
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
import Journey from './src/views/Journey';

const NavigationStack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const [userHistory, setUserHistory] = useState([]);
  const [points, setPoints] = useState(0);
  const [doneModules_ids, setDoneModules_ids] = useState([]);

  const [thematiques, setThematiques] = useState([]);

  const checkUserIdInStorage = async () => {
    let encryptedUser = await EncryptedStorage.getItem('user');
    if (encryptedUser) {
      const tmpUser = JSON.parse(encryptedUser);
      const tmpUser_id = tmpUser?.user_id;
      if (tmpUser_id) {
        user.user_id = tmpUser_id;
        setUser({...user});
      }
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

  const retrieveDoneModulesIds = () => {
    let tmpIds = userHistory?.map(history => history && history[0]?.module?.id);
    setDoneModules_ids([...tmpIds]);
  };

  useEffect(() => {
    retrieveDoneModulesIds();
  }, [userHistory]);

  useEffect(() => {
    if (!loading3 && data3) {
      setUserHistory([data3?.historiques]);
      if (user) {
        setPoints(user?.points);
      }
    }
  }, [loading3, data3]);

  useEffect(() => {
    if (!loading1 && data1) {
      setThematiques([...data1.thematiques]);
    }
  }, [loading1, data1]);

  useEffect(() => {
    if (!loading2) {
      retrieveUserFromAPI();
    }
  }, [loading2, data2]);

  const retrieveUserFromAPI = async () => {
    let encryptedUser = await EncryptedStorage.getItem('user');
    if (encryptedUser) {
      const tmpUser = JSON.parse(encryptedUser);
      const tmpUser_id = tmpUser?.user_id;
      if (tmpUser_id !== '') {
        setUser({...data2?.utilisateursMobile});
      }
    }
  };

  const clearStorage = async () => {
    await EncryptedStorage.clear();
  };

  useEffect(() => {
    // clearStorage();
    checkUserIdInStorage();
  }, []);

  console.log(user);

  const contextValues = {
    user_id: user.user_id,
    strapi_user_id: user.id,
    thematiques,
    points,
    setPoints,
    doneModules_ids,
    setDoneModules_ids,
    userHistory,
    setUserHistory,
  };

  return (
    <AppContext.Provider value={contextValues}>
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
            <NavigationStack.Screen name="Parcours" component={Journey} />
          </NavigationStack.Navigator>
        </NavigationContainer>
      )}
    </AppContext.Provider>
  );
};

export default App;
