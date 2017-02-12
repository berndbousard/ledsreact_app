import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {isEmpty, capitalize} from 'lodash';
import {DatabaseUrl} from '../globals';

import {GeneralStyle, ExerciseDetailStyle, Colors, TextStyles, ButtonStyles} from '../styles';

let enoughDirections = false;
let largerPic =  false;

class ExerciseDetail extends Component {

  state = {
    exercise: {},
    directions: [],
    connectedDirections: [],
    showPopUp: false
  }

  goBack() {
    Actions.pop();
  }

  componentWillReceiveProps(props) {
    console.log(`willreceive`, props);
  }

  componentDidMount() {
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
    this.props.socket.off(`checkDirections`);
  }

  handleWScheckDirections(directions) {


    const {connectedDirections} = this.state;

    if (connectedDirections.length !== directions.length) {
      this.setState({connectedDirections: directions});
    }
  }

  checkDirections() {
    const {exercise, directions, connectedDirections} = this.state;
    const canTry = connectedDirections.length >= directions.length;

    console.log(`hey`);

    if (canTry) {
      this.hidePopUp();
      Actions.deployment({exercise: exercise, directions: directions});
    } else {
      this.setState({showPopUp: true});
    }
  }

  hidePopUp() {
    enoughDirections = true;
    this.setState({showPopUp: false});
  }





  checkForConnectedDirections() {
    if (!enoughDirections) {
      console.log(`check`);
      this.props.socket.emit(`checkDirections`);
      setTimeout(() => {
        this.checkForConnectedDirections();
      }, 2000);
    }
  }


  handlePopUpButton() {

    const {exercise, directions, connectedDirections} = this.state;
    const canTry = connectedDirections.length >= directions.length;

    if (canTry) {
      Actions.deployment({exercise: exercise, directions: directions});
    } else {
      this.hidePopUp();
    }
  }


  renderPopUp(missingDirectionCount, directionLength) {

    const {directions, connectedDirections, showPopUp} = this.state;
    const canTry = connectedDirections.length >= directions.length;

    missingDirectionCount = directions.length - connectedDirections.length;
    directionLength = connectedDirections.length;



    //checkout wordt niet uitgevoerd na het opnieuw tonen van het venster


    if (!canTry) {
      setTimeout(() => this.checkForConnectedDirections(), 2000);
    }

    if (showPopUp) {
      return (
        <View style={ExerciseDetailStyle.transparentBackground}>
          <View style={ExerciseDetailStyle.popUp}>
              <Text style={[TextStyles.title, {color: Colors.black}]} >{`Je mist ${missingDirectionCount} Directions voor deze oefening.`.toUpperCase()}</Text>
              <Image style={[ExerciseDetailStyle.missingDirectionImage]} source={require(`../assets/png/exercisedetail/popupImage.png`)} />
              <Text style={[TextStyles.graph], ExerciseDetailStyle.popUpTekstje} >{`Om deze oefeningen te kunnen uitproberen heb je ${missingDirectionCount} extra Directions nodig. Je hebt er momenteel ${directionLength} verbonden.`}</Text>
              <TouchableOpacity style={ExerciseDetailStyle.primaryButtonWrapper} onPress={() => this.handlePopUpButton()}>
                <LinearGradient style={[ButtonStyles.primaryButton, ExerciseDetailStyle.buttonWrapper]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
                  <Image style={[ExerciseDetailStyle.primaryPopButtonImage]} source={require(`../assets/png/crossIconWhite.png`)} />
                  <Text style={[TextStyles.primaryButton, ExerciseDetailStyle.primaryButtonText]}>{`dit venster sluiten`.toUpperCase()}</Text>
                </LinearGradient>
              </TouchableOpacity>
          </View>
        </View>
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

    console.log(`largerpic`);

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

            <View style={ExerciseDetailStyle.miniSpecItem}>
              <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`Sport`.toUpperCase()}</Text>
              <View style={ExerciseDetailStyle.miniSpecWrapper}>
                {this.renderSportIcon()}
                <Text style={TextStyles.copy}>{!isEmpty(exercise) ? capitalize(exercise.sport.name) : `Voetbal`}</Text>
              </View>
            </View>

            <View style={ExerciseDetailStyle.miniSpecItem}>
              <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`Focus`.toUpperCase()}</Text>
              <View style={ExerciseDetailStyle.miniSpecWrapper}>
                <Image style={ExerciseDetailStyle.reactionIcon} source={require(`../assets/png/reactionIconBlack.png`)} />
                <Text style={TextStyles.copy}>{!isEmpty(exercise) ? capitalize(exercise.focus) : `Reactiesnelheid`}</Text>
              </View>
            </View>

            <View style={ExerciseDetailStyle.miniSpecItem}>
              <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`Benodigde Directions`.toUpperCase()}</Text>
              <View style={ExerciseDetailStyle.miniSpecWrapper}>
                <Image style={ExerciseDetailStyle.directionIcon} source={require(`../assets/png/directionIcon.png`)} />
                <Text style={TextStyles.copy}>{directions.length} Direction{directions.length > 1 ? `s` : ``}</Text>
              </View>
            </View>

          </Animatable.View>

        </View>

        <View style={ExerciseDetailStyle.cardContentLower}>
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
          <Image style={ExerciseDetailStyle.commentImage} source={require(`../assets/png/dummyPerson2.png`)} />
          <View>
            <Text style={[TextStyles.commentAuthor]}>Bernd Bousard</Text>
            <Text style={[TextStyles.commentDate]}>geregeerd op 17 jan 2017</Text>
            <Text style={[TextStyles.copy, ExerciseDetailStyle.commentText]}>Ik vind dit een enorm leuke oefening om te doen met mijn spelers. De resultaten die onze ploeg hiermee boeken zijn niet te geloven.</Text>
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

                <View style={ExerciseDetailStyle.commentsWrapper}>
                  <Text style={[TextStyles.title, ExerciseDetailStyle.commentTitle]}>{`notities`.toUpperCase()}</Text>
                  {this.renderNotes()}
                </View>

                <View style={ExerciseDetailStyle.commentInputWrapper}>
                  <Text style={[TextStyles.subTitle]}>{`schrijf een notitie bij deze oefening`.toUpperCase()}</Text>
                  <TextInput style={[ExerciseDetailStyle.textInput, TextStyles.copy]} placeholder='Typ hier je notitie.' multiline={true}/>
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
