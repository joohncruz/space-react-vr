import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,  
  Pano,
  Text,
  View,
  Model,
  AmbientLight,
} from 'react-vr';

import Button from './vr/button.js';

export default class EarthMoonVR extends React.Component {
  constructor() {
    super();
    this.state = {
      rotation: 130,
      zoom: -70,
    };
    this.lastUpdate = Date.now();

    this.spaceSkymap = [
      '../static_assets/space_right.png',
      '../static_assets/space_left.png',
      '../static_assets/space_up.png',
      '../static_assets/space_down.png',
      '../static_assets/space_back.png',
      '../static_assets/space_front.png'
    ];

    this.classRoom = '../static_assets/room1.jpg'
    this.classRoom2 = '../static_assets/room2.jpg'
    this.classRoom3 = '../static_assets/room3.jpg'        

    this.rotate = this.rotate.bind(this);

    this.styles = StyleSheet.create({
      menu: {
        flex: 1,
        flexDirection: 'column',
        width: 1,
        alignItems: 'stretch',
        transform: [{ translate: [2, 2, -5] }]
      }
    })
  }
  componentDidMount() {
    this.rotate();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({
		  rotation: this.state.rotation + delta / 150
	  });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  render() {
    return (
      <View>
        <Pano source={ { uri: this.classRoom3 } }/>

        <AmbientLight intensity={ 2.6 }  />

        <View style={ this.styles.menu }>
          <Button text='+'
            callback={()=> this.setState((prevState) => ({ zoom: prevState.zoom + 10 }) ) } />
          <Button text='-'
            callback={()=> this.setState((prevState) => ({ zoom: prevState.zoom - 10 }) ) } />
        </View>
        
        <Model
          style={{
            transform: [
              {translate: [-25, 0, this.state.zoom]},
              {scale: 0.05 },
              {rotateY: this.state.rotation},
              {rotateX: 20},
              {rotateZ: -10}
            ],
          }}
          source={{obj:asset('earth.obj'), mtl:asset('earth.mtl')}}
          lit={true}
        />
        
        <Model
          style={{
            transform: [
              {translate: [10, 10, this.state.zoom - 30]},
              {scale: 0.05},
              {rotateY: this.state.rotation / 3},
            ],
          }}
          source={{obj:asset('moon.obj'), mtl:asset('moon.mtl')}}
          lit={true}
        />
  
      </View>
  );
  }
};

AppRegistry.registerComponent('EarthMoonVR', () => EarthMoonVR);
