import React, {Component} from 'react';

import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {GeneralStyle, ExerciseDetailStyle, Colors, TextStyles, ButtonStyles} from '../styles';

class ExerciseDetail extends Component {

  renderHeader() {
    return (
      <View style={ExerciseDetailStyle.headerWrapper}>
        <View style={ExerciseDetailStyle.backButtonWrapper}>
          <Image style={ExerciseDetailStyle.backButtonIcon} source={require(`../assets/png/backArrowOrange.png`)} />
          <Text style={[TextStyles.title, ExerciseDetailStyle.backButtonText]} >{`terug naar overzicht`.toUpperCase()}</Text>
        </View>

        <View style={ExerciseDetailStyle.headerButtonsWrapper}>

          <TouchableOpacity style={[ExerciseDetailStyle.headerSmallButtonWrapper, ExerciseDetailStyle.headerUploadWrapper]}>
            <Image style={ExerciseDetailStyle.headerUploadIcon} source={require(`../assets/png/uploadIconWhite.png`)} />
          </TouchableOpacity>

          <TouchableOpacity style={[ExerciseDetailStyle.headerSmallButtonWrapper, ExerciseDetailStyle.headerEditWrapper]}>
            <Image style={ExerciseDetailStyle.headerEditIcon} source={require(`../assets/png/editIconWhite.png`)} />
          </TouchableOpacity>

          <TouchableOpacity style={[ExerciseDetailStyle.headerSmallButtonWrapper, ExerciseDetailStyle.headerShareWrapper]}>
            <Image style={ExerciseDetailStyle.headerShareIcon} source={require(`../assets/png/shareIconWhite.png`)} />
          </TouchableOpacity>

          <TouchableOpacity style={ExerciseDetailStyle.headerSmallButtonWrapper}>
            <Image style={ExerciseDetailStyle.headerAddIcon} source={require(`../assets/png/addIconWhite.png`)} />
          </TouchableOpacity>

          <TouchableOpacity style={ExerciseDetailStyle.primaryButtonWrapper} onPressOut={() => console.log(`uitproberen`)}>
            <LinearGradient style={[ButtonStyles.primaryButton, ExerciseDetailStyle.buttonWrapper]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
              <Image style={[ExerciseDetailStyle.primaryButtonImage]} source={require(`../assets/png/playIconWhite.png`)} />
              <Text style={[TextStyles.primaryButton, ExerciseDetailStyle.primaryButtonText]}>{`uitproberen`.toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {

    return (
      <View style={[GeneralStyle.pageContainer, ExerciseDetailStyle.pageContainer]}>
        <View>
          {this.renderHeader()}

          <ScrollView>
            <View style={ExerciseDetailStyle.scrollContent}>

              <Image style={ExerciseDetailStyle.background} source={require(`../assets/png/detailBackground.png`)} />

              <View style={ExerciseDetailStyle.card}>
                <View style={ExerciseDetailStyle.cardHeader}>

                  <View style={ExerciseDetailStyle.cardTitle}>
                    <Image style={ExerciseDetailStyle.cardTitleIcon} source={require(`../assets/png/soccerIconWhite.png`)} />
                    <View>
                      <Text style={[TextStyles.mainTitle, ExerciseDetailStyle.titleText]}>{`aanvallen via midden`.toUpperCase()}</Text>
                      <Text style={[TextStyles.copy, ExerciseDetailStyle.titleSubText]}>gedeeld met 1 persoon</Text>
                    </View>
                  </View>

                  <View style={ExerciseDetailStyle.seperator}></View>

                  <View style={ExerciseDetailStyle.ratingWrapper}>
                    <Text style={[TextStyles.title, ExerciseDetailStyle.ratingTitle]}>{`Beoordeling`.toUpperCase()}</Text>
                    <View style={ExerciseDetailStyle.starWrapper}>
                      <Image style={ExerciseDetailStyle.starIcon} source={require(`../assets/png/starIconFull.png`)} />
                      <Image style={ExerciseDetailStyle.starIcon} source={require(`../assets/png/starIconFull.png`)} />
                      <Image style={ExerciseDetailStyle.starIcon} source={require(`../assets/png/starIconFull.png`)} />
                      <Image style={ExerciseDetailStyle.starIcon} source={require(`../assets/png/starIconFull.png`)} />
                      <Image style={ExerciseDetailStyle.starIcon} source={require(`../assets/png/starIconFull.png`)} />
                    </View>
                  </View>

                </View>

                <View>
                  
                </View>
              </View>

            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

ExerciseDetail.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string
};

export default ExerciseDetail;
