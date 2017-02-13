import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text, TouchableWithoutFeedback} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {isEmpty, range} from 'lodash';

// const showInstructions = true;

import {DatabaseUrl} from '../globals';
import {DeploymentStyle, Dimensions, ButtonStyles, Colors, TextStyles, ExerciseDetailStyle} from '../styles';
let seconds = 0;
let minutes = 0;
let timerGo = true;
let toggle = true;
let instructionsClick = false;

const timerText = ``;

let mounted = false;


class Deployment extends Component {

  state = {
    currentSelectedDirectionIndex: 0,
    deploymentDone: false,
    deployedDirections: [],
    currentPage: 0,
    arrivalDate: 0,
    time: ``
  }

  componentWillUnmount() {
    timerGo = false;
    seconds = 0;
    minutes = 0;
    mounted = false;
  }

  componentWillMount() {
    this.setState({time: ``});
    seconds = 0;
    minutes = 0;
    mounted = true;
    instructionsClick = false;
  }

  componentDidMount() {
    timerGo = true;
    mounted = true;

    const {directions} = this.props;

    this.props.socket.emit(`setDirectionSettings`, directions);

    if (!isEmpty(directions)) {
      setTimeout(() => {
        directions.forEach((d, index) => {
          const direction = this.refs[`direction${index}`];

          direction.transition(
            {left: (Dimensions.width / 2) - (100 / 2), top: (Dimensions.height / 2) + (107 / 2), opacity: 0},
            {left: (d.x * Dimensions.width) - (100 / 2), top: (d.y * Dimensions.height) - (107 / 2), opacity: 1},
            700, (index * 100), `ease-out-circ`
          );
        });
      }, 700);

    }

    // setTimeout(() => {
    //   instructions.transition({transform: [{translateY: 0}], opacity: 1}, {transform: [{translateY: 90}], opacity: 0}, 500, `ease-in-circ`);
    // }, 10000);

    // setInterval(() => {
    //   const {seconds} = this.state;
    //
    //   // if (seconds > 60) {
    //   //   seconds = 0;
    //   // }
    //
    //   this.setState({seconds});
    // }, 1000);
  }

  deploymentDone() {

    if (toggle) {

      const {deploymentButtons, indicators, stopDeploymentButton, stopExerciseButton, exerciseButtons} = this.refs;

      deploymentButtons.transitionTo({top: Dimensions.height}, 300, `ease-in-circ`);
      indicators.transitionTo({opacity: 0}, 300, `ease-in-circ`);
      stopDeploymentButton.transition({transform: [{translateY: 0}], opacity: 1}, {transform: [{translateY: - 90}], opacity: 0}, 300, `ease-in-circ`);
      stopExerciseButton.transition({transform: [{translateY: - 90}], opacity: 0}, {transform: [{translateY: 0}], opacity: 1}, 500, 200, `ease-out-circ`);
      exerciseButtons.transition({transform: [{translateY: 70}], opacity: 0}, {transform: [{translateY: 0}], opacity: 1}, 500, 200, `ease-out-circ`);

      setTimeout(() => {
        // this.hideControls();
      }, 5000);
    }
  }

  hideControls() {

    toggle = false;
    const {topControls, bottomControls} = this.refs;
    topControls.transition({transform: [{translateY: - 90}], opacity: 0}, {transform: [{translateY: 0}], opacity: 1}, 500, 200, `ease-out-circ`);
    bottomControls.transition({transform: [{translateY: 90}], opacity: 0}, {transform: [{translateY: 0}], opacity: 1}, 500, 200, `ease-out-circ`);
  }

  stepHandler(index) {

    let {currentSelectedDirectionIndex} = this.state;
    const {directions} = this.props;

    if (currentSelectedDirectionIndex + index > directions.length - 1) {
      this.timer();
      this.deploymentDone();
    }

    if (currentSelectedDirectionIndex + index < 0) {
      return;
    }

    currentSelectedDirectionIndex += index;

    this.setState({currentSelectedDirectionIndex});

    this.props.socket.emit(`nextStep`);
  }

  stopExcersizeHandler() {
    this.props.socket.emit(`stopExcersize`);
    Actions.pop();
  }

