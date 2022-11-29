import {createAppContainer} from 'react-navigation'; //@TODO : Check package lint error
import React, {useState, useEffect} from 'react';

import AppStack from './routes/routes';
import Onboarding from './canvas/slider/Onboarding';

import UserService from './services/User';
import Tracking from './services/Tracking';

import useIsMounted from './hooks/isMounted';

import localBoarding from './models/defaults/Boarding';
import AimeOnboarding from './screens/AimeOnboarding';

const AppContainer = createAppContainer(AppStack);

const App = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    async function _alreadyRegistered() {
      const _passedOnboarding = await UserService.hasPassedOnboarding();
      // let userID = await UserService.getUniqueId();
      const _userPath = UserService.getPath();
      if (!_userPath) {
        let random = Math.random() * 100;
        if (random < 25) {
          UserService.setPath('A');
          Tracking.questionPath('ParcoursA');
        } else if (random > 25 && random < 50) {
          UserService.setPath('B');
          Tracking.questionPath('ParcoursB');
        } else if (random > 50 && random < 75) {
          UserService.setPath('C');
          Tracking.questionPath('ParcoursC');
        } else {
          UserService.setPath('D');
          Tracking.questionPath('ParcoursD');
        }
      }
      if (_passedOnboarding) {
        setShowRealApp(true);
      }
    }
    _alreadyRegistered();
  }, [isMounted]);

  async function _onDone() {
    await UserService.setPassedOnboarding(true);
    setShowRealApp(true);
  }

  const REACT_APP_ZONE = process.env.REACT_APP_ZONE;

  if (showRealApp) {
    return <AppContainer style={{flex: 1, flexGrow: 1}} />;
  } else {
    if (REACT_APP_ZONE === 'aime') {
      return <AimeOnboarding onDone={_onDone} />;
    } else {
      return <Onboarding onDone={_onDone} slides={localBoarding} />;
    }
  }
};

export default App;
