import {Animated, Easing, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Container from './Container';
import logo from '../../assets/LOGO_TMP.png';

const Loader = () => {
  let opacity = new Animated.Value(0);

  const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2500,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.image,
    {
      opacity,
      width: size,
      height: size,
    },
  ];

  useEffect(() => {
    animate(Easing.bounce);
  }, []);

  return (
    <Container style={styles.container}>
      <Animated.View style={animatedStyles}>
        <Image source={logo} style={styles.image} />
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 80,
    height: 80,
  },
});

export default Loader;
