import {View, StyleSheet} from 'react-native';
import Text from '../Text';
import React, {useContext, useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {REACT_APP_URL} from '@env';
import AppContext from '../../../AppContext';
import {Colors} from '../../styles/Style';
import config from '../../../config';
import {Divider} from 'react-native-paper';
import Button from '../Button';

const LeaderBoard = _props => {
  const {setShowLeaderBoard} = _props;
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

  const displayScoresIndex = index => {
    if (index === 0) {
      return <Text style={styles.icon}>🥇</Text>;
    }
    if (index === 1) {
      return <Text style={styles.icon}>🥈</Text>;
    }
    if (index === 2) {
      return <Text style={styles.icon}>🥉</Text>;
    }
    if (index > 2) {
      return <Text style={styles.index}>{index + 1 + '.'}</Text>;
    }
  };

  const displayLeaderBoard = userList.map((_user, index) => {
    return (
      <View style={styles.row} key={index}>
        <View style={styles.leftRowPart}>
          {displayScoresIndex(index)}
          <Text style={[styles.text, {fontWeight: 'bold', paddingLeft: 30}]}>
            {_user.first_name}
          </Text>
        </View>
        <Text style={[styles.text]}>{_user.points + ' points'}</Text>
      </View>
    );
  });

  return (
    <AnimatedView
      style={styles.container}
      animation={'fadeInDownBig'}
      duration={500}
      easing="ease-in-out">
      <Text style={styles.title}>Sextus Top 5 joueurs</Text>
      <View style={styles.playerContainer}>
        <Text style={styles.playerContainerBoldText}>{user.first_name}</Text>
        <Text>{user.points} points</Text>
      </View>
      <Button
        text="Je continue"
        size="large"
        icon
        style={styles.button}
        onPress={() => setShowLeaderBoard(false)}
      />
      <Divider style={styles.divider} />
      {displayLeaderBoard}
      <Divider style={styles.divider} />
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
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: config.deviceHeight * 0.08,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  playerContainerBoldText: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  leftRowPart: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: config.deviceWidth * 0.065,
    padding: 0,
  },
  index: {
    fontSize: config.deviceWidth * 0.045,
    color: Colors.primary,
    paddingLeft: 10,
  },
  divider: {
    width: '100%',
    borderColor: '#EAE2D7',
    borderWidth: 1,
  },
  button: {
    marginTop: 30,
    marginBottom: 50,
  },
});

export default LeaderBoard;
