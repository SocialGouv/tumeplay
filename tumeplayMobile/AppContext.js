import React from 'react';
import {REACT_APP_URL} from '@env';

const AppContext = React.createContext({
  user: {},
  user_id: '',
  thematiques: [],
  doneModules_ids: [],
  setDoneModules_ids: () => {},
  reloadUser: () => {},
  apiUrl: REACT_APP_URL,
});

export default AppContext;
