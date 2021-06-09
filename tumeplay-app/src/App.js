import {createAppContainer} from 'react-navigation'; //@TODO : Check package lint error
import React, {useState, useEffect} from 'react';

import PropTypes from 'prop-types';

import AppStack from './routes/routes';
import Onboarding from './canvas/slider/Onboarding';

import RemoteApi from './services/RemoteApi';
import UserService from './services/User';

import useIsMounted from './hooks/isMounted';

import localBoarding from './models/defaults/Boarding';

const AppContainer = createAppContainer(AppStack);

App.propTypes = {
  item: PropTypes.object,
};

export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);
  const [slides, setSlides] = useState([]);
  const isMounted = useIsMounted();

  useEffect(() => {
    async function _fetchSlides() {
      const _questions = await RemoteApi.fetchBoarding();

      if (isMounted.current) {
        setSlides(_questions);
      }
    }

    async function _alreadyRegistered() {
      const _passedOnboarding = await UserService.hasPassedOnboarding();

      if (_passedOnboarding) {
        setShowRealApp(true);
      }
    }
    _alreadyRegistered();
    _fetchSlides();
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
}
