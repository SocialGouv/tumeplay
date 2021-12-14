import React from 'react';

const AppContext = React.createContext({
  thematiques: [],
  points: 0,
  setPoints: () => {},
});

export default AppContext;
