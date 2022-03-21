import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../views/HomePage';
import Thematiques from '../views/Thematiques';
import Journey from '../views/Journey';
import Box from '../views/Box';
import {Colors} from '../styles/Style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppContext from '../../AppContext';
import QuizzLoader from './global/QuizzLoader';
import diceIcon from '../assets/diceIcon.png';
import {Image} from 'react-native';
import Event from '../services/api/matomo';

const Tab = createBottomTabNavigator();

const Navbar = ({navigation}) => {
  const {user} = useContext(AppContext);

  const handleQuizzRedirection = () => {
    if (user.pending_module) {
      return {
        module_id: user.pending_module.id,
        module_title: user.pending_module.title,
        theme: {
          title: user.pending_module.theme_title,
          image: user.pending_module.theme_image,
          color: user.pending_module.theme_color,
        },
        questions: user.pending_module_questions,
        homeScreen: true,
        clearModuleData: true,
        retry: false,
      };
    } else if (user.next_module) {
      return {
        module_id: user.next_module.id,
        module_title: user.next_module.title,
        theme: {
          title: user.next_module.theme_title,
          image: user.next_module.theme_image,
          color: user.next_module.theme_color,
        },
        questions: user.next_module_questions,
        homeScreen: true,
        clearModuleData: true,
        retry: false,
      };
    } else {
      return {
        module_id: user.random_module.id,
        module_title: user.random_module.title,
        questions: user.random_module_questions,
        theme: {
          title: user.random_module.theme_title,
          image: user.random_module.theme_image,
          color: user.random_module.theme_color,
        },
        homeScreen: true,
        clearModuleData: true,
        retry: false,
      };
    }
  };

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
        name="Posts"
        component={Thematiques}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="import-contacts" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Jouer"
        component={QuizzLoader}
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
        listeners={{
          tabPress: e => {
            Event.playEvent('navbar');
          },
        }}
        initialParams={handleQuizzRedirection()}
      />
      <Tab.Screen
        name="Parcours"
        component={Journey}
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
            if (user.credits === 0) {
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
          tabBarBadge: user.credits !== 0 ? user.credits : null,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
