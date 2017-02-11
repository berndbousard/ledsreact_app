import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {forIn} from 'lodash';


import {GeneralStyle, TextStyles, AnalyticsStyles, Colors, MyExercisesStyle, ButtonStyles, MyDirectionsStyle} from '../styles';
import {Navigation} from '../components';
import * as Animatable from 'react-native-animatable';

class Analytics extends Component {

  state = {
    currentTab: 0
  }

  componentDidMount() {

    let delay = 300;

    forIn(this.refs, r => {
      r.transition({transform: [{translateX: 100}], opacity: 0}, {transform: [{translateX: 0}], opacity: 1}, delay, `ease-out-quad`);
      delay += 150;
    });
  }

  renderSecondNav() {

    const {currentTab} = this.state;

    return (
		<LinearGradient style={AnalyticsStyles.secondNav} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>

			<TouchableOpacity style={[MyExercisesStyle.secondNavLink, AnalyticsStyles.navItems]}>
				<Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 0 ? Colors.white : Colors.black, opacity: currentTab === 0 ? 1 : 0}]}>{`Mijn ploeg`.toUpperCase()}</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[MyExercisesStyle.secondNavLink, AnalyticsStyles.navItems]}>
				<Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 1 ? Colors.white : Colors.black, opacity: currentTab === 1 ? 1 : .5}]}>{`mijn spelers`.toUpperCase()}</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[MyExercisesStyle.secondNavLink, AnalyticsStyles.navItems]}>
				<Text style={[TextStyles.secondNav, MyExercisesStyle.secondNavText, {color: currentTab === 2 ? Colors.white : Colors.black, opacity: currentTab === 2 ? 1 : .5}]}>{`mijn oefeningen`.toUpperCase()}</Text>
			</TouchableOpacity>

			<LinearGradient style={[AnalyticsStyles.navBorder, {left: currentTab === 0 ? 60 : currentTab === 1 ? 190 : 340}]} colors={[Colors.white, Colors.navBorderWhite]} start={{x: 0, y: 1}} end={{x: 1, y: 1}}></LinearGradient>

		</LinearGradient>
    );
  }

  renderControls() {

    return (
		<View style={[AnalyticsStyles.controlBar, {borderBottomWidth: 0}]}>
			<View style={AnalyticsStyles.monthControls}>
				<TouchableOpacity>
					<LinearGradient style={[ButtonStyles.squareButton, AnalyticsStyles.buttonWrapper]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0, y: 1}} end={{x: 1, y: 1}}>
						<Image style={[AnalyticsStyles.backButton]} source={require(`../assets/png/arrowWhite.png`)} />
					</LinearGradient>
				</TouchableOpacity>
				<Text style={[TextStyles.title, {color: Colors.black}]} >{`Februari`.toUpperCase()}</Text>
				<TouchableOpacity>
					<LinearGradient style={[ButtonStyles.squareButton, AnalyticsStyles.buttonWrapper]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0, y: 1}} end={{x: 1, y: 1}}>
						<Image style={[AnalyticsStyles.nextButton]} source={require(`../assets/png/arrowWhite.png`)} />
					</LinearGradient>
				</TouchableOpacity>
			</View>
			<View style={AnalyticsStyles.dropDown}>
				<Text style={[TextStyles.subTitle, AnalyticsStyles.label, {color: Colors.black}]} >{`Weergeven per`.toUpperCase()}</Text>
				<TouchableOpacity>
				<View style={[AnalyticsStyles.dropDownBox]}>
					<Text style={[TextStyles.dropDownText, {color: Colors.black}]}>{`maand`}</Text>
					<Image style={AnalyticsStyles.dropDownArrow} source={require(`../assets/png/dropDownArrow.png`)} />
				</View>
				</TouchableOpacity>
			</View>
		</View>
    );
  }

  renderStats() {
    return (
		<View style={[ AnalyticsStyles.backgroundStats]}>
			<View style={AnalyticsStyles.leftje}>
			<View style={AnalyticsStyles.title}>
				<Text style={[TextStyles.title, {paddingBottom: 10}, {color: Colors.orange}, {textAlign: `left`}]} >{`totalen en gemiddelen`.toUpperCase()}</Text>
			</View>
			<ScrollView style={AnalyticsStyles.horizontalScroll} horizontal={true} removeClippedSubviews={true} showsHorizontalScrollIndicator={false}>
				<View style={AnalyticsStyles.items}>
					<Animatable.View ref='item1' style={AnalyticsStyles.item}>
						<Text style={[TextStyles.mainTitle, {color: Colors.black}]} >{`80KM`.toUpperCase()}</Text>
						<View style={[AnalyticsStyles.itemContent, {marginTop: 10}, {marginBottom: 10}]}>
							<Image style={AnalyticsStyles.itemImage} source={require(`../assets/png/analyse/afstand.png`)} />
						</View>
						<Text style={[TextStyles.subTitle, AnalyticsStyles.analyseTitel, {color: Colors.black}, {marginBottom: 3}]} >{`totale afstand`.toUpperCase()}</Text>
						<Text style={[TextStyles.subTitle, {color: Colors.green}]} >{`+3KM`.toUpperCase()}</Text>
					</Animatable.View>
					<Animatable.View ref='item2' style={AnalyticsStyles.item}>
						<Text style={[TextStyles.mainTitle, {color: Colors.black}]} >{`0,7S`.toUpperCase()}</Text>
						<View style={[AnalyticsStyles.itemContent, {marginTop: 10}, {marginBottom: 10}]}>
							<Image style={AnalyticsStyles.itemImage} source={require(`../assets/png/analyse/reactiesnelheid.png`)} />
						</View>
						<Text style={[TextStyles.subTitle, AnalyticsStyles.analyseTitel, {color: Colors.black}, {marginBottom: 3}]} >{`gemiddelde reactiesnelheid`.toUpperCase()}</Text>
						<Text style={[TextStyles.subTitle, {color: Colors.green}]} >{`-0.2s`.toUpperCase()}</Text>
					</Animatable.View>
					<Animatable.View ref='item3' style={AnalyticsStyles.item}>
						<Text style={[TextStyles.mainTitle, {color: Colors.black}]} >{`135BPM`.toUpperCase()}</Text>
						<View style={[AnalyticsStyles.itemContent, {marginTop: 10}, {marginBottom: 10}]}>
							<Image style={AnalyticsStyles.itemImage} source={require(`../assets/png/analyse/hartje.png`)} />
						</View>
						<Text style={[TextStyles.subTitle, AnalyticsStyles.analyseTitel, {color: Colors.black}, {marginBottom: 3}]} >{`gemiddelde hartslag`.toUpperCase()}</Text>
						<Text style={[TextStyles.subTitle, {color: Colors.green}]} >{`-2BPM`.toUpperCase()}</Text>
					</Animatable.View>
					<Animatable.View ref='item4' style={AnalyticsStyles.item}>
						<Text style={[TextStyles.mainTitle, {color: Colors.black}]} >{`14X`.toUpperCase()}</Text>
						<View style={[AnalyticsStyles.itemContent, {marginTop: 10}, {marginBottom: 10}]}>
							<Image style={AnalyticsStyles.itemImage} source={require(`../assets/png/analyse/training.png`)} />
						</View>
						<Text style={[TextStyles.subTitle, AnalyticsStyles.analyseTitel, {color: Colors.black}, {marginBottom: 3}]} >{`aantal trainingen`.toUpperCase()}</Text>
						<Text style={[TextStyles.subTitle, {color: Colors.green}]} >{`+1`.toUpperCase()}</Text>
					</Animatable.View>
					<Animatable.View ref='item5' style={AnalyticsStyles.item}>
						<Text style={[TextStyles.mainTitle, {color: Colors.black}]} >{`20KM/H`.toUpperCase()}</Text>
						<View style={[AnalyticsStyles.itemContent, {marginTop: 10}, {marginBottom: 10}]}>
							<Image style={AnalyticsStyles.itemImage} source={require(`../assets/png/analyse/snelheid.png`)} />
						</View>
						<Text style={[TextStyles.subTitle, AnalyticsStyles.analyseTitel, {color: Colors.black}, {marginBottom: 3}]} >{`gemiddelde snelheid`.toUpperCase()}</Text>
						<Text style={[TextStyles.subTitle, {color: Colors.green}]} >{`+1,2KM/H`.toUpperCase()}</Text>
					</Animatable.View>
				</View>
			</ScrollView>
			</View>
		</View>
    );
  }

  renderGraph() {
    return (
		<View style={[AnalyticsStyles.graph]}>
			<View style={[AnalyticsStyles.graphTypeNav]}>
				<View style={[AnalyticsStyles.graphTitleIndicator]}></View>
				<TouchableOpacity><Text style={[TextStyles.title, {color: Colors.orange}]} >{`afstand`.toUpperCase()}</Text></TouchableOpacity>
				<TouchableOpacity><Text style={[TextStyles.title, AnalyticsStyles.graphTitle]} >{`reactiesnelheid`.toUpperCase()}</Text></TouchableOpacity>
				<TouchableOpacity><Text style={[TextStyles.title, AnalyticsStyles.graphTitle]} >{`hartslag`.toUpperCase()}</Text></TouchableOpacity>
				<TouchableOpacity><Text style={[TextStyles.title, AnalyticsStyles.graphTitle]} >{`snelheid`.toUpperCase()}</Text></TouchableOpacity>
				<TouchableOpacity><Text style={[TextStyles.title, AnalyticsStyles.graphTitle]} >{`uren training`.toUpperCase()}</Text></TouchableOpacity>
				<TouchableOpacity><Text style={[TextStyles.title, AnalyticsStyles.graphTitle]} >{`groei`.toUpperCase()}</Text></TouchableOpacity>
				<TouchableOpacity><Text style={[TextStyles.title, AnalyticsStyles.graphTitle]} >{`gewicht`.toUpperCase()}</Text></TouchableOpacity>
			</View>
			<View style={[AnalyticsStyles.lineGraph]}>
				<View style={[AnalyticsStyles.topGraph]}>
					<Image style={AnalyticsStyles.lineGraphImage} source={require(`../assets/png/analyse/graph.png`)} />
					<View>
						<Text style={[TextStyles.graph, AnalyticsStyles.yAS]} >{`500km`}</Text>
						<Text style={[TextStyles.graph, AnalyticsStyles.yAS]} >{`400km`}</Text>
						<Text style={[TextStyles.graph, AnalyticsStyles.yAS]} >{`300km`}</Text>
						<Text style={[TextStyles.graph, AnalyticsStyles.yAS]} >{`200km`}</Text>
						<Text style={[TextStyles.graph, AnalyticsStyles.yAS]} >{`100km`}</Text>
					</View>
				</View>
				<View style={[AnalyticsStyles.xASWrapper]}>
					<Text style={[TextStyles.graph, AnalyticsStyles.xAS]} >{`27 januari`}</Text>
					<Text style={[TextStyles.graph, AnalyticsStyles.xAS]} >{`3 februari`}</Text>
					<Text style={[TextStyles.graph, AnalyticsStyles.xAS]} >{`10 februari`}</Text>
					<Text style={[TextStyles.graph, AnalyticsStyles.xAS, {color: Colors.orange}, {transform: [{translateX: - 5}]}]} >{`17 februari`}</Text>
				</View>
				<View style={[AnalyticsStyles.legende, AnalyticsStyles.leftje]}>
					<View style={[AnalyticsStyles.legendeItem]}>
						<View style={[AnalyticsStyles.colorIndicator, {backgroundColor: Colors.gradientOrange}]}></View>
						<Text style={[TextStyles.primaryButton, {color: Colors.black}, {textAlign: `left`}]} >{`mijn team`.toUpperCase()}</Text>
					</View>
					<View style={[AnalyticsStyles.legendeItem]}>
						<View style={[AnalyticsStyles.colorIndicator, {backgroundColor: Colors.black}]}></View>
						<Text style={[TextStyles.primaryButton, {color: Colors.black}, {textAlign: `left`}]} >{`België`.toUpperCase()}</Text>
					</View>
					<View style={[AnalyticsStyles.legendeItem]}>
						<View style={[AnalyticsStyles.colorIndicator, {backgroundColor: Colors.grey}]}></View>
						<Text style={[TextStyles.primaryButton, {color: Colors.black}, {textAlign: `left`}]} >{`in de buurt`.toUpperCase()}</Text>
					</View>
				</View>
			</View>
		</View>
    );
  }

  renderGoals() {
    return (
			<View style={AnalyticsStyles.greyBackground}>
				<View style={[AnalyticsStyles.graphTypeNav, AnalyticsStyles.graphTypeNavFix]}>
					<View style={[AnalyticsStyles.graphTitleIndicator]}></View>
					<TouchableOpacity><Text style={[TextStyles.title, {color: Colors.orange}]} >{`Doelen`.toUpperCase()}</Text></TouchableOpacity>
					<TouchableOpacity><Text style={[TextStyles.title, AnalyticsStyles.graphTitle]} >{`Voltooide doelen`.toUpperCase()}</Text></TouchableOpacity>
				</View>
				<View style={AnalyticsStyles.goalList}>
					<View style={AnalyticsStyles.goalListItem}>
						<View style={AnalyticsStyles.goalListItemIndex}>
							<Text style={[TextStyles.title, {color: Colors.black}, {fontSize: 35}]} >{`1`.toUpperCase()}</Text>
							<View style={AnalyticsStyles.goalListItemTodo}>
								<Text style={[TextStyles.graphBold]} >{`Gemiddelde reactiesnelheid van 0.6s`}</Text>
								<Text style={[TextStyles.grap]} >{`Huidige reactiesnelheid: 0.7s`}</Text>
							</View>
						</View>
						<Text style={[TextStyles.grap]} >{`Nog 3 maanden`}</Text>
						<TouchableOpacity>
							<View style={[ButtonStyles.secundairyButton, AnalyticsStyles.removeButton]} >
								<Image style={AnalyticsStyles.removeButtonIcon} source={require(`../assets/png/analyse/vuilbak.png`)} />
							</View>
						</TouchableOpacity>
					</View>
					<View style={AnalyticsStyles.goalListItem}>
						<View style={AnalyticsStyles.goalListItemIndex}>
							<Text style={[TextStyles.title, {color: Colors.black}, {fontSize: 35}]} >{`2`.toUpperCase()}</Text>
							<View style={AnalyticsStyles.goalListItemTodo}>
								<Text style={[TextStyles.graphBold]} >{`100km totale afstand per maand.`}</Text>
								<Text style={[TextStyles.grap]} >{`Huidige afstand per maand: 80Km`}</Text>
							</View>
						</View>
						<Text style={[TextStyles.grap]} >{`Nog 5 maanden`}</Text>
						<TouchableOpacity>
							<View style={[ButtonStyles.secundairyButton, AnalyticsStyles.removeButton]} >
								<Image style={AnalyticsStyles.removeButtonIcon} source={require(`../assets/png/analyse/vuilbak.png`)} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity>
					<LinearGradient style={[ButtonStyles.primaryButton, AnalyticsStyles.addGoals]} colors={[Colors.orange, Colors.gradientOrange]}>
						<Image style={[MyDirectionsStyle.buttonIcon]} source={require(`../assets/png/plusIconButtonWhite.png`)} />
						<Text style={[TextStyles.primaryButton]}>{`doelen opstellen`.toUpperCase()}</Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>
    );
  }

  renderExercises() {
    return (
			<View style={AnalyticsStyles.doeltref}>
				<View style={[AnalyticsStyles.graphTypeNav, AnalyticsStyles.graphTypeNavFix]}>
					<Text style={[TextStyles.title, {color: Colors.orange}]} >{`Meest doeltreffende oefeningen`.toUpperCase()}</Text>
				</View>
				<View style={[MyExercisesStyle.exercisesContainer, {marginLeft: 45}]}>
				<Animatable.View animation='fadeInUp' duration={600} style={MyDirectionsStyle.ExerciseCard}>
					<View style={MyDirectionsStyle.ExerciseCardHeader}>
						<Image style={MyDirectionsStyle.ExerciseCardSportIcon} source={require(`../assets/png/soccerIcon.png`)} />
						<Text style={[TextStyles.subTitle, MyDirectionsStyle.ExerciseCardTitle]}>{`Aanvallen op de flank`.toUpperCase()}</Text>
					</View>

					<View style={MyDirectionsStyle.ExerciseCardImageWrapper}>
						<View style={MyDirectionsStyle.ExerciseCardImage}></View>

						<View style={MyDirectionsStyle.ExerciseCardSpecsWrapper}>
							<View style={MyDirectionsStyle.ExerciseCardSpec}>
								<Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/directionIcon.png`)} />
								<Text style={TextStyles.copy}>5</Text>
							</View>

							<View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconMiddle]}>
								<Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/groupSizeIcon.png`)} />
								<Text style={TextStyles.copy}>5- 10</Text>
							</View>

							<View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconLast]}>
								<Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/intensivityIcon.png`)} />
								<Text style={TextStyles.copy}>Makkelijk</Text>
							</View>
						</View>
					</View>
				</Animatable.View>
				<Animatable.View animation='fadeInUp' duration={600} style={MyDirectionsStyle.ExerciseCard}>
					<View style={MyDirectionsStyle.ExerciseCardHeader}>
						<Image style={MyDirectionsStyle.ExerciseCardSportIcon} source={require(`../assets/png/soccerIcon.png`)} />
						<Text style={[TextStyles.subTitle, MyDirectionsStyle.ExerciseCardTitle]}>{`Aanvallen op de flank`.toUpperCase()}</Text>
					</View>

					<View style={MyDirectionsStyle.ExerciseCardImageWrapper}>
						<View style={MyDirectionsStyle.ExerciseCardImage}></View>

						<View style={MyDirectionsStyle.ExerciseCardSpecsWrapper}>
							<View style={MyDirectionsStyle.ExerciseCardSpec}>
								<Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/directionIcon.png`)} />
								<Text style={TextStyles.copy}>5</Text>
							</View>

							<View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconMiddle]}>
								<Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/groupSizeIcon.png`)} />
								<Text style={TextStyles.copy}>5- 10</Text>
							</View>

							<View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconLast]}>
								<Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/intensivityIcon.png`)} />
								<Text style={TextStyles.copy}>Makkelijk</Text>
							</View>
						</View>
					</View>

				</Animatable.View>
				<Animatable.View animation='fadeInUp' duration={600} style={MyDirectionsStyle.ExerciseCard}>
					<View style={MyDirectionsStyle.ExerciseCardHeader}>
						<Image style={MyDirectionsStyle.ExerciseCardSportIcon} source={require(`../assets/png/soccerIcon.png`)} />
						<Text style={[TextStyles.subTitle, MyDirectionsStyle.ExerciseCardTitle]}>{`Aanvallen op de flank`.toUpperCase()}</Text>
					</View>

					<View style={MyDirectionsStyle.ExerciseCardImageWrapper}>
						<View style={MyDirectionsStyle.ExerciseCardImage}>
						</View>

						<View style={MyDirectionsStyle.ExerciseCardSpecsWrapper}>
							<View style={MyDirectionsStyle.ExerciseCardSpec}>
								<Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/directionIcon.png`)} />
								<Text style={TextStyles.copy}>5</Text>
							</View>

							<View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconMiddle]}>
								<Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/groupSizeIcon.png`)} />
								<Text style={TextStyles.copy}>5- 10</Text>
							</View>

							<View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconLast]}>
								<Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/intensivityIcon.png`)} />
								<Text style={TextStyles.copy}>Makkelijk</Text>
							</View>
						</View>
					</View>

				</Animatable.View>
				</View>
			</View>
    );
  }

  render() {

    return (
			<View style={GeneralStyle.pageContainer}>
				<Navigation currentPage={this.props.name}  />

					<View >
						{this.renderSecondNav()}
						{this.renderControls()}
						<ScrollView>
						{this.renderStats()}
						{this.renderGraph()}
						{this.renderGoals()}
						{this.renderExercises()}
						</ScrollView>
					</View>
			</View>
    );
  }
}

Analytics.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string
};

export default Analytics;
