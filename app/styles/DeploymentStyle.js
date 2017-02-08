import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Dimensions from './Dimensions';
import Fonts from './Fonts';

const DeploymentStyle = StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.orange,
    width: Dimensions.width,
    height: Dimensions.height
  }
});

export default DeploymentStyle;
