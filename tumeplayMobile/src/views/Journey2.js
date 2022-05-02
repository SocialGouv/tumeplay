import React, {useContext} from 'react';
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
  const data = [...thematiques];

  const _keyExtractor = item => (item?.id ? item?.id : '');

  const _renderItem = ({item}) => <ThemePicker theme={item} />;

  const xml = `
   <svg width="157" height="336" viewBox="0 0 157 336" fill="none">
        <path
          d="M86.8232 315.781L159.424 335.292C164.506 336.658 169.5 332.829 169.5 327.566L169.5 8.43378C169.5 3.17111 164.506 -0.657929 159.424 0.707885L86.8232 20.2186C85.4651 20.5835 84.2272 21.3 83.2343 22.2959L24.22 81.4843C23.2299 82.4773 22.5182 83.7131 22.1563 85.0679L0.551651 165.935C0.190216 167.288 0.190216 168.712 0.55165 170.065L22.1562 250.932C22.5182 252.287 23.2299 253.523 24.22 254.516L83.2342 313.704C84.2272 314.7 85.4651 315.416 86.8232 315.781Z"
          fill="#F7EFE6"
        />
      </svg>
  `;

  return (
    <Container style={styles.container}>
      <Title title="Ton parcours" />
      <View
        style={{
          transform: [{rotate: '270deg'}],
          zIndex: 0,
          position: 'absolute',
          top: config.deviceHeight / 2 - config.deviceWidth / 2,
          width: config.deviceHeight,
          height: config.deviceWidth * 1.5,
        }}>
        <CircleList
          data={data}
          keyExtractor={_keyExtractor}
          elementCount={12}
          renderItem={_renderItem}
          radius={config.deviceWidth / 1.5}
          swipeSpeedMultiplier={30}
          style={[
            styles.wheel,
            {
              transform: [{rotate: '90deg'}],
            },
          ]}
        />
      </View>
      <SvgXml xml={xml} width="60%" height="60%" style={styles.image} />
      <Condom style={styles.condom} />
    </Container>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   position: 'relative',
  // },
  image: {
    position: 'absolute',
    top: config.deviceHeight / 3.8,
    zIndex: -1,
    right: 0,
  },
  wheel: {
    width: config.deviceWidth / 2,
    height: config.deviceHeight / 2,
    zIndex: 0,
    backgroundColor: '#F2F',
  },
  condom: {
    position: 'relative',
    top: 140,
    right: 0,
    zIndex: 0,
  },
});

export default Journey2;
