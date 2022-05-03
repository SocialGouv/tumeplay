import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Container from '../components/global/Container';
import Condom from '../components/Journey/Condom';
import Title from '../components/Title';
import config from '../../config';
import ThemePicker from '../components/Journey/ThemePicker';
import AppContext from '../../AppContext';
import CircleList from 'react-native-circle-list';
import {SvgXml} from 'react-native-svg';

const Journey2 = () => {
  const {thematiques} = useContext(AppContext);
  //the CircleList package require to have an array with a minimum of 12 elements to work properly. So we duplicate the data to fit the requirements
  const data = [...thematiques, ...thematiques];

  const _keyExtractor = item => (item?.id ? item?.id : Math.random());

  const _renderItem = ({item, index}) => (
    <ThemePicker theme={item} index={index} />
  );

  const xml = `
   <svg width="157" height="336" viewBox="0 0 157 336" fill="none">
        <path
          d="M86.8232 315.781L159.424 335.292C164.506 336.658 169.5 332.829 169.5 327.566L169.5 8.43378C169.5 3.17111 164.506 -0.657929 159.424 0.707885L86.8232 20.2186C85.4651 20.5835 84.2272 21.3 83.2343 22.2959L24.22 81.4843C23.2299 82.4773 22.5182 83.7131 22.1563 85.0679L0.551651 165.935C0.190216 167.288 0.190216 168.712 0.55165 170.065L22.1562 250.932C22.5182 252.287 23.2299 253.523 24.22 254.516L83.2342 313.704C84.2272 314.7 85.4651 315.416 86.8232 315.781Z"
          fill="#F7EFE6"
        />
      </svg>
  `;

  const handleInitPosition = () => {};

  useEffect(() => {
    handleInitPosition(3);
  }, []);

  return (
    <Container style={styles.container}>
      <Title title="Ton parcours" />
      <View style={styles.wheel}>
        <CircleList
          containerStyle={{height: '100%'}}
          data={data}
          keyExtractor={_keyExtractor}
          elementCount={13}
          selectedItemScale={1}
          renderItem={_renderItem}
          radius={config.deviceWidth / 1.7}
          swipeSpeedMultiplier={35}
          visiblityPadding={0}
          scrollToIndex={3}
          onScroll={e => console.log(e)}
          style={[styles.wheel]}
        />
      </View>
      <SvgXml xml={xml} width="50%" height="50%" style={styles.image} />
      <Condom style={styles.condom} />
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: config.deviceHeight / 3.5,
    zIndex: -1,
    right: 0,
  },
  wheel: {
    transform: [{rotate: '270deg'}],
    zIndex: 1,
    position: 'absolute',
    left: 0,
    top: config.deviceHeight / 2 - config.deviceWidth / 1,
    width: config.deviceHeight * 1.15,
    height: config.deviceWidth * 2,
    backgroundColor: 'transparent',
  },
  condom: {
    position: 'relative',
    top: config.deviceHeight / 4,
    right: -15,
    zIndex: 2,
  },
});

export default Journey2;
