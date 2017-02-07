import React, {Component} from 'react';
import {View, Text, PanResponder, TouchableWithoutFeedback, Image, ScrollView} from 'react-native';
import {indexOf} from 'lodash';
import {takeSnapshot} from "react-native-view-shot";
import {Actions} from "react-native-router-flux";
import * as Animatable from 'react-native-animatable';
import Svg, {Rect} from 'react-native-svg';

import {Circle, Path, Direction} from '../components';
import {EditorStyle, Colors, Dimensions, TextStyles} from '../styles';
import {DatabaseUrl} from '../globals';

class Editor extends Component {

  state = {
    connectedDirections: this.props.connectedDirections,
    directionsInEditor: 0,
    svgElements: [],
    userDrawingFeedback: [],
    drawer: {
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
    editorDirections: [

    ],
    functionValues: []
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

    fetch(`${DatabaseUrl}/api/directionFunctions`)
      .then(r => {
        return r.json();
      })
      .then(({directionFunctions}) => {
        const newFunctionValues = [];

        directionFunctions.map(d => {
          newFunctionValues.push(d._id);
        });

        let {functionValues} = this.state;

        functionValues = newFunctionValues;

        this.setState({functionValues});
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

  addObjectsButtonPressHandler() {
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
      colors: [
        {
          name: `green`,
          isActive: false
        },
        {
          name: `red`,
          isActive: false
        },
        {
          name: `blue`,
          isActive: false
        },
        {
          name: `yellow`,
          isActive: false
        },
        {
          name: `orange`,
          isActive: false
        }
      ],

      directions: {
        left: false,
        right: false,
        forward: false,
        backward: false
      },

      function: {
        currentIndex: 0,
        functionLabels: [`richting`, `kleur`, `timer`]
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
          <Image style={[EditorStyle.directionDrawerImage]} source={require(`../assets/png/direction.png`)} />
        </TouchableWithoutFeedback>
      </Animatable.View>
    );
  }

  renderDirections() {

    const {connectedDirections} = this.state;

    const objectsDrawerBounds = {
      xMin: Dimensions.width / 2 - (Dimensions.width * (3 / 4)) / 2,
      yMin: (Dimensions.height - 100) - 300,
      xMax: (Dimensions.width / 2 - (Dimensions.width * (3 / 4)) / 2) + Dimensions.width * (3 / 4),
      yMax: Dimensions.height - 100
    };

    return (
      connectedDirections.map((e, index) => {

        return <Direction key={index} index={index} bounds={objectsDrawerBounds} />;
      })
    );
  }

  generateField() {

    const {field} = this.state;

    let url = field.images[field.currentIndex];

    if (url === `soccer`) {
      url = require(`../assets/png/soccerBackground.png`);
    }

    if (url === `basket`) {
      url = require(`../assets/png/basketBackground.png`);
    }

    if (url === `tennis`) {
      url = require(`../assets/png/tennisBackground.png`);
    }

    if (url === `rugby`) {
      url = require(`../assets/png/rugbyBackground.png`);
    }

    if (url === `volleyball`) {
      url = require(`../assets/png/volleyballBackground.png`);
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
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={require(`../assets/png/blancoIcon.png`)} />
                    <Text style={[TextStyles.subTitle]}>{`blanco`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`blanco`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 0 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={require(`../assets/png/blancoFieldThumbnail.png`)} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={require(`../assets/png/soccerIcon.png`)} />
                    <Text style={[TextStyles.subTitle]}>{`voetbal`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`soccer`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 1 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={require(`../assets/png/soccerFieldThumbnail.png`)} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={require(`../assets/png/basketballIcon.png`)} />
                    <Text style={[TextStyles.subTitle]}>{`basket`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`basket`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 2 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={require(`../assets/png/basketFieldThumbnail.png`)} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={require(`../assets/png/tennisIcon.png`)} />
                    <Text style={[TextStyles.subTitle]}>{`tennis`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`tennis`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 3 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={require(`../assets/png/tennisFieldThumbnail.png`)} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={require(`../assets/png/rugbyIcon.png`)} />
                    <Text style={[TextStyles.subTitle]}>{`rugby`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`rugby`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 4 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={require(`../assets/png/rugbyFieldThumbnail.png`)} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={[EditorStyle.fieldsDrawerItem]}>
                  <View style={[EditorStyle.fieldsDrawerItemHeader]}>
                    <Image style={[EditorStyle.fieldsDrawerItemHeaderImage]} source={require(`../assets/png/volleyBallIcon.png`)} />
                    <Text style={[TextStyles.subTitle]}>{`volleybal`.toUpperCase()}</Text>
                  </View>

                  <TouchableWithoutFeedback onPress={() => this.fieldsThumbnailHandler(`volleyball`)}>
                    <View style={[EditorStyle.fielsDrawerItemImageWrapper, {borderColor: field.currentIndex === 5 ? Colors.orange : `transparent`}]}>
                      <Image style={[EditorStyle.fielsDrawerItemImage]} source={require(`../assets/png/volleyballFieldThumbnail.png`)} />
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
                <Image style={[EditorStyle.brushIcon, EditorStyle.icon]} source={require(`../assets/png/brushIcon.png`)}/>
              </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPressOut={() => this.refs.eraserIcon.bounceIn(800)} onPressIn={() => this.refs.eraserIcon.pulse(600)}>
              <Animatable.View ref='eraserIcon'>
                <Image style={[EditorStyle.eraserIcon, EditorStyle.icon]} source={require(`../assets/png/eraserIcon.png`)}/>
              </Animatable.View>
            </TouchableWithoutFeedback>
          </View>

          <View style={[EditorStyle.leftLowerControls]}>
            <TouchableWithoutFeedback onPress={() => this.deleteLastActionHandler()} onPressOut={() => this.refs.undoIcon.bounceIn(800)} onPressIn={() => this.refs.undoIcon.pulse(600)}>
              <Animatable.View ref='undoIcon'>
                <Image style={[EditorStyle.undoIcon, EditorStyle.icon]} source={require(`../assets/png/undoIcon.png`)}/>
              </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPressOut={() => this.refs.redoIcon.bounceIn(800)} onPressIn={() => this.refs.redoIcon.pulse(600)}>
              <Animatable.View ref='redoIcon'>
                <Image style={[EditorStyle.redoIcon, EditorStyle.icon]} source={require(`../assets/png/redoIcon.png`)}/>
              </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.screenshotHandler()} onPressOut={() => this.refs.saveIcon.bounceIn(800)} onPressIn={() => this.refs.saveIcon.pulse(600)}>
              <Animatable.View ref='saveIcon'>
                <Image style={[EditorStyle.saveIcon, EditorStyle.icon]} source={require(`../assets/png/saveIcon.png`)}/>
              </Animatable.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.deleteAllActionsHandler()} onPressOut={() => this.refs.deleteIcon.bounceIn(800)} onPressIn={() => this.refs.deleteIcon.pulse(600)}>
              <Animatable.View ref='deleteIcon'>
                <Image style={[EditorStyle.deleteIcon, EditorStyle.icon]} source={require(`../assets/png/deleteIcon.png`)}/>
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
      url = require(`../assets/png/closeIcon.png`);
    } else {
      url = require(`../assets/png/fieldIcon.png`);
    }

    return (
      <View style={[EditorStyle.rightControls]}>
        <TouchableWithoutFeedback onPressOut={() => Actions.pop()} onPressIn={() => this.refs.closeIcon.pulse(600)}>
          <Animatable.View style={[{opacity: field.drawer.isActive ? 0 : 1}]} ref='closeIcon'>
            <Image style={[EditorStyle.closeIcon, EditorStyle.icon]} source={require(`../assets/png/closeIcon.png`)}/>
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
        <TouchableWithoutFeedback onPress={() => this.addObjectsButtonPressHandler()}>
          <Animatable.Image ref='addEditorIcon' style={EditorStyle.addEditorIcon} source={require(`../assets/png/addEditorIcon.png`)} />
        </TouchableWithoutFeedback>
      );
    }
  }

  renderEditorDirections() {
    const {editorDirections} = this.state;

    return (
      editorDirections.map((e, index) => {
        return <Direction style={[{left: 0, top: 0, zIndex: 5}]} {...e} key={index} directionIndex={index}
          changeDirectionFunctionHandler={directionIndex => this.changeDirectionFunctionHandler(directionIndex)}
          changeDirectionColorHandler={(directionIndex, colorIndex) => this.changeDirectionColorHandler(directionIndex, colorIndex)} />;
      })
    );
  }

  changeDirectionFunctionHandler(directionIndex) {
    const {editorDirections} = this.state;
    console.log(this.state.functionValues);

    editorDirections [directionIndex].function.currentIndex++;

    if (editorDirections [directionIndex].function.currentIndex > editorDirections [directionIndex].function.functionLabels.length - 1) {
      editorDirections [directionIndex].function.currentIndex = 0;
    }

    this.setState({editorDirections});
  }

  changeDirectionColorHandler(directionIndex, colorIndex) {
    const {editorDirections} = this.state;

    editorDirections[directionIndex].colors[colorIndex].isActive = !editorDirections[directionIndex].colors[colorIndex].isActive;

    this.setState({editorDirections});
  }

  render() {
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
      </View>
    );
  }
}

Editor.propTypes = {
  connectedDirections: React.PropTypes.array
};

export default Editor;
