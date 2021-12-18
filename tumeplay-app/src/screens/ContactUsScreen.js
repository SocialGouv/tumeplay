import React from 'react';

import {View, Text, ScrollView} from 'react-native';

import Colors from '../styles/Color';
import autoScrollToTop from '../hooks/autoScrollToTop';
import TextLink from './components/global/TextLink';

export default function ContactUsScreen(props) {
  autoScrollToTop(props);

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
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        padding: 15,
        paddingBottom: 30,
      }}>
      <ScrollView style={{flex: 1}}>
        <Text style={contentStyle.title}>Nous contacter</Text>

        <Text style={contentStyle.text}>
          Tu as une question, une remarque, une suggestion (ou un message de
          soutien!) à nous envoyer ? Écris-nous à{' '}
          <TextLink targetUrl={'mailto:info.tumeplay@fabrique.social.gouv.fr'}>
            info.tumeplay@fabrique.social.gouv.fr
          </TextLink>{' '}
          !
        </Text>
        <Text style={contentStyle.text}>
          Tu as commandé une de nos box ? Réponds à notre questionnaire de
          satisfaction{' '}
          <TextLink
            targetUrl={
              'https://forms.sbc33.com/5d669ec8b95cee56b85dc3fc/-k5Bze2GRnugkjo682ZgDA/RbQOxbUWTKeoVQLh8RZseA/form.html'
            }>
            ici
          </TextLink>
          . Tes retours sont importants pour qu&apos;on s&apos;améliore :)
        </Text>
      </ScrollView>
    </View>
  );
}