  generateDirections() {
    const {directions} = this.props;
    const {currentSelectedDirectionIndex} = this.state;

    return (
      <Animatable.View style={DeploymentStyle.directionsWrapper}>
        {
          directions.map((d, index) => {
            return (
              <Animatable.View style={[DeploymentStyle.directionImageWrapper, {borderColor: currentSelectedDirectionIndex === index ? Colors.black : `transparent`}]} ref={`direction${index}`} key={index}>
                <Image style={[DeploymentStyle.directionImage]} source={{uri: currentSelectedDirectionIndex === index ? `directionLighted` : `direction`}} />
              </Animatable.View>
            );
          })
        }
      </Animatable.View>
    );
  }

  closeInstructionsHandler() {

    if (!instructionsClick) {
      instructionsClick = true;
      const {instructions} = this.refs;
      instructions.transition({transform: [{translateY: 0}], opacity: 1}, {transform: [{translateY: 90}], opacity: 0}, 500, `ease-in-circ`);

    }
  }

  renderInstructions() {
    return (
      <TouchableWithoutFeedback onPress={() => this.closeInstructionsHandler()}>
        <Animatable.View animation='fadeInUp' duration={500} delay={500} ref='instructions' style={DeploymentStyle.instructions} >
          <View style={DeploymentStyle.instructionsTitleWrapper}>
            <Animatable.Image animation='swing' delay={2250} ref='instructionsHammer' style={DeploymentStyle.instructionsTitleIcon} source={require(`../assets/png/hammerIconBlack.png`)} />
            <Text style={[TextStyles.subTitle, DeploymentStyle.instructionsTitle]}>{`Opzetten van de oefening`.toUpperCase()}</Text>
          </View>
          <Text style={[TextStyles.copy, DeploymentStyle.instructionsCopy]}>Plaats de oplichtende Directions op jouw terrein om de oefening op de bouwen.{`\n`}Druk op volgende wanneer de opgelichte Direction juist staat.</Text>
        <View style={ButtonStyles.dismisInstructions}  >
          <Text style={[TextStyles.title, {color: Colors.white}, {fontSize: 16}]}>BEGREPEN</Text>
        </View>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }

  renderSteps() {

    const {directions} = this.props;
    const {currentSelectedDirectionIndex} = this.state;

    return (
      <Animatable.View ref='indicators' style={[DeploymentStyle.pageIndicatorWrapper, {transform: [{translateX: - directions.length * 10}]}]}>
        {
          directions.map((d, index) => {
            return <View key={index} style={[DeploymentStyle.pageIndicator, {opacity: currentSelectedDirectionIndex === index ? 1 : 0.25}]}></View>;
          })
        }

      </Animatable.View>
    );
  }

  changePageHandler(index) {
    const {currentPage} = this.state;
    const {pageContainer} = this.refs;

    const current = - currentPage * Dimensions.width;
    const future =  - (currentPage + index) * Dimensions.width;

    pageContainer.transition({transform: [{translateX: current}]}, {transform: [{translateX: future}]}, 300, `ease-out-sine`);

    this.setState({currentPage: currentPage + index});
  }


  timer() {

    seconds ++;
    if (seconds === 60) {
      seconds = 0;
      minutes ++;
    }

    if (timerGo) {

      timerText = `0:${minutes < 10 ? 0 : ``}${minutes}:${seconds < 10 ? 0 : ``}${seconds}`;

      if (mounted) {
        this.setState({time: timerText});
      }

      setTimeout(() => this.timer(), 1000);
    }
  }

  render() {

    const {exercise, directions} = this.props;
    const {time} = this.state;

    return (
      <Animatable.View style={DeploymentStyle.container} ref='pageContainer'>
        <View style={[DeploymentStyle.pageContainer]}>

          <Image style={[DeploymentStyle.fieldImage]} source={{uri: `${DatabaseUrl}/uploads/${exercise.image}.png`}} />

          {this.generateDirections()}

          <Animatable.View style={[DeploymentStyle.topBarWrapper]}ref={`topControls`}>

            <View style={[ButtonStyles.secundairyButton, DeploymentStyle.minimiseButton]}>
              <Image style={[DeploymentStyle.minimiseImageIcon, {transform: [{translateY: - 2}]}] } source={require(`../assets/png/arrowOrange.png`)} />
            </View>

            <Animatable.View ref='stopDeploymentButton'>
              <TouchableOpacity style={DeploymentStyle.buttonBottom, {marginLeft: 20}} onPress={() => this.stopExcersizeHandler()}>
                <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
                  <Image style={[DeploymentStyle.stopIcon]} source={require(`../assets/png/crossIconWhite.png`)} />
                  <Text style={[TextStyles.primaryButton]}>{`opstelling stopzetten`.toUpperCase()}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View ref='stopExerciseButton' style={[DeploymentStyle.stopExercise]}>
              <TouchableOpacity style={DeploymentStyle.buttonBottom} onPress={() => this.stopExcersizeHandler()}>
                <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
                  <Image style={[DeploymentStyle.stopIcon]} source={require(`../assets/png/crossIconWhite.png`)} />
                  <Text style={[TextStyles.primaryButton]}>{`oefening stoppen`.toUpperCase()}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
          </Animatable.View>

          {this.renderInstructions()}

          {this.renderSteps()}

          <Animatable.View style={{position: `relative`}}  ref={`bottomControls`}>
            <Animatable.View ref='deploymentButtons' style={[DeploymentStyle.bottomBarWrapper]}>
              <TouchableOpacity style={[ButtonStyles.secundairyButton, DeploymentStyle.buttonBottom]} onPress={() => this.stepHandler(- 1)}>
                <Image style={[DeploymentStyle.secundairyButtonImageIcon]} source={require(`../assets/png/backArrowOrange.png`)} />
                <Text style={[TextStyles.secundairyButton]}>{`vorige direction`.toUpperCase()}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={DeploymentStyle.buttonBottom} onPress={() => this.stepHandler(1)}>
                <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
                  <Text style={[TextStyles.primaryButton]}>{`volgende direction`.toUpperCase()}</Text>
                  <Image style={[DeploymentStyle.nextDirectionImageIcon]} source={require(`../assets/png/arrowButtonWhite.png`)} />
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View ref='exerciseButtons' style={[DeploymentStyle.bottomBarWrapper, DeploymentStyle.bottomBarWrapperExercise]}>
              <TouchableOpacity style={[ButtonStyles.secundairyButton, DeploymentStyle.buttonBottom]}>
                <Image style={[DeploymentStyle.takeNoteIcon]} source={require(`../assets/png/takeNoteIconOrange.png`)} />
              </TouchableOpacity>

              <TouchableOpacity style={DeploymentStyle.buttonBottom} onPress={() => this.changePageHandler(1)}>
                <LinearGradient style={[ButtonStyles.secundairyButton, DeploymentStyle.secundairyButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
                  <Image style={[DeploymentStyle.overviewIcon]} source={require(`../assets/png/overviewIconOrange.png`)} />
                  <Text style={[TextStyles.secundairyButton]}>{`overzicht`.toUpperCase()}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
          </Animatable.View>
        </View>

        <View style={[DeploymentStyle.pageContainer, DeploymentStyle.overview]}>

          <View style={[DeploymentStyle.overviewHeader]}>

            <TouchableOpacity style={ExerciseDetailStyle.backButtonWrapper} onPress={() => this.changePageHandler(- 1)} >
              <Image style={ExerciseDetailStyle.backButtonIcon} source={require(`../assets/png/backArrowOrange.png`)} />
              <Text style={[TextStyles.subTitle, DeploymentStyle.overviewBackText]} >{`terug naar oefening`.toUpperCase()}</Text>
            </TouchableOpacity>

            <View style={DeploymentStyle.titleWrapper}>
              <Text style={[TextStyles.title, DeploymentStyle.titleText]}>{`Oefening op aanvallen via de flank`.toUpperCase()}</Text>
              <Text style={[TextStyles.copy, DeploymentStyle.titleText]} ref={`tijd`}>{`Totale tijd: ${time}`}</Text>
            </View>

            <TouchableOpacity style={DeploymentStyle.buttonBottom} onPress={() => this.stopExcersizeHandler()}>
              <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
                <Image style={[DeploymentStyle.stopIcon]} source={require(`../assets/png/crossIconWhite.png`)} />
                <Text style={[TextStyles.primaryButton]}>{`oefening stoppen`.toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>

          <View style={[DeploymentStyle.overviewContent]}>
            <Text style={[TextStyles.subTitle, DeploymentStyle.overviewContentSubTitle]}>{`Huidige oefening`.toUpperCase()}</Text>
            <View style={DeploymentStyle.exercise}>
              <View style={[DeploymentStyle.exerciseHeader]}>
                <View style={[DeploymentStyle.exerciseTitleWrapper]}>
                  <Image style={[DeploymentStyle.overviewExerciseImage]} source={{uri: `${exercise.sport.imageName}`}} />
                  <Text style={[TextStyles.subTitle, DeploymentStyle.exerciseTitle]}>{`${exercise.name}`.toUpperCase()}</Text>
                </View>

                <View style={[DeploymentStyle.exerciseRatingWrapper]}>
                  <Text style={[TextStyles.subTitle, DeploymentStyle.exerciseTitle]}>{`beoordeling`.toUpperCase()}</Text>
                  <View style={[DeploymentStyle.exerciseRatingWrapper]}>
                    {
                      range(5).map((r, index) => {
                        return <Image key={index} style={[DeploymentStyle.overviewExerciseImageStar]} source={require(`../assets/png/starIconFull.png`)} />;
                      })
                    }
                  </View>

                </View>
              </View>
              <View style={[DeploymentStyle.overviewExerciseCard]}>
                <View style={[DeploymentStyle.overviewExercisePreviewImageWrapper]}>
                  <Image style={[DeploymentStyle.overviewExercisePreviewImage]} source={{uri: `${DatabaseUrl}/uploads/${exercise.imageWithDirections}.png`}} />
                </View>

                <View style={DeploymentStyle.exerciseSpecs}>

                  <View style={DeploymentStyle.exerciseSpec}>
                    <Text style={TextStyles.subTitle}>{`aantal directions`.toUpperCase()}</Text>
                    <View style={[DeploymentStyle.overviewExerciseSpecImageWrapper]}>
                      <Image style={[DeploymentStyle.overviewExerciseSpecDirectionIcon]} source={require(`../assets/png/directionIcon.png`)} />
                      <Text style={TextStyles.copy}>{`${directions.length}`.toUpperCase()}</Text>
                    </View>
                  </View>

                  <View style={DeploymentStyle.exerciseSpec}>
                    <Text style={TextStyles.subTitle}>{`aantal spelers`.toUpperCase()}</Text>
                    <View style={[DeploymentStyle.overviewExerciseSpecImageWrapper]}>
                      <Image style={[DeploymentStyle.overviewExerciseSpecPlayerIcon]} source={require(`../assets/png/playerAmountIcon.png`)} />
                      <Text style={TextStyles.copy}>{`${exercise.groupSize}`.toUpperCase()}</Text>
                    </View>
                  </View>

                  <View style={DeploymentStyle.exerciseSpec}>
                    <Text style={TextStyles.subTitle}>{`moeilijkheidsgraad`.toUpperCase()}</Text>
                    <View style={[DeploymentStyle.overviewExerciseSpecImageWrapper]}>
                      <Image style={[DeploymentStyle.overviewExerciseSpecIntensivityIcon]} source={require(`../assets/png/intensityIconBlack.png`)} />
                      <Text style={TextStyles.copy}>{`${exercise.intensity === 0 ? `Makkelijk` : `Moeilijk`}`}</Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Text style={TextStyles.subTitle}>{`beschrijving`.toUpperCase()}</Text>
                  <Text style={[TextStyles.copy, DeploymentStyle.exerciseCopy]}>{`${exercise.desc}`}</Text>
                </View>
              </View>
            </View>

          </View>

          <Image style={[DeploymentStyle.infoBackgroundImage]} source={require(`../assets/png/detailBackground.png`)} />
        </View>
      </Animatable.View>
    );
  }
}

Deployment.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string,
  exerciseId: React.PropTypes.string,
  directions: React.PropTypes.array,
  exercise: React.PropTypes.object
};

export default Deployment;
