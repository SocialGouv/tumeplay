/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import 'isomorphic-fetch';
global.window = jest.fn();
jest.resetModules();
jest.doMock('react-native', () => ({Platform: {OS: 'web'}}));
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

global.document = window.document;

/*
test all App
*/
const delay = value =>
  new Promise(resolve => setTimeout(() => resolve(), value));

it('renders correctly', async () => {
  renderer.create(<App />);
  await delay(3000);
});
