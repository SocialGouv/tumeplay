import React, {useContext, useState, useEffect} from 'react';
import Svg, {Polygon} from 'react-native-svg';
import {Image, StyleSheet} from 'react-native';
import lock from '../../assets/custom_images/Vector.png';
import AppContext from '../../../AppContext';

const Badge = module => {
  const context = useContext(AppContext);
  const doneModules_ids = context.doneModules_ids;
  const [strokeColor, setStrokeColor] = useState('#EAE2D7');
  const [fillColor, setFillColor] = useState('#FEF0DC66');

  const adjustModuleColor = () => {
    if (doneModules_ids.includes(module.module.id)) {
      setStrokeColor('#51B070');
      setFillColor('#DDF4ED');
    }
  };

  useEffect(() => {
    adjustModuleColor();
  }, [strokeColor]);

  return (
    <Svg style={styles.svgContainer}>
      <Polygon
        points="50,0 95,25 95,50 95,75 50,100 10,75 10,25"
        stroke={strokeColor}
        strokeWidth="3"
        fill={fillColor}
        style={{zIndex: 1, position: 'relative'}}
      />
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
