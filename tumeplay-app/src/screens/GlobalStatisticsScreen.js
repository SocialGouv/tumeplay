import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import Colors from '../styles/Color';
import autoScrollToTop from '../hooks/autoScrollToTop';
import Styles from '../styles/Styles';

const GlobalStatisticsScreen = props => {
  autoScrollToTop(props);

  const instaLink = 'https://www.instagram.com/tumeplay';
  const instaCountLink = 'https://www.instagram.com/tumeplay/?__a=1';
  const fullStar = require('../assets/pictures/full-star.png');
  const halfStar = require('../assets/pictures/half-star.png');
  const instagram = require('../assets/pictures/instagram.png');

  const matomoLink =
    'https://matomo.fabrique.social.gouv.fr/index.php?idSite=21&rec1';

  // const getMatomoinfos = async () => {
  //   await fetch(matomoLink).then(data =>
  //     console.log(data.json()),
  //   );
  // };

  //Instagram followers API Call
  // const retrieveFollowers = async () => {
  //   await fetch(instaCountLink).then(data => console.log(data.json()));
  // };

  // useEffect(() => {
  //   retrieveFollowers();
  // }, []);

  // useEffect(() => {
  //   getMatomoinfos();
  // }, [getMatomoinfos]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        padding: 15,
        paddingBottom: 30,
      }}>
      <ScrollView style={{flex: 1}}>
        <View>
          <Text
            style={[
              Styles.labelText,
              Styles.textCenter,
              contentStyle.middleTitle,
              {marginTop: 10},
            ]}>
            La Vie de l&apos;Application
          </Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={[{flex: 0.5, padding: 12}, Styles.textCenter]}>
            <Text style={[contentStyle.subTitle, contentStyle.colorOrange]}>
              Utilisateurs
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text
                style={[
                  contentStyle.subTitle,
                  contentStyle.colorOrange,
                  {padding: 10, paddingTop: 0, marginTop: 0},
                ]}>
                172{'\r\n'}cette semaine
              </Text>
              <Text
                style={[
                  contentStyle.subTitle,
                  contentStyle.colorOrange,
                  {padding: 10, paddingTop: 0, marginTop: 0},
                ]}>
                6480{'\r\n'}en tout
              </Text>
            </View>
          </View>
          <View style={[{flex: 0.5, padding: 12}, Styles.textCenter]}>
            <Text style={[contentStyle.subTitle, contentStyle.colorRed]}>
              Box distribuées
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text
                style={[
                  contentStyle.subTitle,
                  contentStyle.colorRed,
                  {padding: 10, paddingTop: 0, marginTop: 0},
                ]}>
                0{'\r\n'}cette semaine
              </Text>
              <Text
                style={[
                  contentStyle.subTitle,
                  contentStyle.colorRed,
                  {padding: 10, paddingTop: 0, marginTop: 0},
                ]}>
                470{'\r\n'}en tout
              </Text>
            </View>
          </View>
        </View>

        <View style={[{flex: 1}, Styles.textCenter, {marginTop: 5}]}>
          <Text
            style={[
              Styles.labelText,
              contentStyle.colorRed,
              contentStyle.middleTitle,
              {marginBottom: 5},
            ]}>
            Ce que vous en pensez
          </Text>
        </View>
        <View style={[{flex: 1}, Styles.textCenter]}>
          <View
            style={[
              {flex: 1, flexDirection: 'row', alignSelf: 'center'},
              Styles.textCenter,
            ]}>
            <Image source={fullStar} style={contentStyle.star} />
            <Image source={fullStar} style={contentStyle.star} />
            <Image source={fullStar} style={contentStyle.star} />
            <Image source={halfStar} style={contentStyle.star} />
          </View>
          <Text
            style={[
              contentStyle.subTitle,
              {
                textTransform: 'uppercase',
                fontSize: 12,
                fontFamily: Colors.textFont,
                color: '#F1C232',
              },
            ]}>
            de satisfaction globale sur l&apos;ensemble du service
          </Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={[{flex: 0.5, padding: 12}, Styles.textCenter]}>
            <Text
              style={[
                Styles.labelText,
                contentStyle.colorRed,
                contentStyle.middleTitle,
                {
                  marginTop: 10,
                  fontSize: 20,
                  marginBottom: 5,
                  fontStyle: 'italic',
                },
              ]}>
              Notes de satisfaction box
            </Text>
            <View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    contentStyle.subTitle,
                    contentStyle.colorRed,
                    {flex: 0.2, textAlign: 'left'},
                  ]}>
                  3.5/4
                </Text>
                <Text
                  style={[
                    contentStyle.subTitle,
                    contentStyle.colorRed,
                    {flex: 0.8, textAlign: 'left'},
                  ]}>
                  Box "Découvre ton corps"
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    contentStyle.subTitle,
                    contentStyle.colorOrange,
                    {flex: 0.2, textAlign: 'left'},
                  ]}>
                  3.6/4
                </Text>
                <Text
                  style={[
                    contentStyle.subTitle,
                    contentStyle.colorOrange,
                    {flex: 0.8, textAlign: 'left'},
                  ]}>
                  Box "Les premières fois"
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    contentStyle.subTitle,
                    {flex: 0.2, textAlign: 'left'},
                  ]}>
                  3.6/4
                </Text>
                <Text
                  style={[
                    contentStyle.subTitle,
                    {flex: 0.8, textAlign: 'left'},
                  ]}>
                  Box "Explore ta sexualité"
                </Text>
              </View>
            </View>
          </View>

          <View style={[{flex: 0.5, padding: 12}, Styles.textCenter]}>
            <Text
              style={[
                Styles.labelText,
                contentStyle.colorRed,
                contentStyle.middleTitle,
                {
                  marginTop: 10,
                  fontSize: 20,
                  marginBottom: 5,
                  fontStyle: 'italic',
                },
              ]}>
              Recommandation à une amie
            </Text>
            <View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    contentStyle.subTitle,
                    contentStyle.colorRed,
                    {flex: 0.2, textAlign: 'left'},
                  ]}>
                  3.5/4
                </Text>
                <Text
                  style={[
                    contentStyle.subTitle,
                    contentStyle.colorRed,
                    {flex: 0.8, textAlign: 'left'},
                  ]}>
                  Box "Découvre ton corps"
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    contentStyle.subTitle,
                    contentStyle.colorOrange,
                    {flex: 0.2, textAlign: 'left'},
                  ]}>
                  3.7/4
                </Text>
                <Text
                  style={[
                    contentStyle.subTitle,
                    contentStyle.colorOrange,
                    {flex: 0.8, textAlign: 'left'},
                  ]}>
                  Box "Les premières fois"
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    contentStyle.subTitle,
                    {flex: 0.2, textAlign: 'left'},
                  ]}>
                  3.6/4
                </Text>
                <Text
                  style={[
                    contentStyle.subTitle,
                    {flex: 0.8, textAlign: 'left'},
                  ]}>
                  Box "Explore ta sexualité"
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text
            style={[
              Styles.labelText,
              contentStyle.colorRed,
              Styles.textCenter,
              contentStyle.middleTitle,
              {marginBottom: 5},
            ]}>
            Vos précieux témoignages
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={[
              Styles.labelText,
              contentStyle.testimony,
              {flex: 0.5, flexDirection: 'column', padding: 15},
            ]}>
            <Text style={[Styles.labelText, contentStyle.testimony]}>
              "La box est très complète pour pouvoir{' '}
              <Text
                style={[
                  Styles.labelText,
                  contentStyle.testimony,
                  {fontWeight: 'bold', padding: 0},
                ]}>
                tester pleins de choses
              </Text>
              "
            </Text>
            <Text style={[Styles.labelText, contentStyle.testimony]}>
              "J'ai connu des choses que{' '}
              <Text
                style={[
                  Styles.labelText,
                  contentStyle.testimony,
                  {fontWeight: 'bold', padding: 0},
                ]}>
                je ne connaissais pas
              </Text>
              "
            </Text>
          </View>
          <View style={{flex: 0.5, flexDirection: 'column', padding: 15}}>
            <Text style={[Styles.labelText, contentStyle.testimony]}>
              "Les jeux sont sympas et on y{' '}
              <Text
                style={[
                  Styles.labelText,
                  contentStyle.testimony,
                  {fontWeight: 'bold', padding: 0},
                ]}>
                apprends beaucoup
              </Text>{' '}
              de choses"
            </Text>
            <Text style={[Styles.labelText, contentStyle.testimony]}>
              "Les produits sont{' '}
              <Text
                style={[
                  Styles.labelText,
                  contentStyle.testimony,
                  {fontWeight: 'bold', padding: 0},
                ]}>
                géniaux
              </Text>
              "
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={[
              Styles.labelText,
              contentStyle.colorRed,
              Styles.textCenter,
              contentStyle.middleTitle,
              {marginBottom: 5, marginTop: 20},
            ]}>
            Rejoignez-nous sur Instagram !
          </Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              flex: 1,
              textAlign: 'right',
            }}>
            <Text
              style={[
                contentStyle.subTitle,
                {marginBottom: 5, letterSpacing: 3},
              ]}>
              94 PUBLICATIONS
            </Text>
          </View>
          <View
            style={[
              {
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                flex: 0.4,
              },
              Styles.textCenter,
            ]}>
            <TouchableWithoutFeedback>
              <Text href={instaLink} accessibilityRole="link" target="_blank">
                <Image source={instagram} style={contentStyle.instagram} />
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              flex: 1,
              textAlign: 'left',
            }}>
            <Text
              style={[
                contentStyle.subTitle,
                {marginBottom: 5, letterSpacing: 3},
              ]}>
              1.007 ABONNÉES
            </Text>
          </View>
        </View>

        <View style={{flex: 1, marginTop: 15, textAlign: 'center'}}>
          <TouchableWithoutFeedback>
            <Text
              style={[
                Styles.labelText,
                {
                  marginBottom: 5,
                  fontSize: 20,
                  fontWeight: 200,
                  color: '#FFFFFF',
                  fontFamily: Colors.textFont,
                },
              ]}
              href={instaLink}
              accessibilityRole="link"
              target="_blank">
              @tumeplay
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
};

