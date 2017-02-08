import React, {Component} from 'react';
import {View, Text, PanResponder, TouchableWithoutFeedback, Image, ScrollView, TouchableOpacity} from 'react-native';
import {indexOf, isEmpty, findIndex, remove} from 'lodash';
import {takeSnapshot} from "react-native-view-shot";
import {Actions} from "react-native-router-flux";
import * as Animatable from 'react-native-animatable';
import Svg, {Rect} from 'react-native-svg';

import {Circle, Path, Direction} from '../components';
import {EditorStyle, Colors, Dimensions, TextStyles} from '../styles';
import {DatabaseUrl} from '../globals';
import {Map} from '../utils';

class Editor extends Component {

  state = {
    connectedDirections: this.props.connectedDirections,
    directionsInEditor: 0,
    svgElements: [],
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
    field: {
      currentIndex: 0,
      images: [`blanco`, `soccer`, `basket`, `tennis`, `rugby`, `volleyball`],
      drawer: {
        isActive: false
      }
    },
    editorDirections: [],
    globalEditorSettings: {
      delay: 0,
      combination: false
    },
    currentEditorDirectionIndex: 0,
    colors: [`green`, `blue`, `yellow`, `red`],
    currentRichting: undefined
  };

  componentDidMount() {
    console.log(this.refs);

    // const {brushIcon, currentColor, deleteIcon, eraserIcon, fieldIcon, redoIcon, saveIcon, undoIcon} = this.refs;
    //
    // brushIcon.transition({opacity: 0}, {opacity: 1}, 450, 300, `ease-out-quad`);
    // currentColor.transition({opacity: 0}, {opacity: 1}, 450, 300, `ease-out-quad`);
    // deleteIcon.transition({opacity: 0}, {opacity: 1}, 450, 300, `ease-out-quad`);
    // eraserIcon.transition({opacity: 0}, {opacity: 1}, 450, 300, `ease-out-quad`);
    // fieldIcon.transition({opacity: 0}, {opacity: 1}, 450, 300, `ease-out-quad`);
    // redoIcon.transition({opacity: 0}, {opacity: 1}, 450, 300, `ease-out-quad`);
    // saveIcon.transition({opacity: 0}, {opacity: 1}, 450, 300, `ease-out-quad`);
    // undoIcon.transition({opacity: 0}, {opacity: 1}, 450, 300, `ease-out-quad`);
  }

