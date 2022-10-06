import {View, StyleSheet} from 'react-native';
import Text from '../Text';
import React, {useContext, useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {REACT_APP_URL} from '@env';
import AppContext from '../../../AppContext';
import {Colors} from '../../styles/Style';
import config from '../../../config';

const LeaderBoard = props => {
  const {user} = useContext(AppContext);
  const AnimatedView = Animatable.createAnimatableComponent(View);
  const [userList, setUserList] = useState([]);

  const retrieveLeaderBoard = () => {
    fetch(`${REACT_APP_URL}/leaderboard`).then(res => {
      res.json().then(data => {
        setUserList(data);
      });
    });
  };

  useEffect(() => {
    retrieveLeaderBoard();
  }, []);

  const displayLeaderBoard = userList.map((_user, index) => {
    return (
      <View
        style={[
          styles.row,
          user.first_name === _user.first_name && styles.specialRow,
        ]}
        key={index}>
        <Text
          style={[
            styles.text,
            user.first_name === _user.first_name && styles.specialText,
          ]}>
          {index + 1}
        </Text>
        <Text
          style={[
            styles.text,
            user.first_name === _user.first_name && styles.specialText,
          ]}>
          {_user.first_name}
        </Text>
        <Text
          style={[
            styles.text,
            user.first_name === _user.first_name && styles.specialText,
            {fontWeight: 'bold'},
          ]}>
          {_user.points}
        </Text>
      </View>
    );
  });

  return (
    <AnimatedView
      style={styles.container}
      animation={'fadeInDownBig'}
      duration={500}
      easing="ease-in-out">
      <Text style={styles.title}>Sextus Top 10 Players !</Text>
      {displayLeaderBoard}
      {!userList.find(_user => _user.first_name === user.first_name) && (
        <View style={[styles.row, styles.specialRow]}>
          <Text style={[styles.specialText]}>{user.first_name}</Text>
          <Text style={[styles.specialText]}>{user.points}</Text>
        </View>
      )}
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 40,
    color: Colors.primary,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  specialRow: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderBottomWidth: 0,
  },
  text: {
    color: Colors.black,
    fontSize: config.deviceWidth * 0.04,
  },
  specialText: {
    color: 'white',
    fontSize: config.deviceWidth * 0.05,
    fontWeight: 'bold',
  },
});

export default LeaderBoard;
