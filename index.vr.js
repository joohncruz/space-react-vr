import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

export default class EarthMoonVR extends React.Component {
  render() {
    return (
      <View>
        <Pano source={
          {
            uri: [
              './static_assets/space_right1.png',
              './static_assets/space_left2.png',
              './static_assets/space_top3.png',
              './static_assets/space_bottom4.png',
              './static_assets/space_back6.pngx',
              './static_assets/space_front5.png'
            ]
          }
        }
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('EarthMoonVR', () => EarthMoonVR);
