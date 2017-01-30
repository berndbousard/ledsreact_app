import {AsyncStorage} from 'react-native';

import {isEmpty} from 'lodash';

const setItem = async (item, value) => {

  console.log(item, value);

  // Token
  if (!isEmpty(value.token)) {
    value = value.token;
  }

  try {
    await AsyncStorage.setItem(item, value);
  } catch (error) {
    console.log(error);
  }
};

const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(value);
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  setItem, getItem
};
