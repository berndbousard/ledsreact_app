import React, {Component} from 'react';
import {View, Button, TouchableOpacity, Text, Image, TextInput, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

import {GeneralStyle, MyExercisesStyle, MyDirectionsStyle, Colors, TextStyles, ButtonStyles} from '../styles';
import {Navigation, Exercise} from '../components';
import {range} from 'lodash';

class MyExercises extends Component {

  state = {
    currentTab: 0
  }

  renderSecondNav() {

    const {currentTab} = this.state;

    return (
      <LinearGradient style={MyExercisesStyle.secondNav} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>

        <TouchableOpacity style={MyExercisesStyle.secondNavLink}>
          <Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 0 ? Colors.white : Colors.black, opacity: currentTab === 0 ? 1 : 0}]}>{`Mijn creaties`.toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={MyExercisesStyle.secondNavLink}>
          <Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 1 ? Colors.white : Colors.black, opacity: currentTab === 1 ? 1 : .5}]}>{`gedownload`.toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={MyExercisesStyle.secondNavLink}>
          <Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 2 ? Colors.white : Colors.black, opacity: currentTab === 2 ? 1 : .5}]}>{`aangekocht`.toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={MyExercisesStyle.secondNavLink}>
          <Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 3 ? Colors.white : Colors.black, opacity: currentTab === 3 ? 1 : .5}]}>{`ploeg`.toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[ButtonStyles.primaryButton, MyExercisesStyle.blackButton]}>
          <Image style={[MyExercisesStyle.blackButtonIcon]} source={require(`../assets/png/addIconWhite.png`)} />
          <Text style={TextStyles.primaryButton}>{`Oefening maken`.toUpperCase()}</Text>
        </TouchableOpacity>

      </LinearGradient>
    );
  }

  renderFilterBar() {
    return (
      <View style={MyExercisesStyle.filterBar}>
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
          <Text style={TextStyles.secundairyButton}>{`Oefening maken`.toUpperCase()}</Text>
        </TouchableOpacity>

      </View>
    );
  }

  renderExercises() {
    return (
      <ScrollView>
        <View style={MyExercisesStyle.exercisesContainer}>
          {
            range(4).map((r, index) => {
              return (
                <TouchableOpacity onPress={() => Actions.exerciseDetail()} style={MyDirectionsStyle.ExerciseCard} key={index}>
                  <Exercise index={index} />
                </TouchableOpacity>
              );
            })
          }
        </View>
      </ScrollView>
    );
  }

  render() {

    return (
      <View style={GeneralStyle.pageContainer}>

        <Navigation currentPage={this.props.name} />

        <View style={[GeneralStyle.contentContainer, MyExercisesStyle.pageContainer]}>
          {this.renderSecondNav()}

          {this.renderFilterBar()}

          {this.renderExercises()}
        </View>

      </View>
    );
  }
}

MyExercises.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string
};

export default MyExercises;
