const path = require('path');

function addModuleToMainRule(config, moduleName) {
  addPathToMainRule(config, path.resolve('node_modules/' + moduleName));
}

function addPathToMainRule(config, modulePath) {
  let include = config.module.rules[2].oneOf[1].include;

  if (Array.isArray(include)) {
    include.push(modulePath);
  } else {
    include = [include, modulePath];
  }

  config.module.rules[2].oneOf[1].include = include;
}

module.exports = function override(config, env) {
  config.entry[0] = path.resolve('src/indexWeb.js');
  config.entry[1] = path.resolve('src/index.js');

  addModuleToMainRule(config, 'react-native-gesture-handler');
  addModuleToMainRule(config, 'react-native-screens');
  addModuleToMainRule(config, 'react-native-animatable'),
  addModuleToMainRule(config, '@react-navigation');
  addModuleToMainRule(config, '@react-native-community/async-storage');
  addModuleToMainRule(config, 'react-native-event-listeners');
  addModuleToMainRule(config, 'react-native-maps');
  addModuleToMainRule(config, 'react-native-htmlview');

  for (const plugin of config.plugins) {
    if (plugin.constructor.name === 'DefinePlugin') {
      const defs = plugin.definitions;
      defs.__DEV__ = env === 'development';
      plugin.definitions = defs;
    }
  }             
  
  config.module.rules[2].oneOf[1].options.sourceType = 'unambiguous';
  config.resolve.alias['react-native-modal'] = 'modal-react-native-web';
  config.resolve.alias['@react-native-community/async-storage'] = 'react-native-web';

  return config;
};                              
