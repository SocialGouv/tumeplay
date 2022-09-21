import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Text from '../components/Text';
import LevelPointsIndicator from '../components/LevelPointsIndicator';
import Title from '../components/Title';
import {Fonts} from '../styles/Style';
import Button from '../components/Button';
import {useQuery} from '@apollo/client';
import {GET_FRESH_CONTENTS} from '../services/api/contents';
import FreshContentCard from '../components/Contents/FreshContentCard';
import AppContext from '../../AppContext';
import Container from '../components/global/Container';
import Carousel from 'react-native-snap-carousel';
import config from '../../config';
import {WebView} from 'react-native-webview';
import Event from '../services/api/matomo';
import handleRedirection from '../services/handleRedirection';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomePage = ({navigation}) => {
  const {user} = useContext(AppContext);
  const [tiktokHtmls, setTiktokHtmls] = useState([]);
  const tiktokIds = [
    '7058603040588188933',
    '7062743680125291781',
    '7063474262190886150',
    '7061175159851371782',
  ];
  const [freshContents, setFreshContents] = useState([]);
  const freshContentsIds = freshContents?.map(content => content.id);
  const [randomLevel, setRandomLevel] = useState();
  const {data, loading} = useQuery(GET_FRESH_CONTENTS, {
    variables: {
      level: randomLevel,
    },
  });

  useEffect(() => {
    if (data && !loading) {
      setFreshContents(
        data.contents.map(c => {
          let tmpContent = JSON.parse(JSON.stringify(c));
          tmpContent.image = {
            url: tmpContent.etiquette?.image?.url
              ? tmpContent.etiquette?.image?.url
              : tmpContent.image?.url,
          };
          return tmpContent;
        }),
      );
    }
  }, [data, loading, randomLevel]);

  const renderItem = ({item}) => {
    return (
      <FreshContentCard
        content={item}
        navigation={navigation}
        freshContentsIds={freshContentsIds}
      />
    );
  };

  const video = ({item}) => {
    return (
      <WebView
        //   injectedJavaScript={`let container = document.getElementsByClassName('tiktokContainer');
        // container.style.display = 'block'`}
        style={styles.webview}
        javaScriptEnabled={true}
        // scalesPageToFit={true}
        // viewportContent={`width=${
        //   Dimensions.get('window').width
        // }, user-scalable=yes`}
        // onShouldStartLoadWithRequest={this.openExternalLink}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabledWithZoomedin={false}
        allowsFullscreenVideo={false}
        allowsInlineMediaPlayback={false}
        androidHardwareAccelerationDisabled={false}
        mixedContentMode="always"
        source={{
          baseUrl: 'https://www.tiktok.com',
          html: item.html,
        }}
      />
    );
  };
  useEffect(() => {
    setRandomLevel(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all(
      tiktokIds.map(id => {
        return fetch(
          'https://www.tiktok.com/oembed?url=https://www.tiktok.com/@tu.me.play/video/' +
            id,
        ).then(res => res.json());
      }),
    ).then(values => {
      setTiktokHtmls(
        values.map(value => {
          value.html = value.html.replace(
            /style="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/gi,
            'style="width: 330px; margin: 0; background-color: #FBF7F2"',
          );
          value.html = value.html.replace(
            'class="tiktok-embed"',
            'class="tiktok-embed tiktokContainer"',
          );
          const rx = new RegExp(
            '<a target="_blank" title="♬[\\d\\D]*?/a>',
            'g',
          );
          value.html = value.html.replace(rx, '');
          return value;
        }),
      );
    });
  };

  return (
    <ScrollView>
      <Container background={null} style={styles.container}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <Icon name="search" size={30} />
        </TouchableOpacity>
        <Title />
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() =>
            navigation.navigate('Menu', {
              user: user,
            })
          }>
          <Icon name="more-horiz" size={30} />
          <Text>Menu</Text>
        </TouchableOpacity>
        <LevelPointsIndicator
          style={styles.levelIndicator}
          onPress={() => navigation.navigate('Parcours')}
        />
        <View style={styles.middleContent}>
          <Text style={styles.text}>
            Prêt.e à tester tes connaissances sur la sexualité ?
          </Text>
          <Button
            text="Jouer"
            size="medium"
            special
            left
            onPress={() => {
              navigation.navigate('GameChoice');
            }}
            icon
          />
        </View>
        <Text style={styles.subtitle}> Derniers contenus ajoutés</Text>
        <View style={styles.carouselContainer}>
          <Carousel
            data={freshContents}
            renderItem={renderItem}
            sliderWidth={config.deviceWidth}
            itemWidth={170}
            keyExtractor={item => item.id}
            activeSlideAlignment={'start'}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
        <Text style={styles.subtitle}> Dernières vidéos TikTok</Text>
        <View style={styles.carouselContainer}>
          <Carousel
            data={tiktokHtmls}
            renderItem={video}
            sliderWidth={config.deviceWidth}
            itemWidth={200}
            keyExtractor={item => item.title}
            activeSlideAlignment={'start'}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#FBF7F2',
  },
  levelIndicator: {
    marginVertical: 20,
  },
  middleContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: config.deviceWidth <= 375 ? 30 : 30,
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.strongText,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 30,
    paddingBottom: 12,
  },
  carouselContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 14,
    backgroundColor: '#FBF7F2',
  },
  subtitle: {
    fontFamily: Fonts.subtitle,
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 12,
    fontSize: 18,
    marginHorizontal: Dimensions.get('window').width > 375 ? 15 : 10,
  },
  webview: {
    height: 440,
    width: 520,
    backgroundColor: '#FBF7F2',
  },
  menuButton: {
    position: 'absolute',
    top: config.deviceHeight * 0.06,
    right: 20,
  },
  searchButton: {
    position: 'absolute',
    top: config.deviceHeight * 0.06,
    left: 20,
    width: 50,
    height: 50,
  },
});

export default HomePage;
