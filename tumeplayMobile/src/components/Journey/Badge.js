import React, {useContext, useState, useEffect} from 'react';
import Svg, {Polygon} from 'react-native-svg';
import {Image, StyleSheet} from 'react-native';
import lock from '../../assets/custom_images/Vector.png';
import check from '../../assets/Check.png';
import AppContext from '../../../AppContext';

const Badge = module => {
  const context = useContext(AppContext);
  const doneModules_ids = context.doneModules_ids;
  const [strokeColor, setStrokeColor] = useState('#EAE2D7');
  const [fillColor, setFillColor] = useState('#FEF0DC66');
  const [done, setDone] = useState(false);

  console.log('donemodules', doneModules_ids);

  const adjustModuleColor = () => {
    if (doneModules_ids.includes(module.module.id)) {
      setStrokeColor('#51B070');
      setFillColor('#DDF4ED');
      setDone(true);
    }
  };

  useEffect(() => {
    adjustModuleColor();
  }, [strokeColor, done]);

  return (
    <Svg style={styles.svgContainer}>
      <Polygon
        points="50,0 95,25 95,50 95,75 50,100 10,75 10,25"
        stroke={strokeColor}
        strokeWidth="3"
        fill={fillColor}
        style={{zIndex: 1, position: 'relative'}}
      />
      {done ? (
        <Image source={check} style={styles.imageValidate} />
      ) : (
        <Image source={lock} style={styles.imageLock} />
      )}
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
  imageValidate: {
    position: 'absolute',
    top: 45,
    left: 45,
  },
});

export default Badge;
