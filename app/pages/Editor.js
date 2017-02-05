import React, {Component} from 'react';
import {View, Text, PanResponder, TouchableWithoutFeedback, Image, ScrollView} from 'react-native';
import {range} from 'lodash';
import {takeSnapshot} from "react-native-view-shot";
import {Actions} from "react-native-router-flux";
import * as Animatable from 'react-native-animatable';
import Svg, {Rect} from 'react-native-svg';

import {Circle, Path, Direction} from '../components';
import {EditorStyle, Colors, Dimensions} from '../styles';

class Editor extends Component {

  state = {
    connectedDirections: this.props.connectedDirections,
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
      index: 0,
      images: [`soccer`],
      drawer: {
        isActive: false
      }
    }
  };

  componentDidMount() {
    console.log(this.refs);

    const {brushIcon, closeIcon, currentColor, deleteIcon, eraserIcon, fieldIcon, redoIcon, saveIcon, undoIcon} = this.refs;

    // brushIcon.transition({opacity: 0}, {opacity: 1}, 450, 300, `ease-out-quad`);
    // closeIcon.transition({opacity: 0}, {opacity: 1}, 450, 300, `ease-out-quad`);
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

  generateDirections() {
    const {directionAmount = 0} = this.state;

    return (
      <View style={{flexDirection: `row`}}>
        {
          range(directionAmount).map((d, index) => {
            return <Direction width={50} height={50} key={index} />;
          })
        }
      </View>
    );
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

  addEditorPressHandler() {
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

  renderObjectsDrawer() {
    const {drawer} = this.state;

    if (!drawer.isActive) {
      return;
    }

    return (
      <Animatable.View ref='drawerRef' duration={200} animation='pulse' easing='ease-out' style={[EditorStyle.drawer]}>
        {
          this.renderDirections()
        }
      </Animatable.View>
    );
  }

  renderDirections() {

    const {connectedDirections} = this.state;

    return (
      connectedDirections.map((e, index) => {
        return <Direction key={index} index={index} />;
      })
    );
  }

  generateField() {

    const {field} = this.state;

    const url = field.images[field.index];

    if (url === `soccer`) {
      return <Image style={{position: `absolute`, left: 0, top: 0, width: Dimensions.width, height: Dimensions.height, opacity: 0.04, zIndex: 0}} source={require(`../assets/png/soccerBackground.png`)} />;
    }
  }

  renderFieldsDrawer() {

    const {field} = this.state;

    if (field.drawer.isActive) {
      return (
        <Animatable.View ref='fieldsDrawerRef' duration={200} animation='pulse' easing='ease-out' style={[EditorStyle.fieldsDrawer]}>
          <Text style={[EditorStyle.fieldsDrawerTitle]}>Speelveld</Text>
          <ScrollView>
              <View>
                <View>
                  <Image source={require(`../assets/png/blancoIcon.png`)} />
                  <Text>Blanco speelveld</Text>
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

    return;
  }

  renderRightControls() {
    const {field} = this.state;

    return (
      <View style={[EditorStyle.rightControls]}>
        <TouchableWithoutFeedback onPressOut={() => Actions.pop()} onPressIn={() => this.refs.closeIcon.pulse(600)}>
          <Animatable.View style={[{opacity: field.drawer.isActive ? 0 : 1}]} ref='closeIcon'>
            <Image style={[EditorStyle.closeIcon, EditorStyle.icon]} source={require(`../assets/png/closeIcon.png`)}/>
          </Animatable.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={EditorStyle.fieldIconWrapper}>
          <Animatable.View style={EditorStyle.fieldIconWrapper}>
            <Text style={[EditorStyle.fieldIconText]}>Speelveld</Text>
            <TouchableWithoutFeedback onPress={() => this.fieldIconPressHandler()} onPressOut={() => this.refs.fieldIcon.bounceIn(800)} onPressIn={() => this.refs.fieldIcon.pulse(600)}>
              <Animatable.Image ref='fieldIcon' style={[EditorStyle.fieldIcon, EditorStyle.icon]} source={require(`../assets/png/fieldIcon.png`)}/>
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
        <TouchableWithoutFeedback onPress={() => this.addEditorPressHandler()}>
          <Animatable.Image ref='addEditorIcon' style={EditorStyle.addEditorIcon} source={require(`../assets/png/addEditorIcon.png`)} />
        </TouchableWithoutFeedback>
      );
    }
  }

  render() {

    const {brush} = this.state;

    return (
      <View style={[EditorStyle.editorContainer]} ref='artboard'>
        <Svg style={[{zIndex: 1}]} {...this.drawHandler.panHandlers} width={Dimensions.width} height={Dimensions.height} ref='svg'>
          <Rect x='0' y='0' width='100%' height='100%' fill='transparent' />
          {this.generateUserDrawingFeedback()}
          {this.generateSvgElements()}
        </Svg>
        {this.generateField()}
        {this.renderLeftControls()}
        {this.renderRightControls()}

        {this.renderAddObjectsButton()}

        {
          this.renderObjectsDrawer()
        }

        {
          this.renderFieldsDrawer()
        }
      </View>
    );
  }
}

Editor.propTypes = {
  connectedDirections: React.PropTypes.array
};

export default Editor;
