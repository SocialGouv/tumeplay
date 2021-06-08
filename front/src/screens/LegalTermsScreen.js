import React from 'react';

import {View, Text, ScrollView} from 'react-native';

import Colors from '../styles/Color';
import autoScrollToTop from '../hooks/autoScrollToTop';

export default function LegalTermsScreen(props) {
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
        <Text style={contentStyle.title}>Mentions Légales</Text>

        <Text style={contentStyle.subTitle}>Éditeur de la plateforme</Text>
        <Text style={contentStyle.text}>
          La Plateforme est éditée par :{"\n"}{"\n"}
          Fabrique des Ministères sociaux{"\n"}
          Tour Mirabeau{"\n"}
          39-43 Quai André Citroën{"\n"}
          75015 PARIS{"\n"}
        </Text>

        <Text style={contentStyle.subTitle}>Directeur de la publication</Text>
        <Text style={contentStyle.text}>
          Monsieur Jérôme SALOMON - Directeur général de la Santé
        </Text>

        <Text style={contentStyle.subTitle}>Hébergement de la plateforme</Text>
        <Text style={contentStyle.text}>
          Cette plateforme est hébergé par{"\n"}{"\n"}
          Microsoft France{"\n"}
          37 Quai du Président Roosevelt 92130{"\n"}
          ISSY-LES-MOULINEAUX
        </Text>
        
        <Text style={contentStyle.subTitle}>Accessibilité</Text>
        <Text style={contentStyle.text}>
          La conformité aux normes d&apos;accessibilité numérique est un objectif ultérieur mais nous tâchons de rendre la plateforme accessible à toutes et à tous.
        </Text>
        
        <Text style={contentStyle.subTitle}>Signaler un dysfonctionnement</Text>
        <Text style={contentStyle.text}>
          Si vous rencontrez un défaut d&apos;accessibilité vous empêchant d’accéder à un contenu ou une fonctionnalité de la plateforme, merci de nous en faire part.{"\n"}
		  Si vous n&apos;obtenez pas de réponse rapide de notre part, vous êtes en droit de faire parvenir vos doléances ou une demande de saisine au Défenseur des droits.
        </Text>
      </ScrollView>
    </View>
  );
}
