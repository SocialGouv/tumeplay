import React from 'react';

const AppContext = React.createContext({
  user: {},
  user_id: '',
  thematiques: [],
  doneModules_ids: [],
  setDoneModules_ids: () => {},
  reloadUser: () => {},
});

export default AppContext;
