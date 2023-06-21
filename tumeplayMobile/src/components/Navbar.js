import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../views/HomePage';
import Thematiques from '../views/Thematiques';
import {Colors} from '../styles/Style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppContext from '../../AppContext';
import diceIcon from '../assets/diceIcon.png';
import {Image} from 'react-native';
import Journey2 from '../views/Journey2';
import GameChoice from '../views/GameChoice';
import Menu from '../views/Menu';

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
        name="Réglages"
        component={Menu}
        options={{
          tabBarIcon: options => {
            const {size, color} = options;
            return <MaterialIcons name="settings" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
