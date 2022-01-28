import React from 'react';

const AppContext = React.createContext({
  user: {},
  user_id: '',
  thematiques: [],
  points: 0,
  setPoints: () => {},
  doneModules_ids: [],
  setDoneModules_ids: () => {},
});

export default AppContext;
