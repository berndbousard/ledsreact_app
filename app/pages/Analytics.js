import React, {Component} from 'react';
import {View} from 'react-native';

import {GeneralStyle} from '../styles';
import {Navigation} from '../components';

class Analytics extends Component {

  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {

    console.log(`render`);

    return (
      <View style={GeneralStyle.pageContainer}>

        <Navigation currentPage={this.props.name} />

        <View style={[GeneralStyle.center, {backgroundColor: `orange`}, GeneralStyle.contentContainer]}>
          {/* CONTENT */}
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


// import React from 'react';
// import {View, Text, Button} from 'react-native';
// import io from 'socket.io-client';
//
// import {GeneralStyle} from '../styles';
// import {DatabaseUrl} from '../globals';
//
// const A = ({directions}) => {
//
//   return (
//     <View style={[GeneralStyle.center, {backgroundColor: `crimson`}]}>
//       <Text> Analyse </Text>
//       <Button title='Deploy to Directions' onPress={() => fetchDirections(`5890d4224b8f8b2a3b3720df`)} />
//     </View>
//   );
// };
//
// const fetchDirections = exerciseId => {
//
//   //const headers = new Headers();
//   //headers.append(`Authorization`, `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVybmQiLCJlbWFpbCI6ImJlcm5kLmJvdXNhcmRAZ21haWwuY29tIiwic3BvcnQiOiI1ODkwNzM5M2NlNWJiYTA1YzcwNThiY2EiLCJ0ZWFtIjoiNTg5MDgwYTQ0NWQxNTQwOTVlOGJiYjM4IiwidHlwZSI6MCwic2NvcGUiOiJ1c2VyIiwiaW1hZ2UiOiJwcm9waWMuanBnIiwiaWF0IjoxNDg1OTc3ODc3LCJleHAiOjE0ODY1ODI2NzcsImF1ZCI6ImFwcCIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJzdWIiOiI1ODkwYzY0N2YzZGRmMzIzZjNiZjE3NmUifQ.xL1ZL0W0zzNkZrESnRg69D8wz7KVHXzvux6aSRXgu3g`);
//
//   // const request = new Request(`${DatabaseUrl}/api/directions?exercise=${exerciseId}`, {
//   //   method: `GET`,
//   //   headers: headers,
//   //   mode: `cors`,
//   //   cache: `default`
//   // });
//
//   fetch(`${DatabaseUrl}/api/directions?exercise=${exerciseId}`)
//     .then(r => {
//       return r.json();
//     })
//     .then(({r}) => {
//       r.forEach(_r => {
//         pushToDirection({func: _r.function.name, order: _r.order});
//       });
//     })
//     .catch(e => {
//       console.log(e);
//     });
// };
//
// export default Analyse;
