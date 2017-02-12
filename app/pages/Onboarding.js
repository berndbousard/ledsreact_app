import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import {Colors, OnboardingStyle, ButtonStyles, TextStyles} from '../styles';

class Onboarding extends Component {

  componentDidMount() {
    const {buttons} = this.refs;
    buttons.transition({transform: [{translateY: 100}], opacity: 0}, {transform: [{translateY: 0}], opacity: 1}, 1500, `ease-out`);
    // slideOneContent.transition({transform: [{translateY: 100}], opacity: 0}, {transform: [{translateY: 0}], opacity: 1}, 3000, `ease-out`);
  }

  render() {

    return (
      <View style={OnboardingStyle.pageContainer}>

        <Swiper autoplay={true} autoplayTimeout={7} dotStyle={{marginBottom: 125, marginLeft: 5, marginRight: 5, transform: [{scale: .8}]}} activeDotStyle={{marginBottom: 125, marginLeft: 5, marginRight: 5}} activeDotColor={Colors.white} dotColor={Colors.opacityWhite}>
          <View style={[OnboardingStyle.slide]}>
            <Animatable.View style={[OnboardingStyle.slideText]}>
              <Text style={[TextStyles.bam]}>{`led's create`.toUpperCase()}</Text>
              <Text style={[TextStyles.copy, OnboardingStyle.copy]}>Creeër unieke trainingsoefeningen met de Direction en laat je creativiteit de vrije loop.</Text>
              <Image style={[OnboardingStyle.direction1]} source={require(`../assets/png/direction1.png`)} />
            </Animatable.View>

            <Animatable.Image style={[OnboardingStyle.slideImage, OnboardingStyle.slideWoman]} source={require(`../assets/png/woman.png`)} />
          </View>

          <View style={[OnboardingStyle.slide]}>
            <View style={[OnboardingStyle.slideText]}>
              <Text style={[TextStyles.bam]}>{`Led's inspire`.toUpperCase()}</Text>
              <Text style={[TextStyles.copy, OnboardingStyle.copy]}>Deel je oefeningen, krijg feedback en laat je inspireren door wat andere trainers maken.</Text>
              <Image style={[OnboardingStyle.direction2]} source={require(`../assets/png/direction2.png`)} />
            </View>

            <Image style={[OnboardingStyle.slideImage, OnboardingStyle.slideMan]} source={require(`../assets/png/man.png`)} />
          </View>

          <View style={[OnboardingStyle.slide]}>
            <View style={[OnboardingStyle.slideText]}>
              <Text style={[TextStyles.bam]}>{`Led's analyse`.toUpperCase()}</Text>
              <Text style={[TextStyles.copy, OnboardingStyle.copy]}>Krijg inzichten in de prestaties van je spelers en vergelijk deze met andere ploegen.</Text>
              <Image style={[OnboardingStyle.direction3]} source={require(`../assets/png/direction3.png`)} />
            </View>

            <Image style={[OnboardingStyle.slideImage, OnboardingStyle.slideMan2]} source={require(`../assets/png/man2.png`)} />
          </View>
        </Swiper>

        <Animatable.View ref='buttons' style={OnboardingStyle.buttonWrapper}>
          <TouchableOpacity onPressOut={() => Actions.directionOverview({type: ActionConst.RESET})} style={[ButtonStyles.secundairyButton, OnboardingStyle.secundairyButton]}>
            <Image style={[OnboardingStyle.secundairyButtonImage]} source={require(`../assets/png/loginIconWhite.png`)} />
            <Text style={[TextStyles.secundairyButton, OnboardingStyle.secundairyButtonText]}>{`inloggen`.toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={() => Actions.register()}>
            <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
              <Image style={[OnboardingStyle.primaryButtonImage]} source={require(`../assets/png/createAccountIconWhite.png`)} />
              <Text style={[TextStyles.primaryButton]}>{`account aanmaken`.toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>

      </View>
    );
  }
}

Onboarding.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string
};

export default Onboarding;
