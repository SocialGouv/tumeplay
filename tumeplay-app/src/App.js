import {createAppContainer} from 'react-navigation'; //@TODO : Check package lint error
import React, {useState, useEffect} from 'react';

import AppStack from './routes/routes';
import Onboarding from './canvas/slider/Onboarding';

import UserService from './services/User';
import Tracking from './services/Tracking';

import useIsMounted from './hooks/isMounted';

import localBoarding from './models/defaults/Boarding';

const AppContainer = createAppContainer(AppStack);

const App = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const [slides, setSlides] = useState([]);
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

  if (showRealApp) {
    return <AppContainer style={{flex: 1, flexGrow: 1}} />;
  } else {
    return <Onboarding onDone={_onDone} slides={localBoarding} />;
  }
};

export default App;
