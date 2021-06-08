import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';

import Styles from '../../../styles/Styles';
import TunnelProductSelectStyle from '../../../styles/components/TunnelProductSelect';
import UnderlineText from '../global/UnderlineText';

import useIsMounted from '../../../hooks/isMounted';
import User from '../../../services/User';

export default function ProductSelectHeader() {
  const [availableTokens, setAvailableToken] = useState(0);
  //const [isMounted, setIsMounted] = useState(false);

  const isMounted = useIsMounted();

  useEffect(() => {
    async function _fetchTokens() {
      const _tokens = await User.getTokensAmount();
      if (isMounted.current) {
        setAvailableToken(_tokens);
      }
    }

    //setIsMounted(true);
    _fetchTokens();
  }, [isMounted]);

  return (
    <View>
      <Text style={Styles.appTitle}>Commande ta box gratuitement !</Text>
      <Text style={[Styles.text, Styles.textLeft, {fontSize: 18}]}>
        <UnderlineText borderMargin={-4} textStyle={Styles.text}>
          Super
        </UnderlineText>{' '}
        ! Tu as {availableTokens} points, choisis une de nos quatre boxs pour en
        apprendre plus et passer à l&apos;action en toute sécurité !
      </Text>
      <Image
        style={TunnelProductSelectStyle.topLogoPicture}
        source={require('../../../assets/pictures/tunnel-congrats.png')}
      />
      <View style={TunnelProductSelectStyle.topLogoCounterWrapper}>
        <Text style={TunnelProductSelectStyle.topLogoCounter}>
          {availableTokens}
        </Text>
      </View>
    </View>
  );
}
