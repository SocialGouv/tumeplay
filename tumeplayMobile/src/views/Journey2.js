import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Container from '../components/global/Container';
import Condom from '../components/Journey/Condom';
import Title from '../components/Title';
import Svg, {Polygon} from 'react-native-svg';
import config from '../../config';

const Journey2 = () => {
  const [strokeColor, setStrokeColor] = useState('#EAE2D7');
  const [fillColor, setFillColor] = useState('#FEF0DC66');
  return (
    <Container>
      <Title title="Ton parcours" />
      <Condom />
      <Svg style={styles.svgContainer}>
        <Polygon
          points="100,100 0,25"
          stroke={strokeColor}
          strokeWidth="3"
          fill={fillColor}></Polygon>
      </Svg>
    </Container>
  );
};

const styles = StyleSheet.create({
  svgContainer: {
    position: 'absolute',
    width: 300,
    height: 200,
    top: config.deviceHeight / 2 - 100,
    right: 0,
    zIndex: -1,
  },
});

export default Journey2;
