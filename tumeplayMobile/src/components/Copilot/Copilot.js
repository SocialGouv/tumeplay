import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useContext} from 'react';
import HomePage from '../../views/HomePage';
import {TourGuideZone, useTourGuideController} from 'rn-tourguide';
import config from '../../../config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import diceIcon from '../../assets/diceIcon.png';
import AppContext from '../../../AppContext';
import {Colors} from '../../styles/Style';
import {UPDATE_MOBILE_USER} from '../../services/api/mobile_users';
import {useMutation} from '@apollo/client';

const Copilot = props => {
  const {user, setUser, reloadUser} = useContext(AppContext);
  const {canStart, start, stop, eventEmitter} = useTourGuideController();

  useEffect(() => {
    if (canStart) {
      start();
    }
  }, [canStart]);

  const [updateUser] = useMutation(UPDATE_MOBILE_USER, {
    onError(error) {
      console.log('error on signup', error);
    },
    onCompleted() {
      reloadUser();
    },
  });

  const handleFinishTutorial = async () => {
    let tmpUser = {...user, has_followed_tutorial: true};
    await updateUser({
      variables: {
        first_name: tmpUser.first_name,
        isOnboarded: tmpUser.isOnboarded,
        isSignedUp: tmpUser.isSignedUp,
        isUnder25: tmpUser.isUnder25,
        ageRange: tmpUser.ageRange,
        region: tmpUser.region,
        has_followed_tutorial: tmpUser.has_followed_tutorial,
        user_id: tmpUser.user_id,
        id: tmpUser.id,
      },
    });
  };

  const handleOnStop = () => handleFinishTutorial();

  useEffect(() => {
    eventEmitter.on('stop', handleOnStop);
    return () => {
      eventEmitter.off('stop', handleOnStop);
    };
  }, []);

  const tourGuideElements = [
    {
      name: 'Accueil',
      zone: 1,
      shape: 'circle',
      component: (
        <Text style={[styles.text, {color: Colors.primary}]}>Accueil</Text>
      ),
      icon: <MaterialIcons name="home" size={25} color={Colors.primary} />,
      text: 'Retrouve sur l’écran d’accueil les derniers articles parus et les vidéos TikTok',
    },
    {
      name: 'Thematiques',
      zone: 2,
      shape: 'circle',
      component: <Text style={styles.text}>Posts</Text>,
      icon: <MaterialIcons name="import-contacts" size={25} color="black" />,
      text: 'Consulte l’ensemble de nos articles classés par thématiques',
    },
    {
      name: 'Jouer',
      zone: 3,
      shape: 'circle',
      component: <Text style={[styles.text, {paddingTop: 24}]}>Jouer</Text>,
      icon: <Image source={diceIcon} style={styles.diceIcon} />,
      text: 'Accède directement au jeu, réponds aux question et débloque l’accès aux kits',
    },
    {
      name: 'Parcours',
      zone: 4,
      shape: 'circle',
      component: <Text style={styles.text}>Parcours</Text>,
      icon: <MaterialIcons name="timeline" size={25} color="black" />,
      text: 'Observe ta progression dans le jeu et quel niveau te permet de débloquer un kit',
    },
    {
      name: 'Kits',
      zone: 5,
      shape: 'circle',
      component: <Text style={styles.text}>Kits</Text>,
      icon: <MaterialIcons name="card-giftcard" size={25} color="black" />,
      text: 'Et enfin, retrouve les kits que tu as débloqués et passe commande pour te faire livrer',
    },
  ];

  const displayTourGuideElements = tourGuideElements.map(element => {
    return (
      <TourGuideZone
        key={element.name}
        zone={element.zone}
        shape={element.shape}
        maskOffset={element.zone === 3 ? 12 : -10}
        text={element.text}
        tooltipBottomOffset={30}>
        <View style={styles.navItem}>
          {element.icon}
          {element.component}
        </View>
      </TourGuideZone>
    );
  });

  return (
    <View style={styles.container}>
      <HomePage />
      <View style={styles.tutorial}>{displayTourGuideElements}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  homePage: {
    zIndex: -1,
  },
  tutorial: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: config.deviceHeight * 0.09,
    backgroundColor: Colors.lightCorail,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: config.deviceHeight * 0.06,
    paddingTop: 10,
  },
  text: {
    fontSize: config.deviceWidth * 0.03,
  },
  diceIcon: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: -25,
  },
});

export default Copilot;
