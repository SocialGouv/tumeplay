import React, {useState, useEffect} from 'react';
import Svg, {Polygon} from 'react-native-svg';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import lock from '../../assets/custom_images/Vector.png';
import check from '../../assets/Check.png';
import {useNavigation} from '@react-navigation/native';
import diceIcon from '../../assets/diceHexagon.png';
import gift from '../../assets/gift.png';

const Badge = props => {
  const navigation = useNavigation();
  const [strokeColor, setStrokeColor] = useState('#EAE2D7');
  const [fillColor, setFillColor] = useState('#FEF0DC66');
  const {module, status} = props;

  const adjustModuleColor = () => {
    if (status === 'done') {
      setStrokeColor('#51B070');
      setFillColor('#DDF4ED');
    } else if (status === 'todo') {
      setStrokeColor('#a690f5');
      setFillColor('#D3C8FB');
    }
  };

  useEffect(() => {
    adjustModuleColor();
  }, [module.status]);

  return (
    <TouchableOpacity
      disabled={status === 'locked'}
      onPress={() =>
        navigation.navigate('Jouer', {
          module_id: module?.module?.id,
          questions: module?.module?.questionsArray,
          clearModuleData: true,
          retry: status === 'done',
        })
      }>
      <Svg style={styles.svgContainer}>
        <Polygon
          points="50,0 95,25 95,50 95,75 50,100 10,75 10,25"
          stroke={strokeColor}
          strokeWidth="3"
          fill={fillColor}
          style={{zIndex: 1, position: 'relative'}}
        />
        {status === 'done' && (
          <Image source={check} style={styles.imageValidate} />
        )}
        {status === 'locked' && (
          <View style={styles.iconContainer}>
            <Image source={lock} style={styles.imageLock} />
          </View>
        )}
      </Svg>
      {module.reward && status !== 'done' && (
        <Image
          style={[styles.imageTodo, {opacity: status === 'todo' ? 1 : 0.3}]}
          source={gift}
        />
      )}
      {status === 'todo' && !module.reward && (
        <Image source={diceIcon} style={styles.imageTodo} size={30} />
      )}
    </TouchableOpacity>
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
  imageTodo: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 40,
    left: 41,
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
  rewardIcon: {
    position: 'absolute',
    right: 25,
    top: 15,
  },
});

export default Badge;
