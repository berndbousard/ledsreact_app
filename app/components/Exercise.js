import React, {Component} from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import {Colors, TextStyles, ButtonStyles, MyDirectionsStyle} from '../styles';

const Exercise = ({title, index}) => {

  return (
    <Animatable.View animation='fadeInUp' duration={600} delay={8 * index} style={MyDirectionsStyle.ExerciseCard}>
      <View style={MyDirectionsStyle.ExerciseCardHeader}>
        <Image style={MyDirectionsStyle.ExerciseCardSportIcon} source={require(`../assets/png/soccerIcon.png`)} />
        <Text style={[TextStyles.subTitle, MyDirectionsStyle.ExerciseCardTitle]}>{`Aanvallen op de flank`.toUpperCase()}</Text>
      </View>

      <View style={MyDirectionsStyle.ExerciseCardImageWrapper}>
        <View style={MyDirectionsStyle.ExerciseCardImage}></View>

        <View style={MyDirectionsStyle.ExerciseCardSpecsWrapper}>
          <View style={MyDirectionsStyle.ExerciseCardSpec}>
            <Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/directionIcon.png`)} />
            <Text style={TextStyles.copy}>5</Text>
          </View>

          <View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconMiddle]}>
            <Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/groupSizeIcon.png`)} />
            <Text style={TextStyles.copy}>5- 10</Text>
          </View>

          <View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconLast]}>
            <Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/intensivityIcon.png`)} />
            <Text style={TextStyles.copy}>Makkelijk</Text>
          </View>
        </View>
      </View>

    </Animatable.View>
  );
};

export default Exercise;
