import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';

import {TextStyles, DeploymentStyle} from '../styles';
import {DatabaseUrl} from '../globals';
import {range} from 'lodash';

const ExerciseDeployment = props => {

  const exercise = props;
  const directions = [0, 0];



  return (

    <View style={DeploymentStyle.exercise}>
      <View style={[DeploymentStyle.exerciseHeader ]}>
        <View style={[DeploymentStyle.exerciseTitleWrapper]}>
          <Image style={[DeploymentStyle.overviewExerciseImage]} source={{uri: `${exercise.sport.imageName}`}} />
          <Text style={[TextStyles.subTitle, DeploymentStyle.exerciseTitle]}>{`${exercise.name}`.toUpperCase()}</Text>
        </View>

        <View style={[DeploymentStyle.exerciseRatingWrapper]}>
          <Text style={[TextStyles.subTitle, DeploymentStyle.exerciseTitle, {marginRight: 8}]}>{`beoordeling`.toUpperCase()}</Text>
          <View style={[DeploymentStyle.exerciseRatingWrapper]}>
            {
              range(5).map((r, index) => {
                return <Image key={index} style={[DeploymentStyle.overviewExerciseImageStar, {marginLeft: 3}]} source={require(`../assets/png/starIconFull.png`)} />;
              })
            }
          </View>

        </View>
      </View>
      <TouchableOpacity>
      <View style={[DeploymentStyle.overviewExerciseCard]}>
        <View style={[DeploymentStyle.overviewExercisePreviewImageWrapper]}>
          <Image style={[DeploymentStyle.overviewExercisePreviewImage]} source={{uri: `${DatabaseUrl}/uploads/${exercise.imageWithDirections}.png`}} />
        </View>

        <View style={DeploymentStyle.exerciseSpecs}>

          <View style={DeploymentStyle.exerciseSpec}>
            <Text style={[TextStyles.subTitle, {marginBottom: 2}]}>{`aantal directions:`.toUpperCase()}</Text>
            <View style={[DeploymentStyle.overviewExerciseSpecImageWrapper]}>
              <Image style={[DeploymentStyle.overviewExerciseSpecDirectionIcon]} source={require(`../assets/png/directionIcon.png`)} />
              <Text style={TextStyles.copy}>{`${directions.length}`.toUpperCase()}</Text>
            </View>
          </View>

          <View style={DeploymentStyle.exerciseSpec}>
            <Text style={[TextStyles.subTitle, {marginBottom: 2}]}>{`aantal spelers:`.toUpperCase()}</Text>
            <View style={[DeploymentStyle.overviewExerciseSpecImageWrapper]}>
              <Image style={[DeploymentStyle.overviewExerciseSpecPlayerIcon]} source={require(`../assets/png/playerAmountIcon.png`)} />
              <Text style={TextStyles.copy}>{`${exercise.groupSize}`.toUpperCase()}</Text>
            </View>
          </View>

          <View style={DeploymentStyle.exerciseSpec}>
            <Text style={[TextStyles.subTitle, {marginBottom: 2}]}>{`moeilijkheidsgraad:`.toUpperCase()}</Text>
            <View style={[DeploymentStyle.overviewExerciseSpecImageWrapper]}>
              <Image style={[DeploymentStyle.overviewExerciseSpecIntensivityIcon]} source={require(`../assets/png/intensityIconBlack.png`)} />
              <Text style={TextStyles.copy}>{`${exercise.intensity === 0 ? `Makkelijk` : `Moeilijk`}`}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={[TextStyles.subTitle, DeploymentStyle.description]} >{`beschrijving:`.toUpperCase()}</Text>
          <Text style={[TextStyles.copy, DeploymentStyle.exerciseCopy]}>{`${exercise.desc}`}</Text>
        </View>
      </View>
      </TouchableOpacity>
      </View>

  );
};

ExerciseDeployment.propTypes = {
  directions: React.PropTypes.object,
  exercise: React.PropTypes.object,
};

export default ExerciseDeployment;
