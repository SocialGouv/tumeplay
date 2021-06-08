/**
 * @format
 */

import 'react-native';
import 'isomorphic-fetch';

import openGeocoder from 'node-open-geocoder';
import AddressValidator from '../src/services/AddressValidator';
import MailValidator from '../src/services/MailValidator';
import {phoneTest} from '../src/screens/tunnel/TunnelUserAddress';
import User from '../src/services/User';
import Storage from '../src/services/Storage';
import RemoteApi from '../src/services/RemoteApi';

const selectedProducts = [
  {
    item: {
      active: true,
      defaultQty: '3',
      description: 'Préservatifs internes ( ou féminins ) en nitrile',
      id: 5,
      isOrderable: true,
      picture: {
        uri:
          'http://127.0.0.1:5000/uploads/pictures/product/5-discover-sexuality.jpg',
      },
      pictureId: 217,
      qty: '3',
      shortDescription: 'Préservatifs féminins',
      title: 'Préservatifs internes ( ou féminins ) en nitrile',
    },
    qty: 1,
  },
  {
    item: {
      active: true,
      defaultQty: '1',
      description: 'Boite de carrés de latex',
      id: 8,
      isOrderable: true,
      picture: {
        uri:
          'http://127.0.0.1:5000/uploads/pictures/product/8-discover-sexuality.jpg',
      },
      pictureId: 222,
      qty: '1',
      shortDescription: '',
      title: 'Boite de carrés de latex',
    },
    qty: 1,
  },
  {
    item: {
      active: true,
      defaultQty: null,
      description: "Des dosettes de lubrifiant à base d'eau",
      id: 3,
      isOrderable: true,
      picture: {
        uri:
          'http://127.0.0.1:5000/uploads/pictures/product/3-discover-sexuality.jpg',
      },
      pictureId: 215,
      qty: null,
      shortDescription: "Lubrifiant à base d'eau",
      title: "Des dosettes de lubrifiant à base d'eau",
    },
    qty: 2,
  },
];
const localAddress = {
  firstName: 'test',
  lastName: 'test',
  emailAddress: 'test@gmail.com',
  phoneNumber: '0766093266',
  address: 'avenue Albert Thomas',
  zipCode: '87000',
  city: 'Limoges',
};
const resultAddress = {
  road: 'Avenue Albert Thomas',
  neighbourhood: 'Beaublanc',
  suburb: 'Montjovis',
  city: 'Limoges',
  municipality: 'Limoges',
  county: 'Haute-Vienne',
  state: 'Nouvelle-Aquitaine',
  country: 'France',
  postcode: '87000',
  country_code: 'fr',
};
const selectedItem = {
  available: true,
  description:
    "Tu te poses des questions sur le sexe, ton corps et celui des autres ? Cette boîte essaie d'y répondre avec du contenu ludique et te propose des préservatifs pour les appréhender sans prise de tête.",
  id: 1,
  key: 1,
  picture: {uri: 'http://127.0.0.1:5000/uploads/pictures/box/1-discover.jpg'},
  price: 500,
  products: [
    {
      qty: '1',
      shortTitle: 'Préservatifs féminins',
      title: 'Préservatifs internes ( ou féminins ) en nitrile',
    },
    {qty: '1', shortTitle: 'dfghdfghdfghdfgh', title: 'dgfdfgh'},
    {
      qty: '1',
      shortTitle: 'Préservatifs Manix King Size',
      title: 'Préservatifs Manix King Size ( préservatifs grande taille )',
    },
    {
      qty: '1',
      shortTitle: "Lubrifiant à base d'eau",
      title: "Des dosettes de lubrifiant à base d'eau",
    },
  ],
  title: 'Découvre ton corps',
};

/* access module command */
it('access module command ', async () => {
  await User.addTokens(1000);
  const tokensAmount = await User.getTokensAmount();
  const have25Years = await User.getIsMoreThan25YearsOld();
  expect(tokensAmount).toBe(1000);
  expect(have25Years).toBeNull();
  await User.setIsMoreThan25YearsOld(false);
  expect(have25Years).toBeFalsy();
  const localUser = JSON.parse(await Storage.get('local.user'));
  expect(localUser).toEqual(
    expect.objectContaining({
      availableTokens: tokensAmount,
      isMoreThan25YearsOld: false,
    }),
  );
});

