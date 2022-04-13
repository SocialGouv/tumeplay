import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Storage from './Storage';
import UserModel from '../models/User';
import CryptoJS from 'react-native-crypto-js';

const User = {
  localHmacKey: 'local.hmac',
  localUserKey: 'local.user',
  localUser: null,
  localHmac: null,

  generateUniqueId: async () => {
    let uniqueId = false;

    if (Platform.OS == 'web') {
      var n = false;
      var base = false;
      if (window.performance) {
        var s = performance.timing.navigationStart;
        n = performance.now();
        base = Math.floor((s + Math.floor(n)) / 1000);
      } else {
        n = new Date().getTime();
        base = Math.floor(n / 1000);
      }
      var ext = Math.floor((n % 1000) * 1000);
      var now =
        ('00000000' + base.toString(16)).slice(-8) +
        ('000000' + ext.toString(16)).slice(-5);
      if (now <= window.my_las_uid) {
        now = (
          parseInt(window.my_las_uid ? window.my_las_uid : now, 16) + 1
        ).toString(16);
      }

      uniqueId = now;
    } else {
      uniqueId = DeviceInfo.getUniqueId();
    }
    return uniqueId;
  },
  /**
   * @returns {number} tokensCount
   */
  getTokensAmount: async () => {
    try {
      if (!User.localUser) {
        var localUser = await User.load();

        if (localUser) {
          return localUser.availableTokens;
        }

        return 0;
      } else {
        return User.localUser.availableTokens;
      }
    } catch (e) {
      throw Error(e);
    }
  },
  subTokens: async substractedTokens => {
    try {
      if (!User.localUser) {
        await User.load();
      }

      // Not an "else".
      if (User.localUser) {
        User.localUser.availableTokens =
          User.localUser.availableTokens - substractedTokens;

        await User.save();

        return User.localUser.availableTokens;
      }
    } catch (e) {
      throw Error(e);
    }
  },

  addTokens: async addedTokens => {
    try {
      if (!User.localUser) {
        await User.load();
      }

      // Not an "else".
      if (User.localUser) {
        User.localUser.availableTokens =
          User.localUser.availableTokens + addedTokens;

        await User.save();

        return User.localUser.availableTokens;
      }
    } catch (e) {
      throw Error(e);
    }
  },
  getJWT: async () => {
    let localUser = false;

    if (!localUser) {
      localUser = await User.load();
    }

    if (localUser) {
      return localUser.token;
    }

    return null;
  },
  /**
   * @returns {boolean} isMoreThan25YearsOld
   */
  getIsMoreThan25YearsOld: async () => {
    let localUser = false;

    if (!localUser) {
      localUser = await User.load();
    }

    if (localUser) {
      return localUser.isMoreThan25YearsOld;
    }

    return null;
  },
  setJWT: async token => {
    let localUser = User.localUser;

    if (!localUser) {
      localUser = await User.load();
    }

    if (localUser) {
      localUser.token = token;

      await User.save();

      return localUser;
    }

    return null;
  },

  /**
   * @param {number} badgeId
   */
  setlatestBadgeIDWon: async latestBadgeIDWon => {
    let localUser = User.localUser;
    if (!localUser) {
      localUser = await User.load();
    }

    if (localUser) {
      localUser.latestBadgeIDWon = latestBadgeIDWon;

      await User.save();

      return localUser;
    }

    return null;
  },
  /**
   * @returns {number} badgeId
   */
  getlatestBadgeIDWon: async () => {
    let localUser = false;

    if (!localUser) {
      localUser = await User.load();
    }

    if (localUser) {
      return localUser.latestBadgeIDWon;
    }

    return null;
  },

  /**
   * @returns {Object} {  updatedBadge  , nextBadge}
   */
  updateToLatestBadge: async () => {
    try {
      // Get actual token count
      const tokensAmt = await User.getTokensAmount();
      console.log(`updateToLatestBadge--> tokensAmt: ${tokensAmt}`);
      // Get badges list
      // const badgeList = await RemoteApi.fetchBadges();
      // console.log('badges list:', badgeList);
      // Getting latest badge id assigned to the user before the update
      const badgeIDBeforeUpdate = await User.getlatestBadgeIDWon();
      // console.log(`badgeIDBeforeUpdate: ${badgeIDBeforeUpdate}`);

      const result = {
        updatedBadge: null,
        nextBadge: null,
      };
      // let updatedBadge_index = null;
      // Search in the list and compare the tokens to a badge
      // for (let i = 0; i < badgeList.length; i++) {
      //   const badgeItem = badgeList[i];

      //   // Assigning updatedBadge
      //   if (tokensAmt >= badgeItem.tokenRequired) {
      //     // Assigning the updatedBadge to badgeItem
      //     // console.log(
      //     //   `Assigning badge item to updated badge where badgeItem: ${JSON.stringify(
      //     //     badgeItem,
      //     //   )}`,
      //     // );
      //     result.updatedBadge = badgeItem;
      //     updatedBadge_index = i;
      //   }
      // }

      // if (result.updatedBadge) {
      //   if (result.updatedBadge.id === badgeIDBeforeUpdate) {
      //     // If nothing changed, return null
      //     return {
      //       updatedBadge: null,
      //       nextBadge: null,
      //     };
      //   }
      //   // Else set next badge and return the result
      //   const nextBadge_index_temp = updatedBadge_index + 1;
      //   result.nextBadge =
      //     nextBadge_index_temp < badgeList.length
      //       ? badgeList[nextBadge_index_temp]
      //       : null;
      //   await User.setlatestBadgeIDWon(result.updatedBadge.id);
      // }

      // console.log('Update achieved. Result :', result);

      return result;
    } catch (e) {
      throw Error(e);
    }
  },

  setIsMoreThan25YearsOld: async isMoreThan25YearsOld => {
    let localUser = User.localUser;

    if (!localUser) {
      localUser = await User.load();
    }

    if (localUser) {
      localUser.isMoreThan25YearsOld = isMoreThan25YearsOld;

      await User.save();

      return localUser;
    }

    return null;
  },
  setPassedOnboarding: async passedOnBoarding => {
    let localUser = User.localUser;

    if (!localUser) {
      localUser = await User.load();
    }

    if (localUser) {
      localUser.passedOnBoarding = passedOnBoarding;

      await User.save();

      return localUser;
    }

    return null;
  },
  hasPassedOnboarding: async () => {
    try {
      if (!User.localUser) {
        var localUser = await User.load();
        if (localUser) {
          return localUser.passedOnBoarding !== undefined;
        }
        return false;
      } else {
        return false;
      }
    } catch (e) {
      throw Error(e);
    }
  },
  setLastOrder: async () => {
    let localUser = User.localUser;

    if (!localUser) {
      localUser = await User.load();
    }

    if (localUser) {
      localUser.lastOrder = Date.now();

      await User.save();

      return localUser;
    }

    return null;
  },
  isOrderAllowed: async () => {
    try {
      let localUser = User.localUser;

      if (!localUser) {
        localUser = await User.load();
      }

      if (localUser) {
        if (localUser.lastOrder !== undefined) {
          var _now = Date.now() / 1000;
          return _now - localUser.lastOrder > 86400 * 7;
        }
      }

      return true;
    } catch (e) {
      throw Error(e);
    }
  },
  getUniqueId: async () => {
    try {
      if (!User.localUser) {
        var localUser = await User.load();

        if (localUser) {
          if (localUser.uniqueId === undefined) {
            localUser.uniqueId = await User.generateUniqueId();

            await User.save();
          }

          return localUser.uniqueId;
        }

        return null;
      } else {
        return User.localUser.uniqueId;
      }
    } catch (e) {
      throw Error(e);
    }
  },

  init: async () => {
    try {
      const _localUser = new UserModel();

      _localUser.uniqueId = await User.generateUniqueId();

      User.localUser = _localUser;

      return await User.save();
    } catch (e) {
      throw Error(e);
    }
  },
  load: async () => {
    try {
      var localUser = await Storage.get(User.localUserKey);

      if (localUser && localUser != null) {
        localUser = JSON.parse(localUser);
        User.localUser = localUser;

        await User.checkHmac();

        return localUser;
      } else {
        return await User.init();
      }
    } catch (e) {
      throw Error(e);
    }
  },

  save: async () => {
    try {
      await User.updateHmac();
      await Storage.set(User.localUserKey, JSON.stringify(User.localUser));

      return User.localUser;
    } catch (e) {
      throw Error(e);
    }
  },
  loadHmac: async () => {
    return await Storage.get(User.localHmacKey);
  },
  checkHmac: async () => {
    const currentHmac = await User.computeHmac();
    const storedHmac = await User.loadHmac();

    if (!User.localUser) {
      await User.load();
    }

    if (currentHmac && User.localUser) {
      if (!storedHmac) {
        return;
      }

      if (storedHmac != currentHmac) {
        User.localUser.availableTokens = 0;
        await User.save();

        return;
      }
    }
  },
  updateHmac: async () => {
    const currentHmac = await User.computeHmac();

    if (!User.localUser) {
      await User.load();
    }

    await User.setHmac(currentHmac);
  },
  computeHmac: async () => {
    if (User.localUser) {
      const localData = {
        tokens: User.localUser.availableTokens,
        uniqueId: User.localUser.uniqueId,
        latestBadge: User.localUser.latestBadgeIDWon,
      };
      return CryptoJS.MD5(JSON.stringify(localData)).toString();
    }

    return false;
  },
  setHmac: async hmac => {
    if (hmac && User.localUser) {
      User.localHmac = hmac;

      await Storage.set(User.localHmacKey, hmac);
    }
  },
  getPath: () => {
    try {
      if (User.localUser) {
        return User.localUser.path;
      }
    } catch (e) {
      throw Error(e);
    }
  },
  setPath: async path => {
    try {
      if (!User.localUser) {
        await User.load();
      }
      if (User.localUser) {
        User.localUser.path = path;
        await User.save();
        return User.localUser.path;
      }
    } catch (e) {
      throw Error(e);
    }
  },
};
export default User;
