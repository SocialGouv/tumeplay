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
          module_id: module?.id,
          module_title: module.title,
          questions: module?.questionsArray,
          theme: {
            title: module?.thematique?.title,
            color: module?.thematique?.color,
            image: module?.thematique?.image,
          },
          clearModuleData: true,
          retry: status === 'done',
        })
      }>
      <Svg style={styles.svgContainer}>
        <Polygon
          points="45,0 75,20 75,55 45,75 15,55 15,20"
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
    width: 80,
    height: 80,
    marginVertical: 10,
    marginRight: 10,
  },
  imageLock: {},
  imageValidate: {
    position: 'absolute',
    top: 45,
    left: 30,
  },
  imageTodo: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 29,
    left: 25,
  },
  iconContainer: {
    position: 'absolute',
    bottom: -80,
    left: 50,
    backgroundColor: '#EAE2D7',
    padding: 4,
    borderRadius: 50,
    width: 25,
    height: 25,
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
