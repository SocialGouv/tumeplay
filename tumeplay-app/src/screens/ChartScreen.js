import React from 'react';

import {View, Text, ScrollView} from 'react-native';

import Colors from '../styles/Color';
import autoScrollToTop from '../hooks/autoScrollToTop';
import UnorderedListRow from './components/global/UnorderedListRow';
import TextLink from './components/global/TextLink';
import Table from './components/global/Table';
import TableCell from './components/global/TableCell';
import TableRow from './components/global/TableRow';

export default function ChartScreen(props) {
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
      fontSize: 22,
      lineHeight: 25,
      marginTop: 15,
      marginBottom: 15,
      paddingBottom: 0,
      flex: 2,
    },
    smallTitle: {
      color: Colors.secondaryText,
      fontFamily: Colors.appTitleFont,
      fontSize: 18,
      lineHeight: 25,
      marginTop: 15,
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
        <Text style={contentStyle.title}>Tumeplay</Text>

        <Text style={contentStyle.text}>
          Cette application est une initiative du Ministère de la Santé et des
          Solidarités, il s&apos;agit de la{' '}
          <TextLink
            targetUrl={
              'https://www.gouvernement.fr/sites/default/files/contenu/piece-jointe/2018/03/dossier_de_presse_-_priorite_prevention_rester_en_bonne_sante_tout_au_long_de_sa_vie.pdf'
            }>
            Mesure n°9 du Plan national de Santé publique.
          </TextLink>
          {'\n'}
          {'\n'}
          Elle est portée par 3 Agences régionales de santé (ARS) pilotes :
          {'\n'}
          <UnorderedListRow>ARS Guyane</UnorderedListRow>
          {'\n'}
          <UnorderedListRow>ARS Ile-de-France</UnorderedListRow>
          {'\n'}
          <UnorderedListRow>ARS Nouvelle-Aquitaine</UnorderedListRow>
          {'\n'}
          {'\n'}
          La plateforme est réalisée par la{' '}
          <TextLink targetUrl={'https://incubateur.social.gouv.fr/'}>
            Fabrique numérique des Ministères sociaux
          </TextLink>
          .
        </Text>

        <Text style={contentStyle.subTitle}>
          Traitement des données à caractère personnel
        </Text>
        <Text style={contentStyle.text}>
          <UnorderedListRow>
            TumePlay enregistre les informations à caractère personnel
            indispensables à ses fonctionnalités.
          </UnorderedListRow>
          {'\n'}
          <UnorderedListRow>
            Les données relatives aux réponses apportées aux différents quiz
            sont anonymisées. Elles sont stockées le temps de la session
            directement sur l&apos;appareil de l&apos;utilisateur.
          </UnorderedListRow>
          {'\n'}
          <UnorderedListRow>
            Les Utilisateurs pour commander l’une des boites proposées – qui
            contiennent différents outils de prévention – sont amenés à donner
            des informations relatives à leur adresse et coordonnées. Ces
            données ne sont pas stockées avec les informations relatives à votre
            téléphone.
          </UnorderedListRow>
          {'\n'}
          {'\n'}
          Nous nous engageons à ne jamais céder ces informations à des tiers.
          {'\n'}
          {'\n'}
          Vous avez un droit d&apos;accès, de rectification et de suppression de
          vos données. Pour les exercer, faites-nous parvenir une demande en
          précisant la date et l&apos;heure précise de la requête - ces éléments
          sont indispensables pour nous permettre de retrouver votre recherche -
          par voie électronique à l&apos;adresse suivante :{' '}
          <TextLink targetUrl={'mailto:info.tumeplay@fabrique.social.gouv.fr'}>
            info.tumeplay@fabrique.social.gouv.fr
          </TextLink>{' '}
          ou par voie postale :{'\n'}
          Direction du Numérique des ministères sociaux{'\n'}
          39-43 Quai André Citroën{'\n'}
          75015 PARIS
        </Text>

        <Text style={contentStyle.subTitle}>Finalité</Text>
        <Text style={contentStyle.text}>
          L&apos;outil numérique peut collecter des données à caractère
          personnelles, pour les finalités suivantes :
          <UnorderedListRow>
            Améliorer les connaissances des jeunes ;
          </UnorderedListRow>
          {'\n'}
          <UnorderedListRow>
            Encourager des comportements responsables.
          </UnorderedListRow>
        </Text>

        <Text style={contentStyle.subTitle}>Durée de conservation</Text>
        <Text style={contentStyle.text}>
          Les données sont conservées pendant le délai d&apos;envoi du produit
          commandé.
        </Text>

        <Text style={contentStyle.subTitle}>Sous-traitants</Text>
        <Text style={contentStyle.text}>
          Certaines des données sont envoyées à des sous-traitants pour réaliser
          certaines missions. Le responsable de traitement s&apos;est assuré de
          la mise en œuvre par ses sous-traitants de garanties adéquates et du
          respect de conditions strictes de confidentialité, d&apos;usage et de
          protection des données.
          {'\n'}
          {'\n'}
          <Table>
            <TableRow>
              <TableCell>
                <Text style={contentStyle.text}>Partenaire</Text>
              </TableCell>
              <TableCell>
                <Text style={contentStyle.text}>Pays{'\n'}destinataire</Text>
              </TableCell>
              <TableCell>
                <Text style={contentStyle.text}>Traitement réalisé</Text>
              </TableCell>
              <TableCell>
                <Text style={contentStyle.text}>Garanties</Text>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Text style={contentStyle.text}>OVH Cloud</Text>
              </TableCell>
              <TableCell>
                <Text style={contentStyle.text}>France</Text>
              </TableCell>
              <TableCell>
                <Text style={contentStyle.text}>Hébergement</Text>
              </TableCell>
              <TableCell>
                <TextLink
                  targetUrl={
                    'https://privacy.microsoft.com/fr-fr/privacystatement'
                  }>
                  Privacy Microsoft
                </TextLink>
              </TableCell>
            </TableRow>
          </Table>
        </Text>

        <Text style={contentStyle.subTitle}>Cookies</Text>
        <Text style={contentStyle.text}>
          Un cookie est un fichier déposé sur votre terminal lors de la visite
          d&apos;un site. Il a pour but de collecter des informations relatives
          à votre navigation et de vous adresser des services adaptés à votre
          terminal (ordinateur, mobile ou tablette).
          {'\n'}
          {'\n'}
          Le site dépose des cookies de mesure d&apos;audience (nombre de
          visites, pages consultées), respectant les conditions d&apos;exemption
          du consentement de l&apos;internaute définies par la recommandation
          « Cookies » de la Commission nationale informatique et libertés
          (CNIL). Cela signifie, notamment, que ces cookies ne servent qu&apos;à
          la production de statistiques anonymes et ne permettent pas de suivre
          la navigation de l&apos;internaute sur d&apos;autres sites.
          {'\n'}
          {'\n'}
          Il convient d&apos;indiquer que :
          {'\n'}
          <UnorderedListRow>
            Les données collectées ne sont pas recoupées avec d&apos;autres
            traitements
          </UnorderedListRow>
          {'\n'}
          <UnorderedListRow>
            Les cookies ne permettent pas de suivre la navigation de
            l&apos;internaute sur d&apos;autres sites.
          </UnorderedListRow>
          {'\n'}
          {'\n'}
          En application de l&apos;article 5(3) de la directive 2002/58/CE
          modifiée concernant le traitement des données à caractère personnel et
          la protection de la vie privée dans le secteur des communications
          électroniques, transposée à l&apos;article 82 de la loi n°78-17 du 6
          janvier 1978 relative à l&apos;informatique, aux fichiers et aux
          libertés, les traceurs ou cookies suivent deux régimes distincts.
          {'\n'}
          {'\n'}
          Les cookies strictement nécessaires au service ou ayant pour finalité
          exclusive de faciliter la communication par voie électronique sont
          dispensés de consentement préalable au titre de l’article 82 de la loi
          n°78-17 du 6 janvier 1978.
          {'\n'}
          {'\n'}
          Les cookies n’étant pas strictement nécessaires au service ou n’ayant
          pas pour finalité exclusive de faciliter la communication par voie
          électronique doivent être consenti par l’utilisateur.
          {'\n'}
          {'\n'}
          Ce consentement de la personne concernée pour une ou plusieurs
          finalités spécifiques constitue une base légale au sens du RGPD et
          doit être entendu au sens de l&apos;article 6-a du Règlement (UE)
          2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif
          à la protection des personnes physiques à l&apos;égard du traitement
          des données à caractère personnel et à la libre circulation de ces
          données.
        </Text>

        <Text style={contentStyle.subTitle}>Modifier les réglages</Text>
        <Text style={contentStyle.text}>
          À tout moment, vous pouvez refuser l’utilisation des cookies et
          désactiver le dépôt sur votre ordinateur en utilisant la fonction
          dédiée de votre navigateur (fonction disponible notamment sur
          Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox, Apple
          Safari et Opera).
        </Text>
        <Text style={contentStyle.text}>
          Pour aller plus loin, vous pouvez consulter les fiches proposées par
          la Commission Nationale de l&apos;Informatique et des Libertés (CNIL)
          :{'\n'}
          <UnorderedListRow>
            <TextLink
              targetUrl={
                'https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi'
              }>
              Cookies & traceurs : que dit la loi ?
            </TextLink>
          </UnorderedListRow>
          {'\n'}
          <UnorderedListRow>
            <TextLink
              targetUrl={
                'https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser'
              }>
              Cookies : les outils pour les maîtriser
            </TextLink>
          </UnorderedListRow>
        </Text>
      </ScrollView>
    </View>
  );
}
