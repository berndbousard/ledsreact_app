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
