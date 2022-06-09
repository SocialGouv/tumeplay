import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import condom_full from '../../../assets/capote.png';
import condom_empty from '../../../assets/capote_grise.png';
import config from '../../../../config';

const ModuleDifficultyBadge = ({level}) => {
  const images = [
    <Image source={condom_full} style={styles.condom} key={0} />,
    <Image source={condom_full} style={styles.condom} key={1} />,
    <Image source={condom_full} style={styles.condom} key={2} />,
    <Image source={condom_full} style={styles.condom} key={3} />,
    <Image source={condom_full} style={styles.condom} key={4} />,
  ];

  const condom_to_display = images.map((image, index) => {
    if (index < level) {
      return image;
    }
    return <Image source={condom_empty} style={styles.condom} key={index} />;
  });

  return <View style={styles.condom_container}>{condom_to_display}</View>;
};

const styles = StyleSheet.create({
  condom_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: config.deviceWidth * 0.26,
  },
  condom: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
});

export default ModuleDifficultyBadge;
