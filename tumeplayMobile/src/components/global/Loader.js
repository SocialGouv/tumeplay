import {Animated, Easing, Image, ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Container from './Container';
import logo from '../../assets/LOGO_TMP.png';
import bgImage from '../../assets/LoaderBG.png'

const Loader = () => {
  let opacity = new Animated.Value(0);

  const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220],
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
		<ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
			<Container style={styles.container}>
				<Animated.View style={animatedStyles}>
					<Image source={logo} style={styles.image} />
				</Animated.View>
			</Container>
		</ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
		alignItems: 'center',
  },
	bgImage: {
    flex: 1,
    justifyContent: 'center'
	},
  image: {
    width: 220,
    height: 220,
		alignSelf: 'center',
  },
});

export default Loader;
