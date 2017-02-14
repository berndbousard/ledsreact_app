import React, {Component} from 'react';
import {View, Text, Alert, TextInput, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

import {isEmpty} from 'lodash';
import * as Animatable from 'react-native-animatable';

import {DatabaseUrl, AsyncStorage} from '../globals';
import {TextStyles, Colors, LoginStyle, EditorStyle, ButtonStyles} from '../styles';



// https://facebook.github.io/react-native/docs/textinput.html

export default class Login extends Component {

  state = {
    email: ``,
    password: ``
  };

  login() {
    const {email, password} = this.state;

    if (this.isValid()) {
      fetch(`${DatabaseUrl}/api/auth`, {
        method: `POST`,
        headers: {Accept: `application/json`, 'Content-Type': `application/json`},
        body: JSON.stringify({
          login: email,
          password: password,
          audience: `app`
        })
      })
        .then(r => {
          return r.json();
        })
        .then(r => {
          AsyncStorage.setItem(`token`, r.token);
          Actions.myDirections();
        })
        .catch(e => {
          Alert.alert(
            `Inloggen mislukt`,
            e,
            {text: `Opnieuw proberen`, onPress: () => console.log(`Ask me later pressed`)}
          );
        });
    }
  }


  isValid() {
    const {email, password} = this.state;

    if (isEmpty(email)) {
      Alert.alert(
        `Inloggen mislukt`,
        `Je bent je email vergeten invullen`,
        {text: `Ok`}
      );
      return false;
    }

    if (isEmpty(password)) {
      Alert.alert(
        `Inloggen mislukt`,
        `Je bent je wachtwoord vergeten invullen`,
        {text: `Ok`}
      );
      return false;
    }

    return true;
  }

  render() {

    return (
      <View style={EditorStyle.form}>
        <View ref='formHeader' style={EditorStyle.formHeader}>
          <View style={[EditorStyle.formTitleWrapper, LoginStyle.headerText ]}>
            <Text style={[TextStyles.mainTitle, EditorStyle.formTitle]}>{`inloggen`.toUpperCase()}</Text>
            <Text style={[TextStyles.copy, EditorStyle.formTitleCopy]}>Vul je account gegevens in om in te loggen:</Text>
          </View>

          {/* <TouchableOpacity style={EditorStyle.formCloseIconWrapper}>
            <Image style={EditorStyle.formCloseIcon} source={require(`../assets/png/closeIconSmallWhite.png`)} />
          </TouchableOpacity> */}

          <TouchableOpacity style={EditorStyle.formBackWrapper} onPress={() => this.changePage(0)}>
            <Image style={EditorStyle.formBackIcon} source={require(`../assets/png/backArrowOrange.png`)} />
            <Text style={[TextStyles.subTitle, EditorStyle.formBackText]}>{`Terug naar menu`.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
        <Image ref='headerImage' style={EditorStyle.formHeaderImage} source={require(`../assets/png/editorHeaderBlack.png`)} />

        <View style={{overflow: `hidden`}}>
          <View ref='formContent' style={[EditorStyle.formContentWrapper, LoginStyle.input]}>
            <View style={EditorStyle.formPageOneContent}>
              <Animatable.View animation='fadeInUp' duration={600} delay={80} style={EditorStyle.naamWrapper}>
                <View style={EditorStyle.naamLabelWrapper}>
                  <Image style={EditorStyle.naamInputIcon} source={require(`../assets/png/exerciseIconBlack.png`)} />
                  <Text style={[TextStyles.subTitle]}>{`e-mail`.toUpperCase()}</Text>
                </View>
                <View style={[EditorStyle.naamInputWrapper]}>
                  <TextInput  style={[TextStyles.copy, EditorStyle.naamInput]} placeholder='Jouw email adres:' />
                </View>
              </Animatable.View>

              <Animatable.View animation='fadeInUp' duration={700} delay={160} style={[EditorStyle.naamWrapper, EditorStyle.descWrapper]}>
                <View style={EditorStyle.naamLabelWrapper}>
                  <Image style={EditorStyle.descInputIcon} source={require(`../assets/png/brushIcon.png`)} />
                  <Text style={[TextStyles.subTitle]}>{`Jouw wachtwoord:`.toUpperCase()}</Text>
                </View>
                <View style={[EditorStyle.naamInputWrapper, EditorStyle.descInputWrapper,  {borderRadius: 100}]}>
                  <TextInput  style={[TextStyles.copy, EditorStyle.descInput, {minHeight: 30}]} placeholder='****' />
                </View>
              </Animatable.View>
            </View>
          </View>
        </View>

        <View style={[EditorStyle.barBottomWrapper, LoginStyle.barBottomWrapper]}>
          <View style={[EditorStyle.primaryButtonInForm, LoginStyle.primaryButtonInForm]}>
            <TouchableOpacity onPressOut={() => Actions.directionOverview()}>
              <LinearGradient style={[ButtonStyles.primaryButton, EditorStyle.formButtonPrimaryWrapper, {backgroundColor: `blue`}]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
                <Image style={[EditorStyle.primaryButtonFormImage, LoginStyle.primaryButtonFormImage]} source={require(`../assets/png/loginIconWhite.png`)} />
                <Text ref='primaryButton' style={[TextStyles.primaryButton, EditorStyle.primaryFormButton]}>{`inloggen`.toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>


        </View>
    );
  }
}
