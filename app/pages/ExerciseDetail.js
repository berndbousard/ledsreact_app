import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {isEmpty, capitalize} from 'lodash';
import {DatabaseUrl} from '../globals';

import {GeneralStyle, ExerciseDetailStyle, Colors, TextStyles, ButtonStyles} from '../styles';

let largerPic =  false;

class ExerciseDetail extends Component {

  state = {
    exercise: {},
    directions: [],
    connectedDirections: [],
    showPopUp: false,
    mount: false,
  }

  goBack() {
    Actions.pop();
  }

  handleWSupdateDirections(socketId) {
    const {connectedDirections} = this.state;

    const newDirections = connectedDirections.filter(d => {
      return d.socketId !== socketId;
    });

    this.setState({connectedDirections: newDirections});
  }

  handleWSdirectionJoined(direction) {

    const {connectedDirections} = this.state;
    connectedDirections.push(direction);

    this.setState({connectedDirections});
  }

  componentDidMount() {


    this.setState({mount: true});
    const {exerciseId} = this.props;

    if (!isEmpty(exerciseId)) {
      fetch(`${DatabaseUrl}/api/exercises/${exerciseId}`)
        .then(r => {
          return r.json();
        })
        .then(({exercise}) => {
          this.setState({exercise});
        })
        .catch(e => {
          console.log(e);
        });
    }

    if (!isEmpty(exerciseId)) {
      fetch(`${DatabaseUrl}/api/directions?exercise=${exerciseId}`)
        .then(r => {
          return r.json();
        })
        .then(({directions}) => {
          this.setState({directions});
        })
        .catch(e => {
          console.log(e);
        });
    }


    this.props.socket.on(`checkDirections`, directions => this.handleWScheckDirections(directions));
    this.props.socket.emit(`checkDirections`);

  }

  componentWillUnmount() {
    this.setState({mount: false});

    this.props.socket.off(`checkDirections`);
  }

  handleWScheckDirections(directions) {

    const {mount} = this.state;

    if (mount) {
      const {connectedDirections} = this.state;

      if (connectedDirections.length !== directions.length) {
        this.setState({connectedDirections: directions});
      }
    }
  }

  checkDirections() {

    const {exercise, directions, connectedDirections} = this.state;
    const canTry = connectedDirections.length >= directions.length;

    const {mount} = this.state;

    if (mount) {
      this.props.socket.on(`updateDirections`, socketId => this.handleWSupdateDirections(socketId));
      this.props.socket.on(`directionJoined`, direction => this.handleWSdirectionJoined(direction));
    }

    if (canTry) {
      this.hidePopUp(true);
      Actions.deployment({exercise: exercise, directions: directions});
    } else {
      this.setState({showPopUp: true});
    }
  }

  hidePopUp(deploy) {

    if (!deploy) {
      const {popUpItem, popUpItemBG} = this.refs;
      popUpItem.transition({transform: [{translateY: 0}], opacity: 1}, {transform: [{translateY: 90}], opacity: 0}, 500, `ease-out`);
      popUpItemBG.transition({opacity: 0.85}, {opacity: 0}, 500, `ease-out`);
    }


    setTimeout(() => {
      this.setState({showPopUp: false});
    }, 510);

  }


  handlePopUpButton() {

    const {exercise, directions, connectedDirections} = this.state;
    const canTry = connectedDirections.length >= directions.length;

    if (canTry) {
      this.hidePopUp();
      Actions.deployment({exercise: exercise, directions: directions});
    } else {
      this.hidePopUp();
    }
  }

  closePopUp() {

    this.hidePopUp();
  }

