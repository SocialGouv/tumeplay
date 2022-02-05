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
import {useLazyQuery, useQuery} from '@apollo/client';
import {GET_THEMES} from './src/services/api/themes';
import AppContext from './AppContext';
import QuizzModule from './src/components/Quizz/QuizzModule';
import BoxOrder from './src/views/BoxOrder';
import Box from './src/views/Box';
import QuizzFinishScreen from './src/components/Quizz/QuizzFinishScreen';
import {View, Text, StyleSheet} from 'react-native';
import {
  GET_HISTORIQUES,
  GET_MOBILE_USER,
} from './src/services/api/mobile_users';
import Journey from './src/views/Journey';
import { filter } from 'core-js/core/array';
const NavigationStack = createNativeStackNavigator();
const App = () => {
  const [user, setUser] = useState({});
  const [points, setPoints] = useState(null);
  const [doneModules_ids, setDoneModules_ids] = useState([]);
  const [thematiques, setThematiques] = useState([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const {data: data1, loading: loading1} = useQuery(GET_THEMES);

  const checkUserIdInStorage = async () => {
    let encryptedUser = await EncryptedStorage.getItem('user');
    if (encryptedUser) {
      const tmpUser = JSON.parse(encryptedUser);
      const tmpUser_id = tmpUser?.user_id;
      if (tmpUser_id) {
        user.user_id = tmpUser_id;
        setUser({...user});
        getMobileUser({
          variables: {
            user_id: user.user_id,
          },
        });
      }
    } else {
      setIsUserLoaded(true);
      setPoints(0);
      setUser({points: 0});
    }
  };

  const [getMobileUser, { data: data2, loading: loading2, error: error2 }] = useLazyQuery(GET_MOBILE_USER);

  const retrieveDoneModulesIds = () => {
    let tmpIds = user?.history
      ?.filter(history => history.status === 'success')
      ?.map(history => history.module_id);
    setDoneModules_ids([...tmpIds]);
  };

  useEffect(() => {
    if (points) retrieveDoneModulesIds();
  }, [points]);

  useEffect(() => {
    if (!loading1 && data1) {
      setThematiques([...data1.thematiqueMobiles]);
    }
  }, [loading1, data1]);

  useEffect(() => {

    if (!loading2 && data2) {
      retrieveUserFromAPI();
    }
  }, [loading2, data2]);

  const retrieveUserFromAPI = async () => {

    if (data2?.statusCode === 404) {
      clearStorage();
      setPoints(0);
      setUser({points: 0});

    }
    if (data2?.utilisateursMobile) {
      setUser({...data2?.utilisateursMobile});
      setPoints(data2?.utilisateursMobile?.points);
    }
    setIsUserLoaded(true);
  };

  const clearStorage = async () => {
    await EncryptedStorage.clear();
  };

  useEffect(() => {
    // clearStorage();
    checkUserIdInStorage();
  }, []);

  const contextValues = {
    user,
    setUser,
    user_id: user.user_id,
    strapi_user_id: user.id,
    thematiques,
    points,
    setPoints,
    doneModules_ids,
    setDoneModules_ids,
  };

  return (
    <AppContext.Provider value={contextValues}>
      {!isUserLoaded && (
        <View style={styles.loadingScreen}>
          <Text>Chargement ...</Text>
        </View>
      )}
      {isUserLoaded && !user?.isOnboarded && (
        <Onboarding user={user} setUser={setUser} />
      )}
      {isUserLoaded && user?.isOnboarded && !user?.isSignedUp && (
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
            <NavigationStack.Screen name="BoxOrder" component={BoxOrder} />
            <NavigationStack.Screen name="Box" component={Box} />
            <NavigationStack.Screen name="Parcours" component={Journey} />
          </NavigationStack.Navigator>
        </NavigationContainer>
      )}
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
