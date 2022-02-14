import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
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
import Event from '../services/api/matomo';
import {WebView} from 'react-native-webview';

const HomePage = ({navigation}) => {
  //here we calculate the number of point from the user
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
  const {data, loading} = useQuery(GET_FRESH_CONTENTS, {
    variables: {
      level: user.level,
    },
  });

  useEffect(() => {
    if (data && !loading) {
      setFreshContents(data.contents);
    }
  }, [data, loading]);

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
            "style=\"width: 330px; margin: 0; background-color: '#FBF7F2'",
          );
          return value;
        }),
      );
    });
  };

  return (
    <ScrollView>
      <Container background={null} style={styles.container}>
        <Title />
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
              Event.playEvent();
                navigation.navigate('Jouer', {
                module_id: user.next_module,
                questions: user.nextQuestions,
                clearModuleData: true,
              })
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
    backgroundColor: '#FF7F2',
  },
});

export default HomePage;
