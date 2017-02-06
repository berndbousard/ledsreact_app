import React, {Component} from 'react';

import {View, Image, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
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

  renderCardHeader() {
    return (
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
    );
  }

  renderCardContent() {
    return (
      <View style={ExerciseDetailStyle.cardContent}>

        <View style={ExerciseDetailStyle.cardContentUpper}>

          <View style={ExerciseDetailStyle.schemaWrapper}>
            <Image style={ExerciseDetailStyle.schemaWrapperSchema} source={require(`../assets/png/dummySchema.png`)} />
            <TouchableOpacity style={ExerciseDetailStyle.schemaIconWrapper}>
              <Image style={ExerciseDetailStyle.schemaIcon} source={require(`../assets/png/fullScreenIconOrange.png`)} />
            </TouchableOpacity>
          </View>

          <View style={ExerciseDetailStyle.cardMainSpecsWrapper}>

            <View style={ExerciseDetailStyle.authorWrapper}>
              <Image style={ExerciseDetailStyle.authorImage} source={require(`../assets/png/dummyMan.png`)} />
              <View>
                <Text style={[TextStyles.author]}>Leonard Riley</Text>
                <Text style={TextStyles.copy}>1620 volgens</Text>
              </View>
            </View>

            <View style={ExerciseDetailStyle.miniSpecItem}>
              <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`Sport`.toUpperCase()}</Text>
              <View style={ExerciseDetailStyle.miniSpecWrapper}>
                <Image style={ExerciseDetailStyle.sportIcon} source={require(`../assets/png/soccerIcon.png`)} />
                <Text style={TextStyles.copy}>Voetbal</Text>
              </View>
            </View>

            <View style={ExerciseDetailStyle.miniSpecItem}>
              <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`Focus`.toUpperCase()}</Text>
              <View style={ExerciseDetailStyle.miniSpecWrapper}>
                <Image style={ExerciseDetailStyle.reactionIcon} source={require(`../assets/png/reactionIconBlack.png`)} />
                <Text style={TextStyles.copy}>Reactiesnelheid</Text>
              </View>
            </View>

            <View style={ExerciseDetailStyle.miniSpecItem}>
              <Text style={[TextStyles.subTitle, ExerciseDetailStyle.miniSpecTitle]}>{`Aantal Directions`.toUpperCase()}</Text>
              <View style={ExerciseDetailStyle.miniSpecWrapper}>
                <Image style={ExerciseDetailStyle.directionIcon} source={require(`../assets/png/directionIcon.png`)} />
                <Text style={TextStyles.copy}>5 Directions</Text>
              </View>
            </View>

          </View>

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
            <Text style={[TextStyles.copy, ExerciseDetailStyle.textCopy]}>In deze oefening wordt de reactiesnelheid van de speler op de proef gezet. Ik het de Directions zo ingesteld dat alle hoeken van het veld optimaal benut worden en het reactievermogen van de speler op de proef wordt gezet. Om de oefening compleet te maken heb ik er enkele extra's aan toegevoegd zodat er afwisseling mogelijk is.</Text>
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
          <TouchableOpacity style={ExerciseDetailStyle.analyseButtonWrapper} onPressOut={() => console.log(`analyse`)}>
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
            <Text style={[TextStyles.commentDate]}>geregeerd op 18 jan 2017</Text>
            <Text style={[TextStyles.copy, ExerciseDetailStyle.commentText]}>Ik vind dit een enorm leuke oefening om te doen met mijn spelers. De resultaten die onze ploeg hiermee boeken zijn niet te geloven.</Text>
          </View>
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

                {this.renderCardHeader()}

                {this.renderCardContent()}

                {this.renderAnalytics()}

                <View style={ExerciseDetailStyle.commentsWrapper}>
                  <Text style={[TextStyles.title, ExerciseDetailStyle.commentTitle]}>{`notities`.toUpperCase()}</Text>
                  {this.renderNotes()}
                </View>

                <View style={ExerciseDetailStyle.commentInputWrapper}>
                  <Text style={[TextStyles.subTitle]}>{`schrijf een notitie bij deze oefening`.toUpperCase()}</Text>
                  <TextInput style={[ExerciseDetailStyle.textInput, TextStyles.copy]}/>
                </View>

                <TouchableOpacity style={[ExerciseDetailStyle.analyseButtonWrapper, ExerciseDetailStyle.analyseButtonWrapperEnd]} onPressOut={() => console.log(`analyse`)}>
                  <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
                    <Image style={[ExerciseDetailStyle.primaryButtonImage3]} source={require(`../assets/png/noteIconWhite.png`)} />
                    <Text style={[TextStyles.primaryButton]}>{`mijn teamanalyse`.toUpperCase()}</Text>
                  </LinearGradient>
                </TouchableOpacity>

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
