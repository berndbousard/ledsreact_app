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

import React, {PureComponent} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';

import {isEmpty} from 'lodash';
import {GeneralStyle, ComponentStyle} from '../styles';

class MyDirections extends PureComponent {

  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      connectedDirections: []
    };

    this.props.socket.on(`init`, directions => this.handleWSDirections(directions));
    this.props.socket.on(`updateDirections`, socketId => this.handleWSupdateDirections(socketId));
    this.props.socket.on(`directionJoined`, direction => this.handleWSdirectionJoined(direction));
  }

  handleWSDirections(connectedDirections) {
    this.setState({connectedDirections});
  }

  handleWSupdateDirections(socketId) {
    console.log(`update`);
    const {connectedDirections} = this.state;

    const newDirections = connectedDirections.filter(d => {
      return d.socketId !== socketId;
    });

    this.setState({connectedDirections: newDirections});
  }

  handleWSdirectionJoined(direction) {

    const {connectedDirections} = this.state;

    const existing = connectedDirections.find(d => {
      return d.socketId === direction.socketId;
    });

    if (!isEmpty(existing)) {
      return;
    }

    connectedDirections.push(direction);

    this.setState({connectedDirections});
  }

  detectDirection(direction) {
    const {socketId} = direction;
    this.props.socket.emit(`lightUpDirection`, {socketId});
  }

  generateConnectedDirections() {
    const {connectedDirections} = this.state;

    if (isEmpty(connectedDirections)) {
      return <Text>Er zijn geen Directions verbonden</Text>;
    }

    return (
      connectedDirections.map((d, index) => {
        return (
          <TouchableOpacity style={ComponentStyle.button} onPress={() => {this.detectDirection(d);}} key={index}>
            <View>
              <Text>{d.socketId}</Text>
              <Text>{`${d.batteryLevel} %`}</Text>
            </View>
          </TouchableOpacity>
        );
      })
    );
  }

  render() {
    return (
      <View style={[GeneralStyle.center, {backgroundColor: `pink`}]}>
        <Button title='oefening maken' onPress={() => {console.log(`blabla`);}} />
        <View>
          <Text>Verbonden Directions</Text>
          <View style={{flexDirection: `row`, alignItems: `center`, justifyContent: `center`}}>
            {this.generateConnectedDirections()}
          </View>
        </View>
      </View>
    );
  }
}

MyDirections.propTypes = {
  socket: React.PropTypes.object
};

export default MyDirections;
