import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import Text from '../../components/Text';
import {Fonts} from '../../styles/Style';
import {REACT_APP_URL} from '@env';
import lock from '../../assets/Cadenas.png';

const ContentCard = props => {
  const {item, backgroundColor, navigation, content_ids, locked, theme_id} =
    props;
  const imageUrl = {uri: REACT_APP_URL + item?.image?.url};

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Content', {
          content_id: item?.id,
          content_ids: content_ids,
          theme_id: theme_id,
          level: item?.niveau?.value,
          initial: true,
        })
      }
      disabled={locked}
      style={[styles.container, {backgroundColor: backgroundColor}]}>
      {locked && <View style={styles.lockedOverlay} />}
      <View style={styles.cardContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.level}>NIVEAU {item?.niveau?.value}</Text>
          <Text style={styles.title}>{item?.title}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={imageUrl} style={styles.image} />
        </View>
      </View>
      {locked && (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: backgroundColor,
            },
            styles.lockShadow,
          ]}>
          <Image source={lock} style={styles.imageLock} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 130,
    marginVertical: 2,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    zIndex: 0,
  },
  iconContainer: {
    padding: 4,
    borderRadius: 50,
    width: 30,
    height: 30,
    position: 'absolute',
    right: '47%',
    top: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  level: {
    fontFamily: Fonts.strongText,
    color: '#E85439',
    lineHeight: 21,
    fontSize: 14,
    paddingTop: 15,
  },
  titleContainer: {
    width: '50%',
    paddingLeft: 20,
  },
  title: {
    fontFamily: Fonts.subtitle,
    fontSize: 18,
    lineHeight: 24,
  },
  imageContainer: {
    width: '50%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  lockedOverlay: {
    backgroundColor: '#000000',
    opacity: 0.2,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  lockShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default ContentCard;
