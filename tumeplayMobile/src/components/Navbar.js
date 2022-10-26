import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../views/HomePage';
import Thematiques from '../views/Thematiques';
import Box from '../views/Box';
import {Colors} from '../styles/Style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppContext from '../../AppContext';
import diceIcon from '../assets/diceIcon.png';
import {Image, Alert} from 'react-native';
import Event from '../services/api/matomo';
import Journey2 from '../views/Journey2';
import GameChoice from '../views/GameChoice';

const Tab = createBottomTabNavigator();

const Navbar = ({navigation}) => {
  const {user} = useContext(AppContext);

  return (
    <Tab.Navigator
      initialRouteName="Accueil"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.black,
        tabBarItemStyle: {padding: 0},
        tabBarStyle: {
          position: 'relative',
          bottom: 0,
          backgroundColor: Colors.lightCorail,
        },
      })}>
      <Tab.Screen
        name="Accueil"
        component={HomePage}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
        navigation={navigation}
      />
      <Tab.Screen
        name="Contenus"
        component={Thematiques}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="import-contacts" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Jouer"
        component={GameChoice}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={{
                position: 'absolute',
                bottom: 7,
                width: 50,
                height: 50,
              }}
              source={diceIcon}
              color={color}
            />
          ),
        }}
        initialParams={{from: 'navbar'}}
      />
      <Tab.Screen
        name="Parcours"
        component={Journey2}
        options={{
          tabBarIcon: options => {
            const {size, color} = options;
            return <MaterialIcons name="timeline" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="Kit"
        component={Box}
        listeners={{
          tabPress: e => {
            if (user.credits !== 0 || !user.isUnder25) {
              if (!user.isUnder25) {
                Alert.alert(
                  "La commande de kit n'est pas disponible",
                  'Vous devez avoir moins de 25 ans pour commander un kit',
                );
              }
              e.preventDefault();
            } else {
              Event.orderPageEvent('navbarOrderButton');
            }
          },
        }}
        options={{
          tabBarIcon: ({size, color, focused}) => {
            let tmpColor = focused ? color : Colors.grey;
            return (
              <MaterialIcons
                name="card-giftcard"
                color={tmpColor}
                size={size}
              />
            );
          },
          tabBarBadge: user.credits > 0 ? user.credits : null,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
