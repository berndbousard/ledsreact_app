import React from 'react';
import {Image, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {TextStyles, MyDirectionsStyle} from '../styles';
import {DatabaseUrl} from '../globals';

const Exercise = ({index, name, groupSize, intensivity, imageWithDirections}) => {


  console.log(imageWithDirections);

  return (
    <Animatable.View animation='fadeInUp' duration={600} delay={8 * index}>
      <View style={MyDirectionsStyle.ExerciseCardHeader}>
        <Image style={MyDirectionsStyle.ExerciseCardSportIcon} source={require(`../assets/png/soccerIcon.png`)} />
        <Text style={[TextStyles.subTitle, MyDirectionsStyle.ExerciseCardTitle]}>{`${name.length > 26 ? `${name.substring(0, 23)}...` : name}`.toUpperCase()}</Text>
      </View>

      <View style={MyDirectionsStyle.ExerciseCardImageWrapper}>
        <View style={MyDirectionsStyle.ExerciseCardImage}>
          <Image style={MyDirectionsStyle.ExerciseCardImageElement} source={{uri: `${DatabaseUrl}/uploads/${imageWithDirections}.png`}} />
        </View>

        <View style={MyDirectionsStyle.ExerciseCardSpecsWrapper}>
          <View style={MyDirectionsStyle.ExerciseCardSpec}>
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

    </Animatable.View>
  );
};

Exercise.propTypes = {
  imageWithDirections: React.PropTypes.string,
  index: React.PropTypes.number,
  groupSize: React.PropTypes.string,
  intensivity: React.PropTypes.string
};

export default Exercise;
