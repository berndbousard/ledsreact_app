import {AsyncStorage} from 'react-native';

const setItem = async (item, value) => {

  try {
    await AsyncStorage.setItem(item, value);
  } catch (error) {
    console.log(error);
  }
};

const getItem = async key => {

  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null || undefined) {
      // Promise.resolve(value);
      return value;
    }
    console.log(`geen value voor ${key} aanwezig`);
  } catch (error) {
    console.log(error);
  }
};

export default {
  setItem, getItem
};
