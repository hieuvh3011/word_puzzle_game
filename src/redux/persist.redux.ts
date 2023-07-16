import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';
import {getUniqueId} from 'react-native-device-info';

export const storage = new MMKV({
  id: `storage-encrypted-${getUniqueId()}`,
  encryptionKey: `Contact-Card-${getUniqueId()}`,
});

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};