const contentStyle = {
  title: {
    color: Colors.secondaryText,
    fontFamily: Colors.appTitleFont,
    fontSize: 30,
    lineHeight: 34,
    marginBottom: 20,
    paddingBottom: 0,
    flex: 2,
  },
  subTitle: {
    color: Colors.secondaryText,
    fontFamily: Colors.appTitleFont,
    fontSize: 20,
    lineHeight: 25,
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 0,
    flex: 2,
  },
  text: {
    color: Colors.secondaryText,
    fontFamily: Colors.textFont,
    fontSize: 14,
    marginBottom: 10,
    paddingBottom: 0,
    marginTop: 0,
    paddingTop: 0,
    textAlign: 'left',
    flex: 1,
  },
  colorRed: {
    color: Colors.secondaryButton,
  },
  colorOrange: {
    color: '#FF7228',
  },
  middleTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontFamily: Colors.titleCard,
    marginTop: 40,
  },
  testimony: {
    color: '#FFFFFF',
    marginBottom: 15,
    padding: 15,
    fontSize: 20,
    fontStyle: 'italic',
    fontFamily: Colors.titleCard,
    fontWeight: 300,
  },
  star: {
    width: 30,
    height: 30,
  },
  instagram: {
    width: 70,
    height: 70,
    textAlign: 'center',
  },
};

export default GlobalStatisticsScreen;
