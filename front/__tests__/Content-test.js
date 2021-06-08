/**
 * @format
 */

import 'react-native';
import 'isomorphic-fetch';
jest.resetModules();

import RemoteApi from '../src/services/RemoteApi';

/* test contents*/
const selected = {
  key: 1,
  id: 1,
  isSpecial: false,
  picture: false,
  value: 'Découvre ton corps',
};

it('call api of Contents ', async () => {
  const result = await RemoteApi.fetchContents(selected);

  // test of id of selected item is exist and equal to 1
  expect(selected.id).toEqual(1);

  // test of value of selected item is exist and equal a string given
  expect(selected.value).toEqual('Découvre ton corps');

  // test the result not empty and have an object
  expect(result).toBeDefined();
  expect(result).toContainEqual(
    expect.objectContaining({
      key: 97,
      id: 97,
      numberOfLines: 3,
      theme: 1,
      category: 2,
    }),
  );
});
