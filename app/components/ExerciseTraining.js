import React from 'react';
import {Image, Text, View} from 'react-native';

import {TextStyles, MyDirectionsStyle} from '../styles';
import {DatabaseUrl} from '../globals';

const ExerciseTraining = ({groupSize, intensivity, imageWithDirections}) => {

  return (
      <View style={[MyDirectionsStyle.ExerciseTrainerCardImage, {marginTop: - 5} ]}>
        <View style={[MyDirectionsStyle.ExerciseCardImage, MyDirectionsStyle.ExerciseCardImageForTraining]}>
          <Image style={MyDirectionsStyle.ExerciseCardImageElement} source={{uri: `${DatabaseUrl}/uploads/${imageWithDirections}.png`}} />
        </View>

        <View style={[MyDirectionsStyle.ExerciseCardSpecsWrapper, MyDirectionsStyle.exerciseCardSpecsWrapperForTraining]}>
          <View style={[MyDirectionsStyle.ExerciseCardSpec]}>
            <Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/directionIcon.png`)} />
            <Text style={TextStyles.copy}>5</Text>
          </View>

          <View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconMiddle]}>
            <Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/groupSizeIcon.png`)} />
            <Text style={TextStyles.copy}>{groupSize}</Text>
          </View>

          <View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconLast]}>
            <Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/intensivityIcon.png`)} />
            <Text style={TextStyles.copy}>{intensivity === 0 ? `makkelijk` : `makkelijk`}</Text>
          </View>
        </View>
    </View>
  );
};

ExerciseTraining.propTypes = {
  imageWithDirections: React.PropTypes.string,
  index: React.PropTypes.number,
  groupSize: React.PropTypes.string,
  intensivity: React.PropTypes.string,
  name: React.PropTypes.string
};

export default ExerciseTraining;
