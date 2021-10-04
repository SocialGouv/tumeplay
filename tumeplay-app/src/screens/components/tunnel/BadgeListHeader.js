import React, {useState, useEffect} from 'react';
import {Text, View, Image, FlatList} from 'react-native';

import Styles from '../../../styles/Styles';
import TunnelBadgeListStyle from '../../../styles/components/TunnelBadgeList';
import LandingStyle from '../../../styles/components/LandingScreen';

import useIsMounted from '../../../hooks/isMounted';
import User from '../../../services/User';

export default function BadgeListHeader() {
  const [availableTokens, setAvailableToken] = useState(0);
  const [badgeList, setBadgeList] = useState([]);
  const isMounted = useIsMounted();

  useEffect(() => {
    async function _fetchTokens() {
      const _tokens = await User.getTokensAmount();
      if (isMounted.current) {
        setAvailableToken(_tokens);
      }
    }

    // async function _fetchBadgeList() {
    //   const _badges = await RemoteApi.fetchBadges();
    //   if (isMounted.current) {
    //     setBadgeList(_badges);
    //   }
    // }

    _fetchTokens();
    // _fetchBadgeList();
  }, [isMounted]);

  function BadgeGrid() {
    const numColumns = 2;
    let currentIndex = 0;
    return (
      <FlatList
        scrollEnabled={true}
        data={badgeList}
        style={{paddingLeft: 15, paddingRight: 15, width: '100%'}}
        renderItem={({item}) => {
          // That's a really dirty way; but strangely the only one working.
          const localStyle =
            currentIndex % 2 === 0 ? {marginRight: 7} : {marginLeft: 7};
          currentIndex = currentIndex + 1;
          const neededTokens = item.tokenRequired - availableTokens;
          return (
            <View style={[LandingStyle.gridContainer, localStyle]}>
              <View style={LandingStyle.gridItemButton}>
                {availableTokens <= item.tokenRequired && (
                  <View style={{position: 'relative', zIndex: 1}}>
                    <Image
                      style={TunnelBadgeListStyle.topLogoPicture}
                      source={item.pictureOff}
                    />
                    <Text style={TunnelBadgeListStyle.topLogoText}>
                      Badge débloqué{'\n'}dans {neededTokens} points
                    </Text>
                  </View>
                )}
                {availableTokens > item.tokenRequired && (
                  <Image
                    style={TunnelBadgeListStyle.topLogoPicture}
                    source={item.picture}
                  />
                )}
                <View style={TunnelBadgeListStyle.topLogoCounterWrapper}>
                  <Text style={TunnelBadgeListStyle.topLogoCounter}>
                    {item.title}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        numColumns={numColumns}
      />
    );
  }

  return (
    <View>
      <Text style={Styles.appTitle}>
        Suis ta progression et collectionne des badges
      </Text>
      <Text style={[Styles.text, Styles.textLeft, {fontSize: 18}]}>
        Super ! Grace aux points que tu as gagné en répondant aux quiz, tu
        obtiens des badges !
      </Text>
      <View style={TunnelBadgeListStyle.topLogoCounterWrapper}>
        <BadgeGrid />
      </View>
    </View>
  );
}
