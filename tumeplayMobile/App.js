import React, {useState, useEffect} from 'react';
import {Platform, Alert, BackHandler, Linking, Vibration} from 'react-native';
import Onboarding from './src/views/Onboarding';
import Signup from './src/views/Signup';
import EncryptedStorage from 'react-native-encrypted-storage';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContentsPage from './src/views/Contents';
import ContentPage from './src/views/Contents/ContentPage';
import Navbar from './src/components/Navbar';
import QuizzStartPage from './src/views/QuizzStartPage';
import {useQuery} from '@apollo/client';
import {GET_THEMES} from './src/services/api/themes';
import AppContext from './AppContext';
import QuizzModule from './src/components/Quizz/QuizzModule';
import BoxOrder from './src/views/BoxOrder';
import Box from './src/views/Box';
import QuizzFinishScreen from './src/components/Quizz/QuizzFinishScreen';
import Journey from './src/views/Journey';
import Award from './src/views/Award';
const NavigationStack = createNativeStackNavigator();
import {Colors} from './src/styles/Style';
import {REACT_APP_URL, MATOMO_SITE_URL, MATOMO_ID, SENTRI_URL} from '@env';
import Matomo from 'react-native-matomo';
import Loader from './src/components/global/Loader';
import {TourGuideProvider} from 'rn-tourguide';
import VersionCheck from 'react-native-version-check';

import * as Sentry from '@sentry/react-native';
import Copilot from './src/components/Copilot/Copilot';
import CustomToolTip from './src/components/Copilot/CustomToolTip';
import Journey2 from './src/views/Journey2';
import ModuleList from './src/components/Journey/Journey_modules/ModuleList';
import Menu from './src/views/Menu';
import Sponsorship from './src/components/Sponsorship/Sponsorship';

Sentry.init({
  dsn: SENTRI_URL,
  enableNative: false,
});

const App = () => {
  const [user, setUser] = useState({});
  const [doneModules_ids, setDoneModules_ids] = useState([]);
  const [thematiques, setThematiques] = useState([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const {data: data1, loading: loading1} = useQuery(GET_THEMES);

  const navTheme = DefaultTheme;
  navTheme.colors.background = Colors.background;

  const checkUserIdInStorage = async () => {
    let encryptedUser = await EncryptedStorage.getItem('user');
    if (encryptedUser) {
      const tmpUser = JSON.parse(encryptedUser);
      const tmpUser_id = tmpUser?.user_id;
      if (tmpUser_id) {
        user.user_id = tmpUser_id;
        getMobileUser(user.user_id);
      }
    } else {
      setIsUserLoaded(true);
      setUser({});
    }
  };

  const getMobileUser = async user_id => {
    const response = await fetch(
      REACT_APP_URL + '/utilisateurs-mobiles/' + user_id + '?version=3',
    );
    const tmpUser = await response.json();
    if (tmpUser?.status === 404) {
      clearStorage();
      setUser({});
    } else if (tmpUser) {
      setUser(tmpUser);
    }
    setIsUserLoaded(true);
  };

  const reloadUser = async () => {
    await getMobileUser(user.user_id);
  };

  const retrieveDoneModulesIds = () => {
    let successHistories = user?.history?.filter(
      history => history.status === 'success',
    );
    let tmpIds = [];
    if (successHistories) {
      tmpIds = successHistories.map(history => history.module_id);
    }
    setDoneModules_ids([...tmpIds]);
  };

  useEffect(() => {
    if (user && user.history) retrieveDoneModulesIds();
  }, [user]);

  useEffect(() => {
    if (!loading1 && data1) {
      setThematiques([...data1.thematiqueMobiles]);
    }
  }, [loading1, data1]);

  const clearStorage = async () => {
    await EncryptedStorage.clear();
  };

  const checkUpdateNeeded = () => {
    VersionCheck.needUpdate({country: 'fr'}).then(update => {
      if (update?.isNeeded) {
        Vibration.vibrate(200);
        Alert.alert(
          'Oups !',
          "Tu as une ancienne version. Mets à jour l'application pour l'utiliser",
          [
            {
              text: "Mettre à jour l'application",
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(update?.storeUrl);
              },
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  useEffect(() => {
    // clearStorage();
    checkUserIdInStorage();
    Matomo.initTracker(MATOMO_SITE_URL + 'matomo.php', parseInt(MATOMO_ID));
    checkUpdateNeeded();
  }, []);

  const contextValues = {
    user,
    setUser,
    reloadUser,
    user_id: user.user_id,
    strapi_user_id: user.id,
    thematiques,
    doneModules_ids,
    setDoneModules_ids,
  };

  return (
    <TourGuideProvider
      dismissOnPress={true}
      tooltipComponent={CustomToolTip}
      verticalOffset={Platform.OS === 'android' ? 10 : -10}
      animationDuration={300}>
      <AppContext.Provider value={contextValues}>
        {!isUserLoaded && <Loader />}
        {isUserLoaded && !user?.isOnboarded && (
          <Onboarding user={user} setUser={setUser} />
        )}
        {isUserLoaded && user?.isOnboarded && !user?.isSignedUp && (
          <Signup user={user} setUser={setUser} />
        )}
        {isUserLoaded &&
          user?.isSignedUp &&
          user?.isSignedUp &&
          !user?.has_followed_tutorial && <Copilot />}
        {user?.isOnboarded && user?.isSignedUp && user?.has_followed_tutorial && (
          <NavigationContainer theme={navTheme}>
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
              <NavigationStack.Screen name="Parcours" component={Journey2} />
              <NavigationStack.Screen
                name="ModuleList"
                component={ModuleList}
              />
              <NavigationStack.Screen name="Menu" component={Menu} />
              <NavigationStack.Screen
                name="Sponsorship"
                component={Sponsorship}
              />
              <NavigationStack.Screen name="Award" component={Award} />
            </NavigationStack.Navigator>
          </NavigationContainer>
        )}
      </AppContext.Provider>
    </TourGuideProvider>
  );
};

export default Sentry.wrap(App);
