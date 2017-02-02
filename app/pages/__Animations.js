import React, {PureComponent} from 'react';
import {View, Button} from 'react-native';
import {GeneralStyle} from '../styles';
import {Actions} from 'react-native-router-flux';

class MyDirections extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      directions: []
    };

    this.socket = this.props.socket;
  }

  componentDidMount() {
    this.socket.on(`init`, this.handleWSDirections);
  }

  handleWSDirections = directions => {
    console.log(`init`);

    this.setState({directions});
  }

  render() {

    console.log(`rerender`);

    return (
        <View style={[GeneralStyle.center, {backgroundColor: `pink`}]}>
          <Button title='add' onPress={() => {this.addDirection(this.props);}} />

          <Animatable.View ref='directions'>
            <TouchableHighlight>
              <Text>Test</Text>
            </TouchableHighlight>
          </Animatable.View>

          <List></List>


        </View>
    );
  }

  addDirection = props => {
    // props.addDirection();
    // Actions.login({type: `push`, duration: 0});

    // Enkel op view, text, image
    this.refs.Directions.transitionTo({marginTop: 300, fontSize: 19});
    this.refs.Directions2.transition({}, {});

    // Gebruik margin om andere elementen te doen reageren op de animatie.
    this.refs.Directions.transition({transform: [{translateY: 200}, {rotate: `20deg`}]});
    this.refs.list.transition({transform: [{translateY: 200}, {rotate: `20deg`}]});

    setTimeout(() => {
      Actions.diretions({duration: 0});
    }, 500);

  };

}

export default MyDirections;

// import React, {PureComponent} from 'react';
// import {View, Text, Button, TouchableHighlight} from 'react-native';
// import {Actions} from 'react-native-router-flux';
//
// import {isEmpty, range} from 'lodash';
//
// import {Colors} from '../globals';
// import {GeneralStyle, ComponentStyle} from '../styles';
//
// class MyDirections extends PureComponent {
//
//   constructor(props) {
//     super(props);
//
//     this.props = props;
//
//     console.log(this.props);
//   }
//
//   render() {
//
//     console.log(this.props);
//
//     return (
//       <View style={[GeneralStyle.center, {backgroundColor: `pink`}]}>
//         <Button title='testje' onPress={() => {console.log(`test`);}} />
//       </View>
//     );
//   }
//
// }
//
//     // return (
//     //   <View style={[GeneralStyle.center, {backgroundColor: `pink`}]}>
//     //     {this.generateDirections()}
//     //     {this.generateExercises(3)}
//     //     <Button color={Colors.blue} title='Editor' onPress={() => {Actions.editor({directionAmount: directions.length});}}></Button>
//     //   </View>
//     // );
//
// const generateExercises = amount => {
//   return (
//     <View style={{flexDirection: `column`, alignItems: `center`, marginTop: 50}}>
//       <Text>Oefeningen</Text>
//       <View style={{flexDirection: `row`}}>
//         {
//           range(amount).map((a, index) => {
//             return (
//               <TouchableHighlight style={ComponentStyle.button} onPressIn={() => {Actions.exerciseDetail();}} activeOpacity={.25} underlayColor={Colors.white} key={index}>
//                 <Text style={{fontFamily: `Circular-Std-Bold`}}>Oefening</Text>
//               </TouchableHighlight>
//             );
//           })
//         }
//       </View>
//     </View>
//   );
// };
//
// const lightUpDirection = direction => {
//
//   const {socketId} = direction;
//
//   this.socket.emit(`lightUpDirection`, {socketId});
// };
//
// const generateDirections = () => {
//   const {directions} = this.state;
//
//   if (isEmpty(directions)) {
//     return <Text>Er zijn geen Directions verbonden</Text>;
//   }
//
//   return (
//     <View style={{flexDirection: `column`, alignItems: `center`}}>
//       <Text>Verbonden Directions</Text>
//       {
//         <View style={{flexDirection: `row`}}>
//           {
//             directions.map((d, index) => {
//               return (
//                 <TouchableHighlight style={ComponentStyle.button} onPress={() => {this.lightUpDirection(d);}} activeOpacity={.25} underlayColor={Colors.white} key={index}>
//                   <View>
//                     <Text>{d.socketId}</Text>
//                     <Text>{`${d.batteryLevel} %`}</Text>
//                   </View>
//                 </TouchableHighlight>
//               );
//             })
//           }
//         </View>
//       }
//     </View>
//   );
// };
//
// export default MyDirections;