  renderPopUp(missingDirectionCount, directionLength) {

    const {directions, connectedDirections, showPopUp} = this.state;

    missingDirectionCount = directions.length - connectedDirections.length;
    directionLength = connectedDirections.length;

    const canTry = connectedDirections.length >= directions.length;

    if (showPopUp) {

      return (
        <Animatable.View animation='fadeIn' ref='popUpItemBG' duration={300} style={ExerciseDetailStyle.transparentBackground} >
          <Animatable.View animation = 'fadeInUp' ref='popUpItem'  duration={300} easing='ease-out' style={ExerciseDetailStyle.popUp}>
              <TouchableOpacity style={[ExerciseDetailStyle.popUpClose]} onPress={() => this.closePopUp()}>
                <View  >
                  <Image style={[ExerciseDetailStyle.popUpCloseImage]} source={require(`../assets/png/exercisedetail/closeIconGradient.png`)} />
                </View>
              </TouchableOpacity>
              <Text style={[TextStyles.title, {color: Colors.black}]} >{canTry === true ? `Je kan de oefening starten!`.toUpperCase() : `Je mist ${missingDirectionCount} ${missingDirectionCount === 1 ? `Direction` : `Directions`} voor deze oefening.`.toUpperCase()}</Text>
              <Image style={[ExerciseDetailStyle.missingDirectionImage]} source={{uri: canTry === true ? `popupImage2` : `popupImage`}} />
              <Text style={[TextStyles.graph], ExerciseDetailStyle.popUpTekstje} >{canTry === true ? `Je kan deze oefening nu uitproberen, er zijn genoeg directions verbonden.` :  `Om deze oefeningen te kunnen uitproberen heb je ${missingDirectionCount} extra ${missingDirectionCount === 1 ? `Direction` : `Directions`} nodig. Je hebt er momenteel ${directionLength} verbonden.`}</Text>
              <TouchableOpacity style={ExerciseDetailStyle.primaryButtonWrapper} onPress={() => this.handlePopUpButton()}>
                <LinearGradient style={[ButtonStyles.primaryButton, ExerciseDetailStyle.buttonWrapper]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
                  <Image style={[ExerciseDetailStyle.primaryPopButtonImage, {width: canTry === true ? 11.5 : 15}, {height: 15}]}source={{uri: canTry === true ? `playIconWhite` : `crossIconWhite`}} />
                  <Text style={[TextStyles.primaryButton, ExerciseDetailStyle.primaryButtonText]}>{canTry === true ? `start de oefening`.toUpperCase() : `dit venster sluiten`.toUpperCase()}</Text>
                </LinearGradient>
              </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      );
    }
  }

  renderHeader() {

    return (
      <View style={ExerciseDetailStyle.headerWrapper}>
        <TouchableOpacity style={ExerciseDetailStyle.backButtonWrapper} onPress={() => this.goBack()} >
          <Image style={ExerciseDetailStyle.backButtonIcon} source={require(`../assets/png/backArrowOrange.png`)} />
          <Text style={[TextStyles.title, ExerciseDetailStyle.backButtonText]} >{`terug naar overzicht`.toUpperCase()}</Text>
        </TouchableOpacity>

        <View style={ExerciseDetailStyle.headerButtonsWrapper}>

          <TouchableOpacity style={[ExerciseDetailStyle.headerSmallButtonWrapper, ExerciseDetailStyle.headerUploadWrapper]}>
            <Image style={[ExerciseDetailStyle.headerUploadIcon, {transform: [{translateX: - 2}]} ]} source={require(`../assets/png/uploadIconWhite.png`)} />
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

          <TouchableOpacity style={ExerciseDetailStyle.primaryButtonWrapper} onPress={() => this.checkDirections()}>
            <LinearGradient style={[ButtonStyles.primaryButton, ExerciseDetailStyle.buttonWrapper]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
              <Image style={[ExerciseDetailStyle.primaryButtonImage]} source={require(`../assets/png/playIconWhite.png`)} />
              <Text style={[TextStyles.primaryButton, ExerciseDetailStyle.primaryButtonText]}>{`uitproberen`.toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderCardHeader() {

    const {exercise} = this.state;

    return (
      <View style={ExerciseDetailStyle.cardHeader}>

        <View style={ExerciseDetailStyle.cardTitle}>
          <Image style={ExerciseDetailStyle.cardTitleIcon} source={require(`../assets/png/soccerIconWhite.png`)} />
          <View>
            <Text style={[TextStyles.mainTitle, ExerciseDetailStyle.titleText]}>{!isEmpty(exercise) ? `${exercise.name}`.toUpperCase() : `aanvallen via midden`.toUpperCase()}</Text>
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
    );
  }

  enlargeMyPic() {
    const {pic, mainSpecs} = this.refs;

    // width: 510
    // height: 372

    // if (largerPic) {
    //   pic.transition({transform: [{translateX: 510 / 2}, {translateY: 372 / 2}, {scale: 2}]}, {transform: [{translateX: 0}, {translateY: 0}, {scale: 1}]}, 500, `ease-in-out`);
    // } else {
    //   pic.transition({transform: [{translateX: 0}, {translateY: 0}, {scale: 1}]}, {transform: [{translateX: 510 / 2}, {translateY: 372 / 2}, {scale: 2}]}, 500, `ease-in-out`);
    // }

    if (!largerPic) {

      mainSpecs.transitionTo({transform: [{translateY: 50}], opacity: 0}, 200, `ease-out`);
      setTimeout(() => {
        pic.transitionTo({width: 855, height: 624}, 300, `ease-out`);
      }, 100);

    } else {

      pic.transitionTo({width: 510, height: 372}, 500, 200, `ease-out`);
      setTimeout(() => {
        mainSpecs.transitionTo({transform: [{translateY: 0}], opacity: 1}, 300, `ease-out`);
      }, 400);

    }

    setTimeout(() => {
      largerPic = !largerPic;
    }, 500);
  }

  renderSportIcon() {

    const {exercise} = this.state;

    let url = require(`../assets/png/soccerIcon.png`);

    if (!isEmpty(exercise)) {
      url = {uri: `${exercise.sport.imageName}`};
    }

    return (
      <Image style={ExerciseDetailStyle.sportIcon} source={url} />
    );
  }

  renderCardContent() {

    const {exercise, directions} = this.state;
    let fieldImageUrl = require(`../assets/png/dummySchema.png`);
    let proPicUrl = require(`../assets/png/dummyMan.png`);

    if (!isEmpty(exercise)) {

      fieldImageUrl = {uri: `${DatabaseUrl}/uploads/${exercise.imageWithDirections}.png`};
      proPicUrl = require(`../assets/png/propic.jpg`);
    }

    return (
      <View style={ExerciseDetailStyle.cardContent}>

        <View style={ExerciseDetailStyle.cardContentUpper}>

          <View style={ExerciseDetailStyle.schemaWrapper}>
            <Animatable.Image ref='pic' style={ExerciseDetailStyle.schemaWrapperSchema} source={fieldImageUrl} />
            <TouchableOpacity style={ExerciseDetailStyle.schemaIconWrapper} onPress={() => this.enlargeMyPic()}>
              <Image style={ExerciseDetailStyle.schemaIcon} source={require(`../assets/png/fullScreenIconOrange.png`)} />
            </TouchableOpacity>
          </View>

          <Animatable.View ref='mainSpecs' style={ExerciseDetailStyle.cardMainSpecsWrapper}>

            <View style={ExerciseDetailStyle.authorWrapper}>
              <Image style={ExerciseDetailStyle.authorImage} source={proPicUrl} />
              <View>
                <Text style={[TextStyles.author, ExerciseDetailStyle.authorText]}>{!isEmpty(exercise) ? capitalize(exercise.creator.name) : `Leonard Riley`}</Text>
                <Text style={TextStyles.copy}>1620 volgers</Text>
              </View>
            </View>

            <View style={[ExerciseDetailStyle.specifications]}>
              <View>
                <View style={ExerciseDetailStyle.miniSpecItem}>
                  <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`Sport:`.toUpperCase()}</Text>
                  <View style={ExerciseDetailStyle.miniSpecWrapper}>
                    {this.renderSportIcon()}
                    <Text style={TextStyles.copy}>{!isEmpty(exercise) ? capitalize(exercise.sport.name) : `Voetbal`}</Text>
                  </View>
                </View>

                <View style={ExerciseDetailStyle.miniSpecItem}>
                  <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`Aantal spelers:`.toUpperCase()}</Text>
                  <View style={ExerciseDetailStyle.miniSpecWrapper}>
                    <Image style={[ExerciseDetailStyle.reactionIcon, {height: 22}, {width: 22}]} source={require(`../assets/png/groupSizeIcon.png`)} />
                    <Text style={TextStyles.copy}>{!isEmpty(exercise) ? capitalize(exercise.groupSize) : `Aantal spelers`}</Text>
                  </View>
                </View>

                <View style={ExerciseDetailStyle.miniSpecItem}>
                  <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`aantal Directions:`.toUpperCase()}</Text>
                  <View style={ExerciseDetailStyle.miniSpecWrapper}>
                    <Image style={[ExerciseDetailStyle.directionIcon, {width: 22}, {height: 22}]} source={require(`../assets/png/directionIcon.png`)} />
                    <Text style={TextStyles.copy}>{directions.length} Direction{directions.length > 1 ? `s` : ``}</Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={ExerciseDetailStyle.miniSpecItem}>
                  <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`Focus:`.toUpperCase()}</Text>
                  <View style={ExerciseDetailStyle.miniSpecWrapper}>
                    <Image style={ExerciseDetailStyle.reactionIcon} source={require(`../assets/png/reactionIconBlack.png`)} />
                    <Text style={TextStyles.copy}>{!isEmpty(exercise) ? capitalize(exercise.focus) : `Reactiesnelheid`}</Text>
                  </View>
                </View>

                <View style={[ExerciseDetailStyle.miniSpecItem, {marginTop: 20}]}>
                  <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`Leeftijd:`.toUpperCase()}</Text>
                  <View style={ExerciseDetailStyle.miniSpecWrapper}>
                    <Image style={[ExerciseDetailStyle.reactionIcon, {width: 27}, {height: 22} ]} source={require(`../assets/png/exercisedetail/taart.png`)} />
                    <Text style={TextStyles.copy}>{!isEmpty(exercise) ? capitalize(exercise.targetAge) : `16`}</Text>
                  </View>
                </View>

                <View style={[ExerciseDetailStyle.miniSpecItem, {marginTop: 22}]}>
                  <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`Intensiviteit`.toUpperCase()}</Text>
                  <View style={ExerciseDetailStyle.miniSpecWrapper}>
                    <Image style={[ExerciseDetailStyle.directionIcon, {width: 22}, {height: 22}]} source={require(`../assets/png/intensivityIcon.png`)} />
                    <Text style={TextStyles.copy}>{`Makkelijk`}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Animatable.View>
          </View>


        <View style={[ExerciseDetailStyle.cardContentLower]}>
          <View>
            <Text style={TextStyles.subTitle}>{`Extra benodigdheden`.toUpperCase()}</Text>
            <View style={ExerciseDetailStyle.extraItem}>
              <View style={ExerciseDetailStyle.extraCircle}>
              </View>
              <Image style={ExerciseDetailStyle.extraPotIcon} source={require(`../assets/png/potIconBlack.png`)} />
              <Text>5 potjes</Text>
            </View>

            <View style={ExerciseDetailStyle.extraItem}>
              <View style={ExerciseDetailStyle.extraCircle}>
              </View>
              <Image style={ExerciseDetailStyle.extraConeIcon} source={require(`../assets/png/coneIconBlack.png`)} />
              <Text>4 kegels</Text>
            </View>

            <View style={ExerciseDetailStyle.extraItem}>
              <View style={ExerciseDetailStyle.extraCircle}>
              </View>
              <Image style={ExerciseDetailStyle.extraPoleIcon} source={require(`../assets/png/poleIconBlack.png`)} />
              <Text>2 paaltjes</Text>
            </View>
          </View>

          <View style={ExerciseDetailStyle.descWrapper}>
            <Text style={TextStyles.subTitle}>{`beschrijving`.toUpperCase()}</Text>
            <Text style={[TextStyles.copy, ExerciseDetailStyle.textCopy]}>{!isEmpty(exercise) ? exercise.desc : `In deze oefening wordt de reactiesnelheid van de speler op de proef gezet. Ik het de Directions zo ingesteld dat alle hoeken van het veld optimaal benut worden en het reactievermogen van de speler op de proef wordt gezet. Om de oefening compleet te maken heb ik er enkele extra's aan toegevoegd zodat er afwisseling mogelijk is.`}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderAnalytics() {
    return (
      <View style={ExerciseDetailStyle.AnalyticsWrapper}>
        <View>
          <Text style={TextStyles.subTitle}>{`gemiddelde resultaten`.toUpperCase()}</Text>
          <Text style={[TextStyles.copy, ExerciseDetailStyle.textCopyAnalyse]}>Bekijk en vergelijk de prestaties van je team op provinciaal en nationaal niveau via Mijn Teamanalyse</Text>
          <TouchableOpacity style={ExerciseDetailStyle.analyseButtonWrapper}  onPressOut={() => Actions.analytics()}>
            <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
              <Image style={[ExerciseDetailStyle.primaryButtonImage2]} source={require(`../assets/png/analyticsIconWhite.png`)} />
              <Text style={[TextStyles.primaryButton]}>{`mijn teamanalyse`.toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={ExerciseDetailStyle.analyticsIconsWrapper}>
          <View style={ExerciseDetailStyle.analyticsItem}>
            <View style={[ExerciseDetailStyle.analyticsItemBack, ExerciseDetailStyle.analyticsItemShoeBack]}>
              <Image style={ExerciseDetailStyle.shoe} source={require(`../assets/png/shoe.png`)} />
            </View>
            <Text style={TextStyles.subTitle}>{`loopsnelheid`.toUpperCase()}</Text>
            <Text style={[TextStyles.subTitle, ExerciseDetailStyle.improvement]}>{`+2km/u`.toUpperCase()}</Text>
          </View>

          <View style={ExerciseDetailStyle.analyticsItem}>
            <View style={ExerciseDetailStyle.analyticsItemBack}>
              <Image style={ExerciseDetailStyle.eye} source={require(`../assets/png/eye.png`)} />
            </View>
            <Text style={TextStyles.subTitle}>{`reactiesnelheid`.toUpperCase()}</Text>
            <Text style={[TextStyles.subTitle, ExerciseDetailStyle.improvement]}>{`+0.3s`.toUpperCase()}</Text>
          </View>

          <View style={ExerciseDetailStyle.analyticsItem}>
            <View style={ExerciseDetailStyle.analyticsItemBack}>
              <Image style={ExerciseDetailStyle.heart} source={require(`../assets/png/heart.png`)} />
            </View>
            <Text style={TextStyles.subTitle}>{`hartslag`.toUpperCase()}</Text>
            <Text style={[TextStyles.subTitle, ExerciseDetailStyle.improvement]}>{`-10bmp`.toUpperCase()}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderNotes() {
    return (
      <View style={[ExerciseDetailStyle.comment]}>
        <View style={ExerciseDetailStyle.commentTextWrapper}>
          <Image style={ExerciseDetailStyle.commentImage} source={require(`../assets/png/propic.jpg`)} />
          <View>
            <Text style={[TextStyles.commentAuthor]}>Bernd</Text>
            <Text style={[TextStyles.commentDate]}>geregeerd op 17 jan 2017</Text>
            <Text style={[TextStyles.copy, ExerciseDetailStyle.commentText]}>Na 30min te trainen zijn de spelers bekaf met deze oefening.{`\n`}Proberen meer variatie in te steken.</Text>
          </View>
        </View>
      </View>
    );
  }

  checkPopUp() {}

  render() {

    const {origin} = this.props;

    return (
      <Animatable.View animation={isEmpty(origin) ? `fadeIn` : `fadeInUpBig`} duration={isEmpty(origin) ? 300 : 500} style={[GeneralStyle.pageContainer, ExerciseDetailStyle.pageContainer]}>
        <View>
          {this.renderPopUp()}
          {this.renderHeader()}

          <ScrollView style={ExerciseDetailStyle.scrollContentWrapper}>
            <View style={ExerciseDetailStyle.scrollContent}>

              <Image style={ExerciseDetailStyle.background} source={require(`../assets/png/detailBackground.png`)} />

              <View style={ExerciseDetailStyle.card}>

                {this.renderCardHeader()}

                {this.renderCardContent()}

                {this.renderAnalytics()}

                <View style={[ExerciseDetailStyle.commentsWrapper, {marginTop: - 30}]}>
                  <Text style={[TextStyles.title, ExerciseDetailStyle.commentTitle]}>{`notities`.toUpperCase()}</Text>
                  {this.renderNotes()}
                </View>

                <View style={ExerciseDetailStyle.commentInputWrapper}>
                  <Text style={[TextStyles.subTitle]}>{`schrijf een notitie bij deze oefening`.toUpperCase()}</Text>
                  <TextInput style={[ExerciseDetailStyle.textInput, TextStyles.copy, {paddingTop: 10}]} placeholder='Typ hier je notitie.' multiline={true}/>
                </View>

                <TouchableOpacity style={[ExerciseDetailStyle.analyseButtonWrapper, ExerciseDetailStyle.analyseButtonWrapperEnd]} onPressOut={() => console.log(`analyse`)}>
                  <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
                    <Image style={[ExerciseDetailStyle.primaryButtonImage3]} source={require(`../assets/png/noteIconWhite.png`)} />
                    <Text style={[TextStyles.primaryButton]}>{`notitie plaatsen`.toUpperCase()}</Text>
                  </LinearGradient>
                </TouchableOpacity>

              </View>

            </View>
          </ScrollView>
        </View>
      </Animatable.View>
    );
  }
}

ExerciseDetail.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string,
  exerciseId: React.PropTypes.string,
  origin: React.PropTypes.string
};

export default ExerciseDetail;
