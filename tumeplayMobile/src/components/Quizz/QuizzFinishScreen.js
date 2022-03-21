import React, {useContext, useEffect, useState} from 'react';
import QuizzWithWrongAnswers from './QuizzFinish/QuizzWithWrongAnswers';
import QuizzAllRight from './QuizzFinish/QuizzAllRight';
import AppContext from '../../../AppContext';
import {REACT_APP_URL} from '@env';
import Award from '../../views/Award';
import {ActivityIndicator, View} from 'react-native';
import {Alert} from 'react-native';
import {useMutation} from '@apollo/client';
import {UPDATE_MOBILE_USER_HISTORY} from '../../services/api/mobile_users';
import Event from '../../services/api/matomo';

const QuizzFinishScreen = ({navigation, route}) => {
  const correctAnswers = route?.params?.correctAnswers;
  const wrongAnswers = route?.params?.wrongAnswers;
  const module_id = route?.params?.module_id;
  const module_title = route?.params?.module_title;
  const theme = route?.params?.theme;
  const retry = route?.params?.retry;
  const {strapi_user_id, user, reloadUser} = useContext(AppContext);

  const [hasReward, setHasReward] = useState(null);

  const [updateHistory] = useMutation(UPDATE_MOBILE_USER_HISTORY);

  const isRewarded = () => {
    let res = fetch(
      REACT_APP_URL +
        `/has-reward?module_id=${module_id}&user_id=${strapi_user_id}`,
    );
    return res;
  };

  const checkUserHistory = async () => {
    if (user?.history) {
      let currentHistory = user?.history.find(
        history => history.module_id == module_id,
      );
      console.log('history', currentHistory);
      try {
        await updateHistory({
          variables: {
            history_id: currentHistory?.id,
            module_id: currentHistory?.module_id,
            status: 'success',
          },
        });
        reloadUser();
      } catch (error) {
        console.log("Erreur à l'update : ", error);
        Alert.alert(
          'Désolé !',
          " Un problème est survenu à l'enregistrement de tes résultats",
          [
            {
              text: 'Annuler',
              onPress: () => {
                () => navigation.navigate('Home', {screen: 'Parcours'});
              },
            },
            {
              text: 'Recommencer',
              onPress: () => {
                checkUserHistory();
              },
            },
          ],
        );
      }
    }
  };

  useEffect(() => {
    if (wrongAnswers.length === 0) {
      Event.quizzDone();
      if (!retry) {
        isRewarded().then(res => {
          res.json().then(data => {
            setHasReward(data);
            checkUserHistory();
          });
        });
      }
    }
  }, [route]);

  const EndScreen = () => {
    if (wrongAnswers.length > 0) {
      return (
        <QuizzWithWrongAnswers
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          navigation={navigation}
          module_id={module_id}
          module_title={module_title}
          theme={theme}
        />
      );
    } else if (retry) {
      return <QuizzAllRight navigation={navigation} module_id={module_id} />;
    } else if (hasReward === null || user.pending_module) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator
            size={60}
            color={'red'}
            style={{alignSelf: 'center'}}
          />
        </View>
      );
    } else {
      return hasReward ? (
        <Award />
      ) : (
        <QuizzAllRight navigation={navigation} module_id={module_id} />
      );
    }
  };

  return <EndScreen />;
};

export default QuizzFinishScreen;
