import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import QuizzAnswerStyle from '../../../styles/components/QuizzAnswer';

CommentLikesView.propTypes = {
  onPressLike: PropTypes.func,
  onPressComment: PropTypes.func,
};

export default function CommentLikesView(props) {
  const [activeButton, setActiveButton] = useState(0);

  function onPress(activeItemId, activeItemText) {
    const activeItemKey = activeItemId == activeButton ? 0 : activeItemId; // trigger when already active clicked item

    setActiveButton(activeItemKey);
    props.onPressLike(activeItemKey, activeItemText);
  }

  const _likeIcons = [
    {
      id: 1,
      key: 1,
      text: 'like',
      src: require('../../../assets/pictures/like.png'),
      srcActive: require('../../../assets/pictures/likeFull.png'),
    },
    {
      id: 2,
      key: 2,
      text: 'dislike',
      src: require('../../../assets/pictures/dislike.png'),
      srcActive: require('../../../assets/pictures/dislikeFull.png'),
    },
  ];

  const likeButtons = _likeIcons.map((item, key) => {
    return (
      <TouchableOpacity
        key={key}
        style={[likeStyle.likeButtonWrapper, {alignSelf: 'flex-start'}]}
        onPress={() => {
          onPress(item.id, item.text);
        }}>
        <View style={likeStyle.likeButton}>
          <Image
            style={likeStyle.likeButtonPicture}
            source={activeButton === item.id ? item.srcActive : item.src}
          />
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <TouchableOpacity
        style={likeStyle.addCommentWrapper}
        onPress={() => {
          props.onPressComment();
        }}>
        <Image
          style={likeStyle.addCommentPicture}
          source={require('../../../assets/pictures/comment.png')}
        />
        <Text style={likeStyle.addComment}>Donner son avis</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {likeButtons}
      </View>
    </View>
  );
}

const likeStyle = StyleSheet.create({
  addCommentWrapper: {
    position: 'absolute',
    left: 15,
    top: 15,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  addComment: {
    color: '#C80652',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  addCommentPicture: {
    marginRight: 8,
    width: 16,
    height: 16,
    marginTop: 1,
    paddingTop: 0,
    resizeMode: 'contain',
  },
  likeButtonWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    maxHeight: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    paddingRight: 2,
  },
  likeButton: {
    width: 46,
    height: 46,
    paddingLeft: 6,
    paddingTop: 12,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  likeButtonPicture: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
  },
});
