import React from 'react';

const AppContext = React.createContext({
  thematiques: [],
  points: 0,
  setPoints: () => {},
  doneModules_ids: [],
  setDoneModules_ids: () => {},
});

export default AppContext;
