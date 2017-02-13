import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Text, Image, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';

import LinearGradient from 'react-native-linear-gradient';
import {GeneralStyle, TextStyles, AnalyticsStyles, Colors, MyExercisesStyle, ButtonStyles, MyDirectionsStyle, TrainingStyle} from '../styles';
import {Dimensions} from '../styles';
import {Navigation, ExerciseTraining} from '../components';
import {DatabaseUrl, Creator} from '../globals';
import * as Animatable from 'react-native-animatable';

class MyTrainings extends Component {

  state = {
    currentTab: 0,
    exercises: [],
  }

  componentDidMount() {
    this.fetchExercises();
  }

  fetchExercises() {
    fetch(`${DatabaseUrl}/api/exercises?creator=${Creator}`)
      .then(r => {
        return r.json();
      })
      .then(({exercises}) => {
        console.log(exercises);
        this.setState({exercises});
      })
      .catch(e => {
        console.log(e);
      });
  }

  renderTraining(start, end, name, date, delay) {
    return (<TouchableOpacity>
      <Animatable.View animation='fadeInUp' duration={600} delay={delay} style={MyDirectionsStyle.trainingwrapper}>
        <View style={MyDirectionsStyle.trainingsData}>
          <View style={MyDirectionsStyle.topContent}>
            <Text style={[TextStyles.title, {color: Colors.black}, {textAlign: `left`}, {marginBottom: 15}]}>{name.toUpperCase()}</Text>
            <View style={MyDirectionsStyle.trainingsSpecs}>
              <Image style={MyDirectionsStyle.dateIcon} source={require(`../assets/png/training/date.png`)}/>
              <Text style={[TextStyles.copy]}>{date}</Text>
            </View>
            <View style={MyDirectionsStyle.trainingsSpecs}>
              <Image style={MyDirectionsStyle.timeIcon} source={require(`../assets/png/training/time.png`)}/>
              <Text style={[TextStyles.copy]}>{`150 min`}</Text>
            </View>
          </View>
          <LinearGradient style={[ButtonStyles.primaryButton, MyDirectionsStyle.primaryButton ]} colors={[Colors.orange, Colors.gradientOrange]}>
            <Image style={[MyDirectionsStyle.buttonIconTrainer]} source={require(`../assets/png/myTrainingIcon.png`)} />
            <Text style={[TextStyles.primaryButton]}>{`bekijk training`.toUpperCase()}</Text>
          </LinearGradient>
        </View>
        <View style={MyDirectionsStyle.exercisesTrainingWrapper}>
        {this.renderTrainingen(start - 1, end - 1)}
        </View>
      </Animatable.View>
    </TouchableOpacity>);
  }

  renderTrainingen(start, end) {
    const {exercises} = this.state;

    return (exercises.map((e, index) => {
      if (index <= end && index >= start) {
        return (<ExerciseTraining key={index} index={index} {...e}/>);
      }
    }));
  }

  renderFilterBar() {
    return (
      <View style={[MyExercisesStyle.filterBar, TrainingStyle.filter]}>
        <View style={MyExercisesStyle.filterSearchWrapper}>
          <TextInput style={[TextStyles.copy, MyExercisesStyle.filterSearchInput]} placeholder='Zoek een oefening' />
          <Image style={MyExercisesStyle.filterSearchIcon} source={require(`../assets/png/searchIconBlack.png`)} />
        </View>

        <View style={MyExercisesStyle.sortWrapper}>
          <Text style={[TextStyles.copyBolder, MyExercisesStyle.sortTitle]}>Sorteer op</Text>
          <Text style={[TextStyles.copy]}>Intensiviteit</Text>
          <Image style={MyExercisesStyle.sortIcon} source={require(`../assets/png/dropDownArrow.png`)} />
        </View>

        <TouchableOpacity style={[ButtonStyles.secundairyButton]}>
          <Image style={[MyExercisesStyle.blackButtonIcon]} source={require(`../assets/png/filterIconOrange.png`)} />
          <Text style={TextStyles.secundairyButton}>{`filteren`.toUpperCase()}</Text>
        </TouchableOpacity>

      </View>
    );
  }

  renderSecondNav() {

    const {currentTab} = this.state;

    return (
		<LinearGradient style={[AnalyticsStyles.secondNav, TrainingStyle.secondeNav ]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>

      <View style={[TrainingStyle.secondeNavWrap]}>
			<TouchableOpacity style={[MyExercisesStyle.secondNavLink, AnalyticsStyles.navItems]}>
				<Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 0 ? Colors.white : Colors.black, opacity: currentTab === 0 ? 1 : 0}]}>{`ingepland`.toUpperCase()}</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[MyExercisesStyle.secondNavLink, AnalyticsStyles.navItems]}>
				<Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 1 ? Colors.white : Colors.black, opacity: currentTab === 1 ? 1 : .5}]}>{`niet ingepland`.toUpperCase()}</Text>
			</TouchableOpacity>

			<LinearGradient style={[AnalyticsStyles.navBorder, TrainingStyle.navBorder, {left: currentTab === 0 ? 60 : currentTab === 1 ? 190 : 340}]} colors={[Colors.white, Colors.navBorderWhite]} start={{x: 0, y: 1}} end={{x: 1, y: 1}}></LinearGradient>

      </View>

      <TouchableOpacity style={[ButtonStyles.primaryButton, MyExercisesStyle.blackButton, TrainingStyle.createTraining]} onPress={() => Actions.editor()}>
        <Image style={[MyExercisesStyle.blackButtonIcon]} source={require(`../assets/png/addIconWhite.png`)} />
        <Text style={TextStyles.primaryButton}>{`training maken`.toUpperCase()}</Text>
      </TouchableOpacity>
		</LinearGradient>
    );
  }

  render() {

    return (
      <View style={GeneralStyle.pageContainer}>

        <Navigation currentPage={this.props.name} />

        <View style={[GeneralStyle.contentContainer, TrainingStyle.contentBlock]}>
        {this.renderSecondNav()}
        {this.renderFilterBar()}
        <ScrollView showsVerticalScrollIndicator={false} style={[{width: Dimensions.width - 100}]}>
          <View style={TrainingStyle.trainersContent}>
            <Animatable.View animation='fadeInUp' duration={600} style={TrainingStyle.weekIndicator}>
              <Text style={[TextStyles.copy, {color: Colors.orange}]}>{`Deze week`}</Text>
              <View style={TrainingStyle.ruler}></View>
            </Animatable.View>
              {this.renderTraining(1, 2, `oefenen op centraal verdedigen`, `Vrijdag 17 februari 2017`, 80)}
            <Animatable.View animation='fadeInUp' delay={160} duration={600} style={[TrainingStyle.weekIndicator, TrainingStyle.weekIndicatorNotActive, {marginTop: 30}]}>
              <Text style={[TextStyles.copy, {color: Colors.black}]}>{`Volgende week`}</Text>
              <View style={[TrainingStyle.ruler, {width: 650}, {backgroundColor: Colors.black}]}></View>
            </Animatable.View>
            {this.renderTraining(3, 4, `oefenen op aanvallen via flank`, `Maandag 20 februari 2017`, 240)}
          </View>
        </ScrollView>
        </View>
      </View>
    );
  }
}

MyTrainings.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string
};

export default MyTrainings;
