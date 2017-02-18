import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image, TextInput, ScrollView} from 'react-native';

import {Navigation} from '../components';

import {GeneralStyle, MyExercisesStyle, MyDirectionsStyle, Colors, TextStyles, ButtonStyles, AnalyticsStyles} from '../styles';
import LinearGradient from 'react-native-linear-gradient';


class Discover extends Component {

  state = {
    currentTab: 0
  }

  renderSecondNav() {

    const {currentTab} = this.state;

    return (
      <LinearGradient style={[AnalyticsStyles.secondNav, {marginLeft: 1}]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
      <TouchableOpacity style={[MyExercisesStyle.secondNavLink, AnalyticsStyles.navItems]}>
        <Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 0 ? Colors.white : Colors.black, opacity: currentTab === 0 ? 1 : 0}]}>{`ontdekken`.toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[MyExercisesStyle.secondNavLink, AnalyticsStyles.navItems]}>
        <Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 1 ? Colors.white : Colors.black, opacity: currentTab === 1 ? 1 : .5}]}>{`volgend`.toUpperCase()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[MyExercisesStyle.secondNavLink, AnalyticsStyles.navItems]}>
        <Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 2 ? Colors.white : Colors.black, opacity: currentTab === 2 ? 1 : .5}]}>{`pro pakketten`.toUpperCase()}</Text>
      </TouchableOpacity>

      <LinearGradient style={[AnalyticsStyles.navBorder, {left: currentTab === 0 ? 33 : currentTab === 1 ? 190 : 340}]} colors={[Colors.white, Colors.navBorderWhite]} start={{x: 0, y: 1}} end={{x: 1, y: 1}}></LinearGradient>

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
          <Text style={TextStyles.secundairyButton}>{`filteren`.toUpperCase()}</Text>
        </TouchableOpacity>

      </View>
    );
  }

  render() {

    return (
      <View style={GeneralStyle.pageContainer}>
        <Navigation currentPage={this.props.name} />
        <View style={[ GeneralStyle.contentContainer, MyDirectionsStyle.imageContainer]}>
          {this.renderSecondNav()}
          {this.renderFilterBar()}
          <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: Colors.lightGrey}}>
            <Image style={MyDirectionsStyle.discoverImage} source={require(`../assets/png/discover/discover.png`)} />
          </ScrollView>
        </View>

      </View>
    );
  }
}

Discover.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string
};

export default Discover;
