import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import ExpandableText from '../global/ExpandableText';
import CustomTouchableOpacity from '../global/CustomTouchableOpacity';
import Tracking from '../../../services/Tracking';

ContentCard.propTypes = {
  item: PropTypes.object,
  activeOpacity: PropTypes.number,
};

export default function ContentCard(props) {
  const [content, setContent] = useState(props.item);
  const [isExpanded, setIsExpanded] = useState(false);

  const cardStyle = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: 7,
      marginTop: 20,
    },
    buttonWrapper: {
      flex: 1,
    },
    picture: {
      height: 250,
      width: '100%',
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
    },
    textContainer: {
      padding: 15,
    },
    title: {
      color: '#F1732C',
      fontSize: 28,
    },
    text: {
      color: '#4F4F4F',
      fontSize: 14,
      marginBottom: 25,
      marginTop: 10,
    },
    readMoreWrapper: {
      position: 'absolute',
      right: 15,
      bottom: 15,
      flex: 1,
      flexDirection: 'row',
    },
    readMore: {
      color: '#F1732C',
      textDecorationLine: 'underline',
    },
    plusPicture: {
      marginRight: 3,
      width: 16,
      height: 16,
      marginTop: 3,
      paddingTop: 0,
      resizeMode: 'contain',
    },
  });

  return (
    <View style={cardStyle.container}>
      <CustomTouchableOpacity
        style={cardStyle.buttonWrapper}
        onPress={() => {
          Tracking.knowMoreTriggered('contenu', content.id);
          setIsExpanded(!isExpanded);
        }}
        activeOpacity={props.activeOpacity}>
        <Image source={content.picture} style={cardStyle.picture} />

        <ExpandableText
          content={content}
          isExpanded={isExpanded}
          readMoreLink={content.link}
          lessPicture={'minus-orange.png'}
          morePicture={'plus-orange.png'}
          sound={content.sound}
          onReadMore={() => {
            Tracking.knowMoreTriggered('contenu', content.id);
          }}
        />
      </CustomTouchableOpacity>
    </View>
  );
}
