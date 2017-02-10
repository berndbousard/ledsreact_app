import React, {Component} from 'react';
import {View, Button, Image, TouchableOpacity, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {isEmpty} from 'lodash';

import {DatabaseUrl} from '../globals';
import {GeneralStyle, DeploymentStyle, Dimensions, ButtonStyles, Colors, TextStyles} from '../styles';

class Deployment extends Component {

  state = {
    currentSelectedDirectionIndex: 0
  }

  componentDidMount() {

    const {directions} = this.props;
    const {instructions, instructionsHammer} = this.refs;
    const {currentSelectedDirectionIndex} = this.state;

    console.log(directions);

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

  }

  nextStepHandler() {
    this.props.socket.emit(`nextStep`);
  }

  stopExcersizeHandler() {
    console.log(`stop`);
    this.props.socket.emit(`stopExcersize`);
    Actions.pop();
  }

  generateDirections() {
    const {directions} = this.props;
    const {currentSelectedDirectionIndex} = this.state;

    return (
      <View style={DeploymentStyle.directionsWrapper}>
        {
          directions.map((d, index) => {
            return (
              <Animatable.View style={[DeploymentStyle.directionImageWrapper, {borderColor: currentSelectedDirectionIndex === index ? Colors.black : Colors.black}]} ref={`direction${index}`} key={index}>
                <Image style={[DeploymentStyle.directionImage]} source={require(`../assets/png/direction.png`)} />
              </Animatable.View>
            );
          })
        }
      </View>
    );
  }

  renderInstructions() {
    return (
      <Animatable.View animation='fadeInUp' delay={1500} ref='instructions' style={DeploymentStyle.instructions}>
        <View style={DeploymentStyle.instructionsTitleWrapper}>
          <Animatable.Image animation='swing' delay={2250} ref='instructionsHammer' style={DeploymentStyle.instructionsTitleIcon} source={require(`../assets/png/hammerIconBlack.png`)} />
          <Text style={[TextStyles.subTitle, DeploymentStyle.instructionsTitle]}>{`Opzetten van de oefening`.toUpperCase()}</Text>
        </View>
        <Text style={[TextStyles.copy, DeploymentStyle.instructionsCopy]}>Zet de oplichtende direction op de juiste plaats zoals opgelicht in het schema.</Text>
      </Animatable.View>
    );
  }

  render() {

    const {exercise} = this.props;

    return (
      <View style={[DeploymentStyle.pageContainer]}>

        <Image style={[DeploymentStyle.fieldImage]} source={{uri: `${DatabaseUrl}/uploads/${exercise.image}.png`}} />

        {this.generateDirections()}

        <View style={[DeploymentStyle.topBarWrapper]}>

          <TouchableOpacity style={[ButtonStyles.secundairyButton, DeploymentStyle.minimiseButton]}>
            <Image style={[DeploymentStyle.minimiseImageIcon]} source={require(`../assets/png/arrowOrange.png`)} />
          </TouchableOpacity>

          <TouchableOpacity style={DeploymentStyle.buttonBottom} onPress={() => this.stopExcersizeHandler()}>
            <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
              <Image style={[DeploymentStyle.stopIcon]} source={require(`../assets/png/crossIconWhite.png`)} />
              <Text style={[TextStyles.primaryButton]}>{`oefening stopzetten`.toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

        {this.renderInstructions()}

        <View style={[DeploymentStyle.bottomBarWrapper]}>
          <TouchableOpacity style={[ButtonStyles.secundairyButton, DeploymentStyle.buttonBottom]}>
            <Image style={[DeploymentStyle.secundairyButtonImageIcon]} source={require(`../assets/png/backArrowOrange.png`)} />
            <Text style={[TextStyles.secundairyButton]}>{`vorige direction`.toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={DeploymentStyle.buttonBottom} onPress={() => this.nextStepHandler()}>
            <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
              <Text style={[TextStyles.primaryButton]}>{`volgende direction`.toUpperCase()}</Text>
              <Image style={[DeploymentStyle.nextDirectionImageIcon]} source={require(`../assets/png/arrowButtonWhite.png`)} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </View>
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
