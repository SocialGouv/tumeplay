import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../views/HomePage';
import Thematiques from '../views/Thematiques';
import QuizzStartPage from '../views/QuizzStartPage';
import Journey from '../views/Journey';
import {Colors} from '../styles/Style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const Navbar = ({navigation, route}) => {
  return (
    <Tab.Navigator
      initialRouteName="Accueil"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.black,
        tabBarItemStyle: {padding: 5},
        tabBarStyle: {
          position: 'relative',
          bottom: 0,
          backgroundColor: Colors.lightCorail,
        },
      }}>
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
        name="Posts"
        component={Thematiques}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="import-contacts" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizzStartPage}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="rule" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Parcours"
        component={Journey}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="timeline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
