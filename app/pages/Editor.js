import React, {Component} from 'react';
import {View, Text, PanResponder, TouchableWithoutFeedback, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import {isEmpty, findIndex, remove} from 'lodash';
import {takeSnapshot} from "react-native-view-shot";
import {Actions, ActionConst} from "react-native-router-flux";
import * as Animatable from 'react-native-animatable';
import Svg, {Rect} from 'react-native-svg';
import RNFetchBlob from 'react-native-fetch-blob';
import LinearGradient from 'react-native-linear-gradient';

import {Circle, Path, Direction} from '../components';
import {EditorStyle, Colors, Dimensions, TextStyles, ButtonStyles, GeneralStyle} from '../styles';
import {DatabaseUrl, Creator} from '../globals';
import {Map} from '../utils';

class Editor extends Component {

  state = {
    connectedDirections: this.props.connectedDirections,
    directionsInEditor: 0,
    svgElements: [],
    svgTimer: 0,
    userDrawingFeedback: [],
    drawer: {
      isActive: false
    },
    optionsMenu: {
      isActive: false
    },
    brush: {
      index: 0,
      colors: [Colors.black, Colors.orange]
    },
    activeTool: 1,
    field: {
      currentIndex: 1,
      images: [`blanco`, `soccerBackground`, `basketBackground`, `tennisBackground`, `rugbyBackground`, `volleyballBackground`],
      drawer: {
        isActive: false
      }
    },

    editorDirections: [],
    currentEditorDirectionIndex: 0,

    colors: [`#FF0F00`, `#1E6DFF`, `#50E610`, `#FFD100`],
    currentRichting: undefined,

    currentPage: 0,
    currentFormTab: 0,

    sports: [],
    currentSelectedSport: 0,

    ages: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, `18 - 25`, `25 - 40`, `40 - 60`, `60+`],
    ageIndex: 5,

    playerGroups: [`1`, `2 - 5`, `5 - 10`, `onbeperkt`],
    playerGroupIndex: 0,

    focusInputValue: ``,
    nameInputValue: ``,
    descInputValue: ``,

    loader: false,
    completed: false,
    savedExercise: undefined
  };

  componentDidMount() {

    const {brushIcon, currentColor, deleteIcon, eraserIcon, fieldIcon, redoIcon, saveIcon, undoIcon} = this.refs;

    brushIcon.transition({opacity: 0}, {opacity: 1}, 300, `ease-out-quad`);
    currentColor.transition({opacity: 0}, {opacity: 1}, 300, `ease-out-quad`);
    deleteIcon.transition({opacity: 0}, {opacity: 1}, 300, `ease-out-quad`);
    eraserIcon.transition({opacity: 0}, {opacity: 1}, 300, `ease-out-quad`);
    fieldIcon.transition({opacity: 0}, {opacity: 1}, 300, `ease-out-quad`);
    redoIcon.transition({opacity: 0}, {opacity: 1}, 300, `ease-out-quad`);
    saveIcon.transition({opacity: 0}, {opacity: 1}, 300, `ease-out-quad`);
    undoIcon.transition({opacity: 0}, {opacity: 1}, 300, `ease-out-quad`);

    fetch(`${DatabaseUrl}/api/sports`)
      .then(r => {
        return r.json();
      })
      .then(({sports}) => {
        this.setState({sports});
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentWillMount() {

    this.drawHandler = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Allow movement to the view we'll attach this panresponder to
      onMoveShouldSetPanResponderCapture: () => true, //Same as above but for dragging

      onPanResponderGrant: () => { //gets invoked when we got access to the movement of the element. Perfect for initial values.
        this.points = []; //Werkt als reset
      },

      onPanResponderMove: e => {
        if (this.state.svgTimer % 2 === 0) {

          // Build array of X & Y data
          this.points.push({x: e.nativeEvent.locationX, y: e.nativeEvent.locationY});
          this.setState({userDrawingFeedback: this.points});
        }

        this.setState({svgTimer: this.state.svgTimer + 1});
      },

      onPanResponderRelease: () => { //Gets invoked when we release the view.

        const d = this.generatePathFromObject(this.points);

        const {svgElements, brush} = this.state;
        svgElements.push({
          d: d,
          stroke: brush.colors[brush.index]
        });

        this.setState({svgElements});
        this.setState({userDrawingFeedback: []});
      }
    });
  }

  addSvgCircle(e) {
    const {svgElements} = this.state;
    const {locationX: xPos, locationY: yPos} = e.nativeEvent;


    svgElements.push({
      cx: xPos,
      cy: yPos,
      r: Math.random() * 15
    });

    this.setState({svgElements});
  }

  generateSvgElements() {
    const {svgElements} = this.state;

    return (
      svgElements.map((e, index) => {
        if (e.cx) {
          return <Circle key={index} {...e} />;
        }

        if (e.d) {
          return <Path key={index} {...e}/>;
        }
      })
    );
  }

  generatePathFromObject(object) {
    let d = undefined;

    object.forEach(p => {
      if (d === undefined) {
        d = `M${Math.round(p.x)} ${Math.round(p.y)}`;
      }
      d = `${d} L${Math.round(p.x)} ${Math.round(p.y)}`;
    });

    return d;
  }

  deleteLastActionHandler() {
    const {svgElements} = this.state;

    svgElements.pop();

    this.setState({svgElements});
  }

  clearArtboardHandler() {
    this.clearArtboardSVG();
    this.clearArtboardDirections();
  }

  clearArtboardSVG() {
    this.setState({svgElements: []});
  }

  clearArtboardDirections() {
    let {editorDirections, directionsInEditor, currentEditorDirectionIndex, currentRichting} = this.state;

    editorDirections = [];
    directionsInEditor = 0;
    currentEditorDirectionIndex = 0;
    currentRichting = undefined;

    this.setState({editorDirections});
  }

  generateUserDrawingFeedback() {
    const {userDrawingFeedback, brush} = this.state;

    const d = this.generatePathFromObject(userDrawingFeedback);

    return (
      userDrawingFeedback.map((e, index) => {
        return <Path key={index} d={d} stroke={brush.colors[brush.index]} />;
      })
    );
  }

  changeBrushColor() {
    const {brush} = this.state;

    brush.index++;

    this.setState({brush});
  }

  changeColorHandler() {
    this.refs.currentColor.bounceIn(800);
    const {brush} = this.state;

    if (brush.index === brush.colors.length - 1) {
      brush.index = 0;
    } else {
      brush.index++;
    }

    this.setState({brush});
  }

  toggleObjectsDrawer() {
    const {drawer} = this.state;
    const {addEditorIcon, drawerRef} = this.refs;

    if (drawer.isActive) {
      addEditorIcon.transition({transform: [{rotate: `45deg`}]}, {transform: [{rotate: `0deg`}]}, 200, `ease-out`);
      drawerRef.transition({opacity: 1}, {opacity: 0}, 200, `ease-out`);
      setTimeout(() => {
        drawer.isActive = false;
        this.setState({drawer});
      }, 200);
      return;
    } else {
      addEditorIcon.transition({transform: [{rotate: `0deg`}]}, {transform: [{rotate: `45deg`}]}, 200, `ease-out`);
      drawer.isActive = true;
      this.setState({drawer});
      return;
    }
  }

  objectsDrawerDirectionPressHandler() {
    const {editorDirections, colors} = this.state;

    // Initial Values
    const newDirection = {
      x: Map(Dimensions.width / 2 - (100 / 2), 0, Dimensions.width, 0, 1),
      y: Map(Dimensions.height / 2 - (107 / 2), 0, Dimensions.width, 0, 1),
      delay: 0,
      combineLights: false,
      top: {
        colors: [colors[0]]
      },
      bottom: {
        colors: []
      },
      left: {
        colors: []
      },
      right: {
        colors: []
      }
    };

    editorDirections.push(newDirection);

    this.setState({editorDirections});

    this.toggleObjectsDrawer(); //Drawer wegdoen wanneer eentje aangetikt.
  }

  renderObjectsDrawer() {
    const {drawer} = this.state;

    if (!drawer.isActive) {
      return;
    }

    return (
      <Animatable.View ref='drawerRef' duration={200} animation='pulse' easing='ease-out' style={[EditorStyle.drawer]}>
        <TouchableOpacity onPress={() => this.objectsDrawerDirectionPressHandler()}>
          <Image style={[EditorStyle.directionDrawerImage]} source={{uri: `direction`}} />
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  generateField() {

    const {field} = this.state;

    const url = field.images[field.currentIndex];

    if (url === `blanco`) {
      return;
    }

    return <Animatable.Image style={[EditorStyle.field]} source={{uri: `${url}`}} />;
  }

  fieldsThumbnailHandler(index) {

    console.log(index);
    const {field} = this.state;

    field.currentIndex = index;

    this.toggleFieldDrawerHandler();

    this.setState({field});
  }

  renderFieldsDrawer() {

    const {field} = this.state;

    if (field.drawer.isActive) {
      return (
        <Animatable.View style={[EditorStyle.fieldsDrawer]} ref='fieldsDrawerRef' duration={200} animation='pulse' easing='ease-out'>
          <Text style={[TextStyles.title, EditorStyle.fieldsDrawerTitle]}>{`kies een speelveld`.toUpperCase()}</Text>
          <TouchableOpacity style={EditorStyle.closeFieldsDrawerWrapper} onPress={() => this.toggleFieldDrawerHandler()}>
            <Image style={EditorStyle.closeFieldsDrawerIcon} source={require(`../assets/png/closeIconSmallWhite.png`)} />
          </TouchableOpacity>
          <ScrollView style={[EditorStyle.fieldsDrawerScrollview]}>
              <View style={[EditorStyle.fieldsDrawerScrollviewContent]}>
                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `blancoIconWhite`}} />
                    <Text style={[TextStyles.subTitle, EditorStyle.fieldsDrawerTitlekes]}>{`blanco`.toUpperCase()}</Text>
                  </View>

                  <TouchableOpacity onPress={() => this.fieldsThumbnailHandler(0)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 0 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `blancoFieldThumbnail`}} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `soccerIconWhite`}} />
                    <Text style={[TextStyles.subTitle, EditorStyle.fieldsDrawerTitlekes]}>{`voetbal`.toUpperCase()}</Text>
                  </View>

                  <TouchableOpacity onPress={() => this.fieldsThumbnailHandler(1)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 1 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `soccerFieldThumbnail`}} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `basketballIconWhite`}} />
                    <Text style={[TextStyles.subTitle, EditorStyle.fieldsDrawerTitlekes]}>{`basket`.toUpperCase()}</Text>
                  </View>

                  <TouchableOpacity onPress={() => this.fieldsThumbnailHandler(2)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 2 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `basketFieldThumbnail`}} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `tennisIconWhite`}} />
                    <Text style={[TextStyles.subTitle, EditorStyle.fieldsDrawerTitlekes]}>{`tennis`.toUpperCase()}</Text>
                  </View>

                  <TouchableOpacity onPress={() => this.fieldsThumbnailHandler(3)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 3 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `tennisFieldThumbnail`}} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `rugbyIconWhite`}} />
                    <Text style={[TextStyles.subTitle, EditorStyle.fieldsDrawerTitlekes]}>{`rugby`.toUpperCase()}</Text>
                  </View>

                  <TouchableOpacity onPress={() => this.fieldsThumbnailHandler(4)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 4 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `rugbyFieldThumbnail`}} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `volleyballIconWhite`}} />
                    <Text style={[TextStyles.subTitle, EditorStyle.fieldsDrawerTitlekes]}>{`volleybal`.toUpperCase()}</Text>
                  </View>

                  <TouchableOpacity onPress={() => this.fieldsThumbnailHandler(5)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 5 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `volleyballFieldThumbnail`}} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
          </ScrollView>
        </Animatable.View>
      );
    }
  }

  toggleFieldDrawerHandler() {
    const {field} = this.state;
    const {fieldsDrawerRef} = this.refs;

    field.drawer.isActive = !field.drawer.isActive;

    if (!field.drawer.isActive) {
      fieldsDrawerRef.transition({opacity: 1}, {opacity: 0}, 150, `linear`);
      setTimeout(() => {
        field.drawer.isActive = false;
        this.setState({field});
      }, 200);
      return;
    }

    this.setState({field});
  }

  changePage(page) {
    const {editorContainer} = this.refs;

    editorContainer.transitionTo({transform: [{translateX: (page * Dimensions.width) * - 1}]}, 500, `ease-out-circ`);
  }

  renderLeftControls() {

    const {brush, field, activeTool} = this.state;

    if (!field.drawer.isActive) {
      return (
        <Animatable.View style={[EditorStyle.leftControls]}>
          <View style={[EditorStyle.leftUpperControls]}>

            <View style={[EditorStyle.toolIcon, {backgroundColor: activeTool === 0 ? Colors.opacityBlack : `transparent`}]}>
              <TouchableOpacity onPressOut={() => this.changeColorHandler()}>
                <Animatable.View ref='currentColor' style={[EditorStyle.colorIcon, {backgroundColor: brush.colors[brush.index]}]}>
                </Animatable.View>
              </TouchableOpacity>
            </View>

            <View style={[EditorStyle.toolIcon, {backgroundColor: activeTool === 1 ? Colors.opacityBlack : `transparent`}]}>
              <TouchableOpacity onPress={() => this.setState({activeTool: 1})} onPressOut={() => this.refs.brushIcon.bounceIn(800)}>
                <Animatable.View ref='brushIcon'>
                  <Image style={[EditorStyle.brushIcon]} source={{uri: `brushIcon`}} />
                </Animatable.View>
              </TouchableOpacity>
            </View>

            <View style={[EditorStyle.toolIcon, {backgroundColor: activeTool === 2 ? Colors.opacityBlack : `transparent`}]}>
              <TouchableOpacity onPressOut={() => this.refs.eraserIcon.bounceIn(800)} onPress={() => this.setState({activeTool: 2})}>
                <Animatable.View ref='eraserIcon'>
                  <Image style={[EditorStyle.eraserIcon]} source={{uri: `eraserIcon`}} />
                </Animatable.View>
              </TouchableOpacity>
            </View>

          </View>

          <View style={[EditorStyle.leftLowerControls]}>
            <TouchableOpacity onPress={() => this.deleteLastActionHandler()} onPressOut={() => this.refs.undoIcon.bounceIn(800)}>
              <Animatable.View ref='undoIcon'>
                <Image style={[EditorStyle.undoIcon, EditorStyle.icon]} source={{uri: `undoIcon`}} />
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity onPressOut={() => this.refs.redoIcon.bounceIn(800)}>
              <Animatable.View ref='redoIcon'>
                <Image style={[EditorStyle.redoIcon, EditorStyle.icon]} source={{uri: `redoIcon`}} />
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.changePage(1)} onPressOut={() => this.refs.saveIcon.bounceIn(800)}>
              <Animatable.View ref='saveIcon'>
                <Image style={[EditorStyle.saveIcon, EditorStyle.icon]} source={{uri: `saveIcon`}} />
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.clearArtboardHandler()} onPressOut={() => this.refs.deleteIcon.bounceIn(800)}>
              <Animatable.View ref='deleteIcon'>
                <Image style={[EditorStyle.deleteIcon, EditorStyle.icon]} source={{uri: `deleteIcon`}} />
              </Animatable.View>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      );
    }
  }

  renderRightControls() {
    const {field} = this.state;

    return (
      <View style={[EditorStyle.rightControls]}>
        <TouchableOpacity onPressOut={() => Actions.pop()}>
          <Animatable.View style={[{opacity: field.drawer.isActive ? 0 : 1}]} ref='closeIcon'>
            <Image style={[EditorStyle.closeIcon, EditorStyle.icon]} source={{uri: `closeIcon`}} />
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity style={EditorStyle.fieldIconWrapper}>
          <Animatable.View style={[EditorStyle.fieldIconWrapper, {opacity: field.drawer.isActive ? 0 : 1}]}>
            <Text style={[EditorStyle.fieldIconText]}>Speelveld</Text>
            <TouchableOpacity onPress={() => this.toggleFieldDrawerHandler()} onPressOut={() => this.refs.fieldIcon.bounceIn(800)}>
              <Animatable.Image ref='fieldIcon' style={[EditorStyle.fieldIcon, EditorStyle.icon]} source={{uri: `fieldIcon`}}/>
            </TouchableOpacity>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    );
  }

  renderAddObjectsButton() {
    const {field} = this.state;

    if (!field.drawer.isActive) {
      return (
        <TouchableOpacity onPress={() => this.toggleObjectsDrawer()}>
          <Animatable.Image ref='addEditorIcon' style={EditorStyle.addEditorIcon} source={{uri: `addEditorIcon`}} />
        </TouchableOpacity>
      );
    }
  }

  changeDirectionPositionHandler(x, y, directionIndex) {
    const {editorDirections} = this.state;

    // Begin min, max & eind min, max
    editorDirections[directionIndex].x = Map(x, 0, Dimensions.width, 0, 1);
    editorDirections[directionIndex].y = Map(y, 0, Dimensions.height, 0, 1);

    this.setState({editorDirections});
  }

  toggleOptionsMenuHandler() {
    const {optionsMenu} = this.state;
    const {optionsMenuRef} = this.refs;

    optionsMenu.isActive = !optionsMenu.isActive;

    if (!optionsMenu.isActive) {
      optionsMenuRef.transitionTo({transform: [{translateX: Dimensions.width}]}, 1000, `ease-in`);
      setTimeout(() => {
        this.setState({optionsMenu});
      }, 1000);
      return;
    } else {
      this.setState({optionsMenu});
    }
  }

  setCurrentEditorDirectionIndex(directionIndex) {
    let {currentEditorDirectionIndex, currentRichting} = this.state;

    if (currentEditorDirectionIndex === directionIndex) {
      this.toggleOptionsMenuHandler();
    }

    currentEditorDirectionIndex = directionIndex;
    currentRichting = undefined;

    this.setState({currentEditorDirectionIndex, currentRichting});
  }

  directionIsMovingHandler(directionIndex) {
    // directionIndex om te weten welke er wordt verschoven.
  }

  renderEditorDirections() {
    const {editorDirections, currentEditorDirectionIndex, optionsMenu} = this.state;

    return (
      editorDirections.map((e, index) => {

        const isSelected = currentEditorDirectionIndex === index && optionsMenu.isActive;

        return <Direction key={index} directionIndex={index} isSelected={isSelected} {...e}
          changeDirectionPositionHandler={(x, y, directionIndex) => this.changeDirectionPositionHandler(x, y, directionIndex)}
          setCurrentEditorDirectionIndex={directionIndex => this.setCurrentEditorDirectionIndex(directionIndex)}
          directionIsMovingHandler={directionIndex => this.directionIsMovingHandler(directionIndex)}
        />;
      })
    );
  }

  changeDirectionColorHandler(directionIndex, colorIndex) {
    const {editorDirections} = this.state;

    editorDirections[directionIndex].colors[colorIndex].isActive = !editorDirections[directionIndex].colors[colorIndex].isActive;

    this.setState({editorDirections});
  }

  selectDirection(richting) {
    let {currentRichting} = this.state;

    currentRichting = richting;

    this.setState({currentRichting});
  }

  renderDirectionArrows() {

    const {currentRichting, editorDirections, currentEditorDirectionIndex} = this.state;

    return (

      <View style={EditorStyle.directionArrowsWrapper}>
        <TouchableOpacity style={[EditorStyle.directionArrow, {backgroundColor: currentRichting === `top` ? Colors.orange : Colors.lightGrey, borderColor: !isEmpty(editorDirections[currentEditorDirectionIndex].top.colors) ? Colors.orange : `transparent`}]} onPress={() => this.selectDirection(`top`)} >
          <Image style={[EditorStyle.directionArrowIcon, EditorStyle.directionArrowIconUp]} source={{uri: !isEmpty(editorDirections[currentEditorDirectionIndex].top.colors) && currentRichting !== `top` ? `arrowOrangeRotated` : `arrowWhite`}} />
        </TouchableOpacity>

        <View style={EditorStyle.directionArrowMiddle}>
          <TouchableOpacity style={[EditorStyle.directionArrow, {backgroundColor: currentRichting === `left` ? Colors.orange : Colors.lightGrey, borderColor: !isEmpty(editorDirections[currentEditorDirectionIndex].left.colors) ? Colors.orange : `transparent`}]} onPress={() => this.selectDirection(`left`)} >
            <Image style={[EditorStyle.directionArrowIcon, EditorStyle.directionArrowIconLeft]} source={{uri: !isEmpty(editorDirections[currentEditorDirectionIndex].left.colors) && currentRichting !== `left` ? `arrowOrangeRotated` : `arrowWhite`}} />
          </TouchableOpacity>

          <TouchableOpacity style={[EditorStyle.directionArrow, {backgroundColor: currentRichting === `right` ? Colors.orange : Colors.lightGrey, borderColor: !isEmpty(editorDirections[currentEditorDirectionIndex].right.colors) ? Colors.orange : `transparent`}]} onPress={() => this.selectDirection(`right`)} >
            <Image style={[EditorStyle.directionArrowIcon, EditorStyle.directionArrowIconRight]} source={{uri: !isEmpty(editorDirections[currentEditorDirectionIndex].right.colors) && currentRichting !== `right` ? `arrowOrangeRotated` : `arrowWhite`}} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[EditorStyle.directionArrow, {backgroundColor: currentRichting === `bottom` ? Colors.orange : Colors.lightGrey, borderColor: !isEmpty(editorDirections[currentEditorDirectionIndex].bottom.colors) ? Colors.orange : `transparent`}]} onPress={() => this.selectDirection(`bottom`)} >
          <Image style={[EditorStyle.directionArrowIcon, EditorStyle.directionArrowIconDown]} source={{uri: !isEmpty(editorDirections[currentEditorDirectionIndex].bottom.colors) && currentRichting !== `bottom` ? `arrowOrangeRotated` : `arrowWhite`}} />
        </TouchableOpacity>
      </View>
    );
  }

  setColorForDirection(colorIndex) {

    const {colors, currentRichting, editorDirections, currentEditorDirectionIndex} = this.state;

    const currentDirection = editorDirections[currentEditorDirectionIndex];
    let currentDirectionColors = [];

    if (!isEmpty(currentDirection[`${currentRichting}`])) { //Wanneer er wel al kleuren zijn
      currentDirectionColors = currentDirection[`${currentRichting}`].colors;

      const indexOfElement = findIndex(currentDirectionColors, c => { //Zit hij al in de array
        return c === colors[colorIndex];
      });
      if (indexOfElement === - 1) { //Zoniet -> toevoegen
        currentDirection[`${currentRichting}`].colors.push(colors[colorIndex]);
        this.setState({editorDirections});
      } else { //Zoniet -> verwijderen
        currentDirection[`${currentRichting}`].colors = remove(currentDirection[`${currentRichting}`].colors, c => {
          return c !== colors[colorIndex];
        });
        this.setState({editorDirections});
      }
    }
  }

  renderDirectionColors() {

    const {colors, currentRichting, editorDirections, currentEditorDirectionIndex} = this.state;

    const currentDirection = editorDirections[currentEditorDirectionIndex];
    let currentDirectionColors = [];
    if (!isEmpty(currentDirection[`${currentRichting}`])) {
      currentDirectionColors = currentDirection[`${currentRichting}`].colors;
    }

    return (
      <View style={EditorStyle.directionColorsWrapper}>
        {
          colors.map((c, i) => {

            let isSelectedColor = false;

            if (!isEmpty(currentDirectionColors)) {
              currentDirectionColors.forEach(c => {
                if (c === colors[i]) {
                  isSelectedColor = true;
                }
              });
            }

            return (
              <TouchableOpacity onPress={() => this.setColorForDirection(i)} key={i}>
                <View style={[EditorStyle.directionColor, {backgroundColor: colors[i], opacity: isSelectedColor ? 1 : .2}]}></View>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }

  setCombineLights(combineLights) {
    const {editorDirections, currentEditorDirectionIndex} = this.state;

    if (editorDirections[currentEditorDirectionIndex].combineLights === combineLights) return;
    editorDirections[currentEditorDirectionIndex].combineLights = !editorDirections[currentEditorDirectionIndex].combineLights;

    this.setState({editorDirections});
  }

  setDelaySetting(amount) {
    const {editorDirections, currentEditorDirectionIndex} = this.state;

    if (editorDirections[currentEditorDirectionIndex].delay + amount < 0 || editorDirections[currentEditorDirectionIndex].delay + amount > 10) {
      return;
    }

    editorDirections[currentEditorDirectionIndex].delay += amount;

    this.setState({editorDirections});
  }

  deleteDirectionHandler(directionIndex = this.state.currentEditorDirectionIndex) {
    // let {editorDirections} = this.state;
    //
    // editorDirections = editorDirections.map((e, index) => {
    //   if (!index === directionIndex) {
    //     return e;
    //   }
    // });
    //
    // editorDirections = compact(editorDirections);
    //
    // this.setState({editorDirections});
  }

  renderOptionsMenu() {
    const {optionsMenu, editorDirections, currentEditorDirectionIndex} = this.state;

    if (optionsMenu.isActive) {
      if (!isEmpty(editorDirections[currentEditorDirectionIndex])) {
        return (
          <Animatable.View ref='optionsMenuRef' animation='fadeInRightBig' duration={300} easing='ease-out-circ' style={EditorStyle.optionsMenu}>
            <View style={EditorStyle.optionsMenuDirectionUpper}>

              <View style={[EditorStyle.optionsHeader]}>
                <Text style={[TextStyles.title, EditorStyle.optionsMainHeaderTitle]}>{`direction ${currentEditorDirectionIndex + 1}`.toUpperCase()}</Text>
                <Image style={[EditorStyle.optionsHeaderCloseIcon]} source={require(`../assets/png/closeIconSmallWhite.png`)} />
              </View>

              <View style={[EditorStyle.optionsMenuRichting]}>
                <Text style={[TextStyles.subTitle, EditorStyle.optionsMenusubTitle]}>{`richtingen`.toUpperCase()}</Text>
                {this.renderDirectionArrows()}
              </View>

              <View style={[EditorStyle.optionsMenuRichting]}>
                <Text style={[TextStyles.subTitle, EditorStyle.optionsMenusubTitle]}>{`kleuren`.toUpperCase()}</Text>
                {this.renderDirectionColors()}
              </View>
            </View>

            <View style={EditorStyle.optionsMenuDirectionLower}>

              <View style={[EditorStyle.optionsMenuRichting]}>
                <Text style={[TextStyles.subTitle, EditorStyle.optionsMenusubTitle]}>{`delay`.toUpperCase()}</Text>
                <View style={[EditorStyle.delayButtons]}>
                  <TouchableOpacity onPress={() => this.setDelaySetting(- 1)} style={[EditorStyle.delayButton]}>
                    <Image style={[EditorStyle.delayMinusIcon]} source={require(`../assets/png/minusIconBlack.png`)} />
                  </TouchableOpacity>

                  <Text style={[TextStyles.copy, EditorStyle.delayCopy]}>{`${editorDirections[currentEditorDirectionIndex].delay}s`.toUpperCase()}</Text>

                  <TouchableOpacity onPress={() => this.setDelaySetting(1)} style={[EditorStyle.delayButton]}>
                    <Image style={[EditorStyle.delayPlusIcon]} source={require(`../assets/png/plusIconBlack.png`)} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[EditorStyle.optionsMenuRichting, EditorStyle.oplichtenWrapperContent]}>
                <Text style={[TextStyles.subTitle, EditorStyle.optionsMenusubTitle]}>{`oplichten`.toUpperCase()}</Text>
                <View style={[EditorStyle.oplichtenWrapper]}>
                  <TouchableOpacity onPress={() => this.setCombineLights(false)} style={[EditorStyle.oplichtenButton, {backgroundColor: !editorDirections[currentEditorDirectionIndex].combineLights ? Colors.black : `transparent`, borderColor: !editorDirections[currentEditorDirectionIndex].combineLights ? `transparent` : Colors.black}]}>
                    <Text style={[TextStyles.copy, {color: !editorDirections[currentEditorDirectionIndex].combineLights ? Colors.pureWhite : Colors.black}]}>willekeurig</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.setCombineLights(true)} style={[EditorStyle.oplichtenButton, {backgroundColor: editorDirections[currentEditorDirectionIndex].combineLights ? Colors.black : `transparent`, borderColor: editorDirections[currentEditorDirectionIndex].combineLights ? `transparent` : Colors.black}]}>
                    <Text style={[TextStyles.copy, {color: editorDirections[currentEditorDirectionIndex].combineLights ? Colors.pureWhite : Colors.black}]}>samen</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={EditorStyle.deleteIconWrapper} onPress={() => this.deleteDirectionHandler()}>
                <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
                  <Image style={[EditorStyle.deleteOptionsIcon]} source={require(`../assets/png/deleteIconWhite.png`)} />
                  <Text style={[TextStyles.primaryButton]}>{`Direction verwijderen`.toUpperCase()}</Text>
                </LinearGradient>
              </TouchableOpacity>

            </View>
          </Animatable.View>
        );
      }
    }
  }

  initialAnimation() {
    const {buttonWrapper, secundairyButton} = this.refs;

    buttonWrapper.transitionTo({width: 400}, 500, `ease-out-circ`);

    secundairyButton.transition({opacity: 0}, {opacity: 1}, 500, `ease-out-circ`);
  }

  backToInitial() {
    if (this.state.currentFormTab === 1) {

      const {buttonWrapper, secundairyButton} = this.refs;

      buttonWrapper.transitionTo({width: 180}, 500, `ease-out-circ`);
      secundairyButton.transition({opacity: 1}, {opacity: 0}, 500, `ease-out-circ`);
    }
  }

  toTab(tab) {
    let {currentFormTab} = this.state;
    const {formContent, buttonWrapper, formHeader, headerImage} = this.refs;

    currentFormTab += tab;

    const translateBaby = currentFormTab * Dimensions.width;

    formContent.transitionTo({transform: [{translateX: - translateBaby}]}, 500, `ease-out-circ`);

    setTimeout(() => {
      this.setState({currentFormTab});
    }, 500);

    if (currentFormTab === 3) {
      // setTimeout(() => {
      //   celebrationButtonWrapper.transitionTo({top: 30}, 300, `ease-out-circ`);
      // }, 400);

      buttonWrapper.transitionTo({transform: [{translateY: Dimensions.height}]}, 300, `ease-in-circ`);
      formHeader.transitionTo({transform: [{translateY: - 160}]}, 300, `ease-in-circ`);
      headerImage.transitionTo({transform: [{translateY: - 230}]}, 300, `ease-in-circ`);

      this.saveExercise();
    }
  }

  async saveExercise() {


    this.setState({loader: true});

    const {
      focusInputValue, descInputValue, nameInputValue,
      currentSelectedSport, ages, ageIndex, playerGroups, playerGroupIndex, sports
    } = this.state;

    const data = {
      name: nameInputValue,
      desc: descInputValue,
      creator: Creator,
      targetAge: ages[ageIndex],
      intensity: 0,
      sport: sports[currentSelectedSport]._id,
      focus: focusInputValue,
      groupSize: playerGroups[playerGroupIndex]
    };

    const image = await this.screenshotHandler(`field`);
    const imageWithDirections = await this.screenshotHandler(`fieldAndDirections`);

    RNFetchBlob.fetch(`POST`, `${DatabaseUrl}/api/exercises`, {
      'Content-Type': `multipart/form-data`,
    },
      [
        {name: `name`, data: data.name},
        {name: `desc`, data: data.desc},
        {name: `creator`, data: data.creator},
        {name: `targetAge`, data: data.targetAge},
        {name: `intensity`, data: data.intensity},
        {name: `sport`, data: data.sport},
        {name: `groupSize`, data: data.groupSize},
        {name: `focus`, data: data.focus},
        {name: `image`, filename: `${Math.random().toString(36).substr(2, 12)}.png`, type: `image/png`, data: RNFetchBlob.wrap(image)},
        {name: `imageWithDirections`, filename: `${Math.random().toString(36).substr(4, 14)}.png`, type: `image/png`, data: RNFetchBlob.wrap(imageWithDirections)}
      ])
        .then(({data}) => {
          return JSON.parse(data);
        })
        .then(({exercise}) => {

          this.setState({savedExercise: exercise._id});

          this.saveDirections(exercise);
        })
        .catch(e => {
          console.log(e);
        });
  }

  saveDirections(exercise) {

    const {editorDirections} = this.state;

    const promises = editorDirections.map(e => {
      return fetch(`${DatabaseUrl}/api/directions`, {
        method: `POST`,
        headers: {Accept: `application/json`, 'Content-Type': `application/json`},
        body: JSON.stringify({
          x: e.x,
          y: e.y,
          exercise: exercise._id,
          delay: e.delay,
          combineLights: e.combineLights,
          directions: {
            top: e.top,
            bottom: e.bottom,
            left: e.left,
            right: e.right
          }
        })
      });
    });

    Promise.all(promises)
      .then(d => {
        return d[0].json();
      })
      .then(() => {
        this.setState({loader: false});
        this.setState({completed: true});
      })
      .catch(e => {
        console.log(e);
      });
  }

  screenshotHandler(element) {

    return new Promise(resolve => {

      const target = this.refs[`${element}`];

      takeSnapshot(target, {
        format: `png`,
        quality: 1,
        result: `file`,
      })
      .then(r => {
        resolve(r);
      })
      .catch(e => {
        console.log(e);
      });
    });
  }

  renderSports() {
    const {sports, currentSelectedSport} = this.state;

    if (!isEmpty(sports)) {
      return sports.map((s, index) => {

        return (
          <TouchableOpacity style={[EditorStyle.sportFormItem, {borderColor: currentSelectedSport === index ? Colors.orange : `transparent`}]} onPress={() => this.setState({currentSelectedSport: index})} key={index}>
            <Image style={[EditorStyle.sportFormItemImage]} source={{uri: `${s.imageName}`}} />
            <Text style={[TextStyles.subTitle, EditorStyle.sportFormItemText]}>{`${s.name}`.toUpperCase()}</Text>
          </TouchableOpacity>
        );
      });
    }

  }

  changeAge(index) {
    let {ageIndex} = this.state;
    const {ages} = this.state;

    if (ageIndex + index < 0 || ageIndex + index > (ages.length - 1)) {
      return;
    }

    ageIndex += index;

    this.setState({ageIndex});
  }

  changeAmount(index) {
    let {playerGroupIndex} = this.state;
    const {playerGroups} = this.state;

    if (playerGroupIndex + index < 0 || playerGroupIndex + index > (playerGroups.length - 1)) {
      return;
    }

    playerGroupIndex += index;

    this.setState({playerGroupIndex});
  }

  renderPrimaryButtonText() {
    const {currentFormTab} = this.state;
    const {primaryButton} = this.refs;

    let copy = undefined;

    if (currentFormTab === 0) {
      copy = `sport bepalen`;
    }

    if (currentFormTab === 1) {
      copy = `doelgroep bepalen`;
    }

    if (currentFormTab === 2) {
      copy = `oefening bewaren`;

      setTimeout(() => {
        if (!isEmpty(primaryButton)) {
          primaryButton.transition({opacity: 0}, {opacity: 1}, 300, `ease-in-out`);
        }
      }, 0);
    }


    return (
      <Animatable.Text ref='primaryButton' style={[TextStyles.primaryButton, EditorStyle.primaryFormButton]}>{`${copy}`.toUpperCase()}</Animatable.Text>
    );
  }

  renderSecundairyButtonText() {
    const {currentFormTab} = this.state;

    let copy = undefined;

    if (currentFormTab === 0) {
      copy = `naam aanpassen`;
    }

    if (currentFormTab === 1) {
      copy = `naam aanpassen`;
    }

    if (currentFormTab === 2) {
      copy = `sport aanpassen`;
    }

    return (
      <Animatable.Text style={[TextStyles.secundairyButton, EditorStyle.formSecundButtonText]}>{`${copy}`.toUpperCase()}</Animatable.Text>
    );
  }

  renderFormButtons() {
    return (
      <Animatable.View ref='buttonWrapper' style={EditorStyle.buttonsWrapper}>

        <Animatable.View ref='secundairyButton' style={EditorStyle.secundairyButtonInFormWrapper}>
          <TouchableOpacity onPress={() => this.backToInitial()} onPressOut={() => this.toTab(- 1)}>
            <View style={[ButtonStyles.secundairyButton, EditorStyle.formSecundButton]}>
              <Image style={[EditorStyle.secundairyButtonInForm]} source={require(`../assets/png/backArrowOrange.png`)} />
              {this.renderSecundairyButtonText()}
            </View>
          </TouchableOpacity>
        </Animatable.View>


        <Animatable.View style={EditorStyle.primaryButtonInForm}>
          <TouchableOpacity onPress={() => this.initialAnimation()} onPressOut={() => this.toTab(1)}>
            <LinearGradient style={[ButtonStyles.primaryButton, EditorStyle.formButtonPrimaryWrapper]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
              {this.renderPrimaryButtonText()}
              <Image style={[EditorStyle.primaryButtonFormImage]} source={require(`../assets/png/arrowButtonWhite.png`)} />
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    );
  }

  renderCelebrationButton() {

    const {completed} = this.state;

    if (completed) {
      return (
        <Animatable.View animation='fadeInUp' duration={300} easing='ease-out' ref='celebrationButtonWrapper' style={[EditorStyle.primaryButtonInForm, EditorStyle.celebrationButtonWrapper]}>
          <TouchableOpacity style={EditorStyle.celebButton}>
            <View style={[ButtonStyles.secundairyButton]}>
              <Image style={[EditorStyle.shareIcon]} source={require(`../assets/png/shareIconOrange.png`)} />
              <Text style={[TextStyles.secundairyButton]}>{`oefening delen`.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={EditorStyle.celebButton} onPress={() => this.goToDetail()}>
            <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]} start={{x: 0.0, y: 1}} end={{x: 1, y: 0}}>
              <Animatable.Text style={[TextStyles.primaryButton]}>{`Oefening bekijken`.toUpperCase()}</Animatable.Text>
              <Image style={[EditorStyle.primaryButtonFormImage]} source={require(`../assets/png/arrowButtonWhite.png`)} />
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      );
    }
  }

  goToDetail() {
    Actions.exerciseDetail({type: ActionConst.REPLACE, exerciseId: this.state.savedExercise, origin: `editor`});
  }

  loader() {

    const {loader} = this.state;

    return (
      <ActivityIndicator style={[GeneralStyle.loader]} animating={loader} color={Colors.black}  />
    );
  }

  renderCelebration() {

    const {completed} = this.state;

    if (completed) {
      return (
        <Animatable.View style={EditorStyle.celebrationImageWrapper} animation='bounceInUp'>
          <Text style={[TextStyles.bam, EditorStyle.celebrationTitle]}>{`Succes`.toUpperCase()}</Text>
          <Image style={EditorStyle.celebrationImage} source={require(`../assets/png/beker.png`)}  />
          <Text style={[TextStyles.subTitle, EditorStyle.celebrationText]}>{`Jouw oefening is succesvol bewaard.`.toUpperCase()}</Text>
        </Animatable.View>
      );
    }
  }

  render() {

    const {
      currentPage, ages, ageIndex, playerGroups, playerGroupIndex,
      focusInputValue, nameInputValue, descInputValue
    } = this.state;

    return (
      <Animatable.View ref='editorContainer' style={{transform: [{translateX: currentPage * Dimensions.width}], flexDirection: `row`}}>

        <View style={[EditorStyle.editorContainer]}>
          <View style={{position: `absolute`}} ref='fieldAndDirections'>

            <View ref='field'>
              <Svg style={[{zIndex: 1}]} {...this.drawHandler.panHandlers} width={Dimensions.width} height={Dimensions.height}>
                <Rect x='0' y='0' width='100%' height='100%' fill='transparent' />
                {this.generateUserDrawingFeedback()}
                {this.generateSvgElements()}
              </Svg>
              {this.generateField()}
            </View>

            {this.renderEditorDirections()}

          </View>
          {this.renderLeftControls()}


          {this.renderRightControls()}

          {this.renderAddObjectsButton()}

          {this.renderObjectsDrawer()}

          {this.renderFieldsDrawer()}

          {this.renderOptionsMenu()}
        </View>

        <View style={EditorStyle.form}>

          {this.loader()}

          {this.renderCelebration()}

          <Animatable.View ref='formHeader' style={EditorStyle.formHeader}>
            <View style={EditorStyle.formTitleWrapper}>
              <Text style={[TextStyles.mainTitle, EditorStyle.formTitle]}>{`Schema Bewaren`.toUpperCase()}</Text>
              <Text style={[TextStyles.copy, EditorStyle.formTitleCopy]}>Geef je oefening een naam zodat je deze later makkelijk kan terugvinden</Text>
            </View>
            <View style={EditorStyle.pageIndicatorWrapper}>
              <View style={[EditorStyle.pageIndicator, {opacity: this.state.currentFormTab === 0 ? 1 : 0.2}]}></View>
              <View style={[EditorStyle.pageIndicator, {opacity: this.state.currentFormTab === 1 ? 1 : 0.2}]}></View>
              <View style={[EditorStyle.pageIndicator, {opacity: this.state.currentFormTab === 2 ? 1 : 0.2}]}></View>
            </View>

            <TouchableOpacity style={EditorStyle.formCloseIconWrapper}>
              <Image style={EditorStyle.formCloseIcon} source={require(`../assets/png/closeIconSmallWhite.png`)} />
            </TouchableOpacity>

            <TouchableOpacity style={EditorStyle.formBackWrapper} onPress={() => this.changePage(0)}>
              <Image style={EditorStyle.formBackIcon} source={require(`../assets/png/backArrowOrange.png`)} />
              <Text style={[TextStyles.subTitle, EditorStyle.formBackText]}>{`Terug naar editor`.toUpperCase()}</Text>
            </TouchableOpacity>
          </Animatable.View>

          <View style={{overflow: `hidden`}}>
            <Animatable.View ref='formContent' style={[EditorStyle.formContentWrapper]}>

              <View style={EditorStyle.formPageOneContent}>
                <View style={EditorStyle.naamWrapper}>
                  <View style={EditorStyle.naamLabelWrapper}>
                    <Image style={EditorStyle.naamInputIcon} source={require(`../assets/png/exerciseIconBlack.png`)} />
                    <Text style={[TextStyles.subTitle]}>{`Naam van je oefening`.toUpperCase()}</Text>
                  </View>
                  <View style={[EditorStyle.naamInputWrapper]}>
                    <TextInput onChangeText={text => this.setState({nameInputValue: text})} value={nameInputValue} style={[TextStyles.copy, EditorStyle.naamInput]} placeholder='Tiki Taka Tikspel' />
                  </View>
                </View>

                <View style={[EditorStyle.naamWrapper, EditorStyle.descWrapper]}>
                  <View style={EditorStyle.naamLabelWrapper}>
                    <Image style={EditorStyle.descInputIcon} source={require(`../assets/png/brushIcon.png`)} />
                    <Text style={[TextStyles.subTitle]}>{`Beschrijf je oefening`.toUpperCase()}</Text>
                  </View>
                  <View style={[EditorStyle.naamInputWrapper, EditorStyle.descInputWrapper]}>
                    <TextInput onChangeText={text => this.setState({descInputValue: text})} value={descInputValue} multiline={true} style={[TextStyles.copy, EditorStyle.descInput]} placeholder='Deze oefening probeert de reactiesnelheid van de spelers te verbeteren' />
                  </View>
                </View>
              </View>

              <View style={EditorStyle.formPageOneContent}>

                <View style={[EditorStyle.naamWrapper, EditorStyle.sportsWrapper]}>
                  <View style={[EditorStyle.naamLabelWrapper, EditorStyle.sportsTitleWrapper]}>
                    <Image style={EditorStyle.sportsIconWrapper} source={require(`../assets/png/shoeIconBlack.png`)} />
                    <Text style={[TextStyles.subTitle]}>{`Voor welke sport is je oefening geschikt?`.toUpperCase()}</Text>
                  </View>
                  <ScrollView style={[EditorStyle.sportsScroller]} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={[EditorStyle.sportsInputWrapper]}>
                      {this.renderSports()}
                    </View>
                  </ScrollView>

                </View>

                <View style={EditorStyle.formPageTwoInputs}>
                  <View>
                    <View style={EditorStyle.naamLabelWrapper}>
                      <Image style={EditorStyle.focusFormIcon} source={require(`../assets/png/focusIconBlack.png`)} />
                      <Text style={[TextStyles.subTitle]}>{`Wat is de focus van de oefening?`.toUpperCase()}</Text>
                    </View>
                    <View style={[EditorStyle.naamInputWrapper]}>
                      <TextInput onChangeText={text => this.setState({focusInputValue: text})} value={focusInputValue} ref='focusInput' style={[TextStyles.copy, EditorStyle.naamInput]} placeholder='Reactiesnelheid' />
                    </View>
                  </View>

                  <View>
                    <View style={EditorStyle.naamLabelWrapper}>
                      <Image style={EditorStyle.formIntensivityIcon} source={require(`../assets/png/intensivityIcon.png`)} />
                      <Text style={[TextStyles.subTitle]}>{`hoe moeilijk schat je de oefening?`.toUpperCase()}</Text>
                    </View>
                    <View style={[EditorStyle.naamInputWrapper, EditorStyle.fakeSelect]}>
                      <Text style={[TextStyles.copy, EditorStyle.intensivityCopy]}>Makkelijk</Text>
                      <Image style={[EditorStyle.fakeSelectIcon]} source={require(`../assets/png/dropDownArrow.png`)} />
                    </View>
                  </View>
                </View>
              </View>

              <View style={[EditorStyle.formPageOneContent, EditorStyle.formPageThreeContent]}>
                <View style={EditorStyle.sideFormWrapper}>
                  <View style={EditorStyle.naamLabelWrapper}>
                    <Image style={EditorStyle.groupSizeIconForm} source={require(`../assets/png/groupSizeIcon.png`)} />
                    <Text style={[TextStyles.subTitle]}>{`Aantal spelers`.toUpperCase()}</Text>
                  </View>
                  <View style={[EditorStyle.playerAmountWrapper]}>

                    <TouchableOpacity style={EditorStyle.iconFormIconsAmount} onPress={() => this.changeAmount(- 1)}>
                      <Image style={EditorStyle.minusIconForm} source={require(`../assets/png/minusIconBlack.png`)} />
                    </TouchableOpacity>

                    <Text style={[TextStyles.copy, EditorStyle.playerFormAmountText]}>{`${playerGroups[playerGroupIndex]}`}</Text>

                    <TouchableOpacity style={EditorStyle.iconFormIconsAmount} onPress={() => this.changeAmount(1)}>
                      <Image style={EditorStyle.plusIconForm} source={require(`../assets/png/plusIconBlack.png`)} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[EditorStyle.sideFormWrapper, EditorStyle.descWrapper]}>
                  <View style={EditorStyle.naamLabelWrapper}>
                    <Image style={EditorStyle.birthdayIcon} source={require(`../assets/png/birthdayIconBlack.png`)} />
                    <Text style={[TextStyles.subTitle]}>{`Leeftijdscategorie`.toUpperCase()}</Text>
                  </View>

                  <View style={[EditorStyle.playerAmountWrapper]}>
                    <TouchableOpacity style={EditorStyle.iconFormIconsAmount} onPress={() => this.changeAge(- 1)}>
                      <Image style={EditorStyle.minusIconForm} source={require(`../assets/png/minusIconBlack.png`)} />
                    </TouchableOpacity>

                    <Text style={[TextStyles.copy, EditorStyle.playerFormAmountText]}>{`${ages[ageIndex]}j`}</Text>

                    <TouchableOpacity style={EditorStyle.iconFormIconsAmount} onPress={() => this.changeAge(1)}>
                      <Image style={EditorStyle.plusIconForm} source={require(`../assets/png/plusIconBlack.png`)} />
                    </TouchableOpacity>
                  </View>

                </View>
              </View>

            </Animatable.View>
          </View>



          <View style={[EditorStyle.barBottomWrapper]}>

              {this.renderFormButtons()}

              {this.renderCelebrationButton()}

          </View>

          <Animatable.Image ref='headerImage' style={EditorStyle.formHeaderImage} source={require(`../assets/png/editorHeaderBlack.png`)} />
        </View>
      </Animatable.View>
    );
  }
}

Editor.propTypes = {
  connectedDirections: React.PropTypes.array
};

export default Editor;
