import React, {useContext, useState, useEffect} from 'react';
import Svg, {Polygon} from 'react-native-svg';
import {Image, StyleSheet, View} from 'react-native';
import lock from '../../assets/custom_images/Vector.png';
import check from '../../assets/Check.png';
import AppContext from '../../../AppContext';

const Badge = module => {
  const context = useContext(AppContext);
  const userHistory = context.userHistory;
  const [strokeColor, setStrokeColor] = useState('#EAE2D7');
  const [fillColor, setFillColor] = useState('#FEF0DC66');
  const [done, setDone] = useState(false);

  const doneModules_ids = userHistory.map(history => history?.module?.id);

  const adjustModuleColor = () => {
    if (doneModules_ids.includes(module.module.id)) {
      setStrokeColor('#51B070');
      setFillColor('#DDF4ED');
      setDone(true);
    }
  };

  useEffect(() => {
    adjustModuleColor();
  }, [doneModules_ids.length]);

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
        <View style={styles.iconContainer}>
          <Image source={lock} style={styles.imageLock} />
        </View>
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
  imageLock: {},
  imageValidate: {
    position: 'absolute',
    top: 45,
    left: 45,
  },
  iconContainer: {
    position: 'absolute',
    bottom: -100,
    left: 60,
    backgroundColor: '#EAE2D7',
    padding: 4,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Badge;