  componentWillMount() {
    this.drawHandler = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Allow movement to the view we'll attach this panresponder to
      onMoveShouldSetPanResponderCapture: () => true, //Same as above but for dragging

      onPanResponderGrant: () => { //gets invoked when we got access to the movement of the element. Perfect for initial values.
        this.points = []; //Werkt als reset
      },

      onPanResponderMove: e => {
        // this.addSvgElement(e);

        // Build array of X & Y data
        this.points.push({x: e.nativeEvent.locationX, y: e.nativeEvent.locationY});
        this.setState({userDrawingFeedback: this.points});
      },

      onPanResponderRelease: () => { //Gets invoked when we release the view.
        console.log(`stop met tekenen`);

        const d = this.generatePathFromObject(this.points);

        const {svgElements, brush} = this.state;
        svgElements.push({
          d: d,
          stroke: brush.colors[brush.index]
        });
        console.log(svgElements);
        this.setState({svgElements});
        this.setState({userDrawingFeedback: []});
      }
    });
  }

  screenshotHandler() {

    const artboard = this.refs[`artboard`];

    takeSnapshot(artboard, {
      format: `png`,
      quality: 1,
      result: `file`,
    })
    .then(r => {
      console.log(r);
    })
    .catch(e => {
      console.log(e);
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

  deleteAllActionsHandler() {
    this.setState({svgElements: []});
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

  pressInColorHandler() {
    this.refs.currentColor.pulse(600);
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

  directionDrawerImagePressHandler() {
    const {editorDirections} = this.state;

    // Initial Values
    const newDirection = {
      x: Map(Dimensions.width / 2 - (100 / 2), 0, Dimensions.width, 0, 1),
      y: Map(Dimensions.height / 2 - (107 / 2), 0, Dimensions.width, 0, 1),
      top: {
        colors: [`blue`, `green`]
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
  }

  renderObjectsDrawer() {
    const {drawer} = this.state;

    if (!drawer.isActive) {
      return;
    }

    return (
      <Animatable.View ref='drawerRef' duration={200} animation='pulse' easing='ease-out' style={[EditorStyle.drawer]}>
        <TouchableWithoutFeedback onPress={() => this.directionDrawerImagePressHandler()}>
          <Image style={[EditorStyle.directionDrawerImage]} source={{uri: `direction`}} />
        </TouchableWithoutFeedback>
      </Animatable.View>
    );
  }

  generateField() {

    const {field} = this.state;

    let url = field.images[field.currentIndex];

    if (url === `soccer`) {
      url = {uri: `soccerBackground`};
    }

    if (url === `basket`) {
      url = {uri: `basketBackground`};
    }

    if (url === `tennis`) {
      url = {uri: `tennisBackground`};
    }

    if (url === `rugby`) {
      url = {uri: `rugbyBackground`};
    }

    if (url === `volleyball`) {
      url = {uri: `volleyballBackground`};
    }

    if (url === `blanco`) {
      return;
    }

    return <Animatable.Image style={[EditorStyle.field]} source={url} />;
  }

  fieldsThumbnailHandler(image) {
    const {field} = this.state;
    const index = indexOf(field.images, image);

    field.currentIndex = index;

    this.setState({field});
  }

  renderFieldsDrawer() {

    const {field} = this.state;

    if (field.drawer.isActive) {
      return (
        <Animatable.View style={[EditorStyle.fieldsDrawer]} ref='fieldsDrawerRef' duration={200} animation='pulse' easing='ease-out'>
          <Text style={[TextStyles.title, EditorStyle.fieldsDrawerTitle]}>{`Speelveld`.toUpperCase()}</Text>
          <ScrollView style={[EditorStyle.fieldsDrawerScrollview]}>
              <View style={[EditorStyle.fieldsDrawerScrollviewContent]}>
                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `blancoIcon`}} />
                    <Text style={[TextStyles.subTitle]}>{`blanco`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`blanco`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 0 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `blancoFieldThumbnail`}} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `soccerIcon`}} />
                    <Text style={[TextStyles.subTitle]}>{`voetbal`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`soccer`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 1 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `soccerFieldThumbnail`}} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `basketballIcon`}} />
                    <Text style={[TextStyles.subTitle]}>{`basket`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`basket`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 2 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `basketFieldThumbnail`}} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `tennisIcon`}} />
                    <Text style={[TextStyles.subTitle]}>{`tennis`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`tennis`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 3 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `tennisFieldThumbnail`}} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `rugbyIcon`}} />
                    <Text style={[TextStyles.subTitle]}>{`rugby`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`rugby`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 4 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `rugbyFieldThumbnail`}} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={{uri: `volleyBallIcon`}} />
                    <Text style={[TextStyles.subTitle]}>{`volleybal`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`volleyball`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 5 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={{uri: `volleyballFieldThumbnail`}} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
          </ScrollView>
        </Animatable.View>
      );
    }
  }

  fieldIconPressHandler() {
    const {field} = this.state;
    const {fieldsDrawerRef} = this.refs;

    field.drawer.isActive = !field.drawer.isActive;

    if (!field.drawer.isActive) {
      fieldsDrawerRef.transition({opacity: 1}, {opacity: 0}, 200, `ease-out`);
      setTimeout(() => {
        field.drawer.isActive = false;
        this.setState({field});
      }, 200);
      return;
    }

    this.setState({field});
    return;
  }

  renderLeftControls() {

    const {brush, field} = this.state;

    if (!field.drawer.isActive) {
      return (
        <View style={[EditorStyle.leftControls]}>
          <View style={[EditorStyle.leftUpperControls]}>
            <TouchableWithoutFeedback onPressOut={() => this.changeColorHandler()} onPressIn={() => this.pressInColorHandler()}>
              <Animatable.View ref='currentColor' style={[EditorStyle.colorIcon, EditorStyle.icon, {backgroundColor: brush.colors[brush.index]}]}>
              </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPressOut={() => this.refs.brushIcon.bounceIn(800)} onPressIn={() => this.refs.brushIcon.pulse(600)}>
              <Animatable.View ref='brushIcon'>
                <Image style={[EditorStyle.brushIcon, EditorStyle.icon]} source={{uri: `brushIcon`}} />
              </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPressOut={() => this.refs.eraserIcon.bounceIn(800)} onPressIn={() => this.refs.eraserIcon.pulse(600)}>
              <Animatable.View ref='eraserIcon'>
                <Image style={[EditorStyle.eraserIcon, EditorStyle.icon]} source={{uri: `eraserIcon`}} />
              </Animatable.View>
            </TouchableWithoutFeedback>
          </View>

          <View style={[EditorStyle.leftLowerControls]}>
            <TouchableWithoutFeedback onPress={() => this.deleteLastActionHandler()} onPressOut={() => this.refs.undoIcon.bounceIn(800)} onPressIn={() => this.refs.undoIcon.pulse(600)}>
              <Animatable.View ref='undoIcon'>
                <Image style={[EditorStyle.undoIcon, EditorStyle.icon]} source={{uri: `undoIcon`}} />
              </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPressOut={() => this.refs.redoIcon.bounceIn(800)} onPressIn={() => this.refs.redoIcon.pulse(600)}>
              <Animatable.View ref='redoIcon'>
                <Image style={[EditorStyle.redoIcon, EditorStyle.icon]} source={{uri: `redoIcon`}} />
              </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.screenshotHandler()} onPressOut={() => this.refs.saveIcon.bounceIn(800)} onPressIn={() => this.refs.saveIcon.pulse(600)}>
              <Animatable.View ref='saveIcon'>
                <Image style={[EditorStyle.saveIcon, EditorStyle.icon]} source={{uri: `saveIcon`}} />
              </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.deleteAllActionsHandler()} onPressOut={() => this.refs.deleteIcon.bounceIn(800)} onPressIn={() => this.refs.deleteIcon.pulse(600)}>
              <Animatable.View ref='deleteIcon'>
                <Image style={[EditorStyle.deleteIcon, EditorStyle.icon]} source={{uri: `deleteIcon`}} />
              </Animatable.View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }
  }

  renderRightControls() {
    const {field} = this.state;

    let url = ``;
    if (field.drawer.isActive) {
      url = {uri: `closeIcon`};
    } else {
      url = {uri: `fieldIcon`};
    }

    return (
      <View style={[EditorStyle.rightControls]}>
        <TouchableWithoutFeedback onPressOut={() => Actions.pop()} onPressIn={() => this.refs.closeIcon.pulse(600)}>
          <Animatable.View style={[{opacity: field.drawer.isActive ? 0 : 1}]} ref='closeIcon'>
            <Image style={[EditorStyle.closeIcon, EditorStyle.icon]} source={{uri: `closeIcon`}} />
          </Animatable.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={EditorStyle.fieldIconWrapper}>
          <Animatable.View style={EditorStyle.fieldIconWrapper}>
            <Text style={[EditorStyle.fieldIconText, {opacity: field.drawer.isActive ? 0 : 1}]}>Speelveld</Text>
            <TouchableWithoutFeedback onPress={() => this.fieldIconPressHandler()} onPressOut={() => this.refs.fieldIcon.bounceIn(800)} onPressIn={() => this.refs.fieldIcon.pulse(600)}>
              <Animatable.Image ref='fieldIcon' style={[EditorStyle.fieldIcon, EditorStyle.icon]} source={url}/>
            </TouchableWithoutFeedback>
          </Animatable.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderAddObjectsButton() {
    const {field} = this.state;

    if (!field.drawer.isActive) {
      return (
        <TouchableWithoutFeedback onPress={() => this.toggleObjectsDrawer()}>
          <Animatable.Image ref='addEditorIcon' style={EditorStyle.addEditorIcon} source={{uri: `addEditorIcon`}} />
        </TouchableWithoutFeedback>
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

    const {currentRichting, currentEditorDirectionIndex} = this.state;

    return (
      <View style={EditorStyle.directionArrowsWrapper}>
        <TouchableOpacity style={[EditorStyle.directionArrow, {backgroundColor: currentRichting === `top` ? Colors.orange : Colors.lightGrey}]} onPress={() => this.selectDirection(`top`)} >
          <Image style={[EditorStyle.directionArrowIcon, EditorStyle.directionArrowIconUp]} source={require(`../assets/png/arrowWhite.png`)} />
        </TouchableOpacity>

        <View style={EditorStyle.directionArrowMiddle}>
          <TouchableOpacity style={[EditorStyle.directionArrow, {backgroundColor: currentRichting === `left` ? Colors.orange : Colors.lightGrey}]} onPress={() => this.selectDirection(`left`)} >
            <Image style={[EditorStyle.directionArrowIcon, EditorStyle.directionArrowIconLeft]} source={require(`../assets/png/arrowWhite.png`)} />
          </TouchableOpacity>

          <TouchableOpacity style={[EditorStyle.directionArrow, {backgroundColor: currentRichting === `right` ? Colors.orange : Colors.lightGrey}]} onPress={() => this.selectDirection(`right`)} >
            <Image style={[EditorStyle.directionArrowIcon, EditorStyle.directionArrowIconRight]} source={require(`../assets/png/arrowWhite.png`)} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[EditorStyle.directionArrow, {backgroundColor: currentRichting === `bottom` ? Colors.orange : Colors.lightGrey}]} onPress={() => this.selectDirection(`bottom`)} >
          <Image style={[EditorStyle.directionArrowIcon, EditorStyle.directionArrowIconDown]} source={require(`../assets/png/arrowWhite.png`)} />
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
        console.log(`kleur niet aanwezig`);
        currentDirection[`${currentRichting}`].colors.push(colors[colorIndex]);
        this.setState({editorDirections});
      } else { //Zoniet -> verwijderen
        console.log(`kleur aanwezig`);
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

  toggleCombinationSetting(combination) {
    const {globalEditorSettings} = this.state;

    if (combination !== globalEditorSettings.combination) return;
    globalEditorSettings.combination = !globalEditorSettings.combination;

    this.setState({globalEditorSettings});
  }

  toggleDelaySetting(amount) {
    const {globalEditorSettings} = this.state;

    if (globalEditorSettings.delay + amount < 0 || globalEditorSettings.delay + amount > 10) {
      return;
    }

    globalEditorSettings.delay += amount;

    this.setState({globalEditorSettings});
  }

  renderOptionsMenu() {
    const {optionsMenu, editorDirections, currentEditorDirectionIndex, globalEditorSettings} = this.state;

    if (optionsMenu.isActive) {
      if (!isEmpty(editorDirections[currentEditorDirectionIndex])) {
        return (
          <Animatable.View ref='optionsMenuRef' animation='fadeInRightBig' duration={500} easing='ease-out-circ' style={EditorStyle.optionsMenu}>
            <View style={EditorStyle.optionsMenuDirectionUpper}>

              <Text style={[TextStyles.title, EditorStyle.optionsMenuTitle]}>{`direction ${currentEditorDirectionIndex + 1}`.toUpperCase()}</Text>

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

              <Text style={[TextStyles.title, EditorStyle.optionsMenuTitle]}>{`globaal`.toUpperCase()}</Text>

              <View style={[EditorStyle.optionsMenuRichting]}>
                <Text style={[TextStyles.subTitle, EditorStyle.optionsMenusubTitle]}>{`delay`.toUpperCase()}</Text>
                <View style={[EditorStyle.delayButtons]}>
                  <TouchableOpacity onPress={() => this.toggleDelaySetting(- 1)} style={[EditorStyle.delayButton]}>
                    <Image style={[EditorStyle.delayMinusIcon]} source={require(`../assets/png/minusIconBlack.png`)} />
                  </TouchableOpacity>

                  <Text style={[TextStyles.copy, EditorStyle.delayCopy]}>{`${globalEditorSettings.delay}s`.toUpperCase()}</Text>

                  <TouchableOpacity onPress={() => this.toggleDelaySetting(1)} style={[EditorStyle.delayButton]}>
                    <Image style={[EditorStyle.delayPlusIcon]} source={require(`../assets/png/plusIconBlack.png`)} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[EditorStyle.optionsMenuRichting]}>
                <Text style={[TextStyles.subTitle, EditorStyle.optionsMenusubTitle]}>{`oplichten`.toUpperCase()}</Text>
                <View style={[EditorStyle.oplichtenWrapper]}>
                  <TouchableOpacity onPress={() => this.toggleCombinationSetting(false)} style={[EditorStyle.oplichtenButton, {backgroundColor: !globalEditorSettings.combination ? `transparent` : Colors.orange, borderColor: !globalEditorSettings.combination ? Colors.black : Colors.orange}]}>
                    <Text style={[TextStyles.copy, {color: !globalEditorSettings.combination ? Colors.black : Colors.pureWhite}]}>apart</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.toggleCombinationSetting(true)} style={[EditorStyle.oplichtenButton, {backgroundColor: globalEditorSettings.combination ? `transparent` : Colors.orange, borderColor: globalEditorSettings.combination ? Colors.black : Colors.orange}]}>
                    <Text style={[TextStyles.copy, {color: globalEditorSettings.combination ? Colors.black : Colors.pureWhite}]}>gecombineerd</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </Animatable.View>
        );
      }
    }
  }

  render() {
    console.log(this.state.currentRichting);
    return (
      <View style={[EditorStyle.editorContainer]}>
        <View style={{position: `absolute`}} ref='artboard'>

          <Svg style={[{zIndex: 1}]} {...this.drawHandler.panHandlers} width={Dimensions.width} height={Dimensions.height} ref='svg'>
            <Rect x='0' y='0' width='100%' height='100%' fill='transparent' />
            {this.generateUserDrawingFeedback()}
            {this.generateSvgElements()}
          </Svg>
          {this.generateField()}
          {this.renderEditorDirections()}

        </View>
        {this.renderLeftControls()}


        {this.renderRightControls()}

        {this.renderAddObjectsButton()}

        {this.renderObjectsDrawer()}

        {this.renderFieldsDrawer()}

        {this.renderOptionsMenu()}
      </View>
    );
  }
}

Editor.propTypes = {
  connectedDirections: React.PropTypes.array
};

export default Editor;