/* custom command */
it('add custom command ', () => {
  expect(selectedProducts).toHaveLength(3);
});
it('example 1 > max 2 items of the same object are selected ', () => {
  const [first, second, third] = selectedProducts;
  expect(first.qty).toBeLessThanOrEqual(2);
  expect(second.qty).toBeLessThanOrEqual(2);
  expect(third.qty).toBeLessThanOrEqual(2);
});
it('example 2 > max 2 items of the same object are selected', () => {
  expect(selectedProducts.some(({qty}) => qty === 1)).toBe(true);
  expect(selectedProducts.some(({qty}) => qty === 2)).toBe(true);
});

/* address verification */
it('address verification ', async () => {
  const fullAddress =
    localAddress.address + ' ' + localAddress.zipCode + ' ' + localAddress.city;
  await openGeocoder()
    .geocode(fullAddress)
    .end((err, res) => {
      expect(res).toBeDefined();
      expect(res).toContainEqual(
        expect.objectContaining({address: resultAddress}),
      );
    });
});

/* address in zone */

it('address zone  ', async () => {
  var falseZipCode = '3000';
  var rst = await AddressValidator.validateZipCode(localAddress.zipCode);
  var rstFalse = await AddressValidator.validateZipCode(falseZipCode);
  expect(rst).toBeTruthy();
  expect(rstFalse).toBeFalsy();
});

/* address reverse */
it('address reverse ', async () => {
  const fullAddress =
    localAddress.city + ' ' + localAddress.zipCode + ' ' + localAddress.address;
  await openGeocoder()
    .geocode(fullAddress)
    .end((err, res) => {
      expect(res).toBeDefined();
    });
});

/* address email */
it('address email ', () => {
  const EmailWrong = 'test.com';
  const validateEmail1 = MailValidator.validateMail(localAddress.emailAddress);
  const validateEmail2 = MailValidator.validateMail(EmailWrong);
  expect(validateEmail1).toBeTruthy();
  expect(validateEmail2).toBeFalsy();
});

/* Phone number */
it('should match the expected phone number', () => {
  const phoneNumberWrong = '20450323';
  expect(localAddress.phoneNumber).toMatch(phoneTest);
  expect(phoneNumberWrong).not.toMatch(phoneTest);
});

/* validate Fields */
it('should validate all Fields', () => {
  expect(localAddress.firstName).not.toBe('');
  expect(localAddress.lastName).not.toBe('');
  expect(localAddress.emailAddress).not.toBe('');
  expect(MailValidator.validateMail(localAddress.emailAddress)).toBeTruthy();
  expect(localAddress.adress).not.toBe('');
  expect(localAddress.zipCode).not.toBe('');
  expect(localAddress.city).not.toBe('');
  expect(localAddress.phoneNumber).not.toBe('');
  expect(localAddress.phoneNumber).toMatch(phoneTest);
});

/* access module badge */
it('access module badge', async () => {
  await User.addTokens(1000);
  await User.setIsMoreThan25YearsOld(true);
  const tokensAmount = await User.getTokensAmount();
  await User.updateToLatestBadge();
  const badgeIDBeforeUpdate = await User.getlatestBadgeIDWon();
  const localUser = JSON.parse(await Storage.get('local.user'));
  expect(localUser).toEqual(
    expect.objectContaining({
      availableTokens: tokensAmount,
      isMoreThan25YearsOld: true,
    }),
  );
  expect(badgeIDBeforeUpdate).toBeGreaterThanOrEqual(1);
});
//test confirm command
describe('test confirm command', () => {
  it('test confirm command failed', async () => {
    const isSuccess = await RemoteApi.confirmOrder(
      selectedItem,
      [],
      localAddress,
      '',
      '',
    );
    expect(isSuccess).toBeFalsy();
  });
  it('test confirm command success', async () => {
    const isSuccess = await RemoteApi.confirmOrder(
      selectedItem,
      [],
      localAddress,
      '',
      'home',
    );
    expect(isSuccess).toBeTruthy();
    const user = JSON.parse(await Storage.get('local.user'));
    const newTokens = await User.subTokens(1000);
    expect(newTokens).toBe(user.availableTokens - 1000);
  });
});
