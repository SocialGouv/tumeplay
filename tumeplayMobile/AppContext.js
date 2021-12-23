import React from 'react';

const AppContext = React.createContext({
  user_id: '',
  thematiques: [],
  points: 0,
  setPoints: () => {},
  doneModules_ids: [],
  setDoneModules_ids: () => {},
  userHistory: [],
  setUserHistory: () => {},
});

export default AppContext;
