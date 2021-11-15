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
      let userID = await UserService.getUniqueId();
      if (parseInt(userID, 16) % 2 === 0) {
        UserService.setPath('A');
        Tracking.questionPath('A');
      } else {
        UserService.setPath('B');
        Tracking.questionPath('B');
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
