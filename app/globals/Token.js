import {AsyncStorage} from 'react-native';

const get = async key => {
  return await AsyncStorage.getItem(key);
};

export default {
  get
};
