import React from 'react';
import Svg, {Polygon} from 'react-native-svg';
import {Image, StyleSheet} from 'react-native';
import lock from '../../assets/custom_images/Vector.png';

const Badge = () => {
  return (
    <Svg style={styles.svgContainer}>
      <Polygon
        points="50,0 95,25 95,50 95,75 50,100 10,75 10,25"
        stroke="#EAE2D7"
        strokeWidth="3"
        fill="#FEF0DC66"
        style={{zIndex: 1, position: 'relative'}}></Polygon>
      <Image source={lock} style={styles.imageLock} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  svgContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    margin: 10,
  },
  imageLock: {
    position: 'absolute',
    bottom: -95,
    left: 70,
  },
});

export default Badge;
