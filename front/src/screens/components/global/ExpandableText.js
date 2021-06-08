import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  UIManager,
  findNodeHandle,
  Image,
  TouchableOpacity,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import PropTypes from 'prop-types';

import TextLink from './TextLink';
import useIsMounted from '../../../hooks/isMounted';
import Tracking from '../../../services/Tracking';

import Colors from '../../../styles/Color';

import ReactHowler from 'react-howler';
import CustomTouchableOpacity from './CustomTouchableOpacity';

ExpandableText.propTypes = {
  isExpanded: PropTypes.bool,
  onReady: PropTypes.func,
  renderTruncatedFooter: PropTypes.func,
  renderRevealedFooter: PropTypes.func,
  purpleMode: PropTypes.bool,
  readMoreStyle: PropTypes.object,
  content: PropTypes.object,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  readMoreLink: PropTypes.string,
  onReadMore: PropTypes.func,
  sound: PropTypes.string,
};

export default function ExpandableText(props) {
  const [measured, setMeasured] = useState(false);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
  const [showAllText, setShowAllText] = useState(props.isExpanded);
  const isMounted = useIsMounted();
  const _text = useRef();

  const [play, setPlay] = useState(false);

  const soundPicture = require('../../../assets/pictures/sound.png');

  function onPlayStart() {}

  function onPlayStop() {
    console.log('Stop asked : ' + play);

    setPlay(false);
  }

  async function togglePlay(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!play) {
      console.log('Asking top force stop.');
      await window.Howler.stop();
    }

    setTimeout(function() {
      setPlay(!play);
    }, 200);
  }

  useEffect(() => {
    async function nextFrameAsync() {
      return new Promise(resolve => requestAnimationFrame(() => resolve()));
    }

    async function measureHeightAsync(component) {
      return new Promise(resolve => {
        UIManager.measure(
          findNodeHandle(_text.current),
          (x, y, width, height) => {
            resolve(height);
          },
        );
      });
    }

    async function handleHeight(_text) {
      await nextFrameAsync();

      if (!isMounted.current) {
        return;
      }

      // Get the height of the text with no restriction on number of lines
      const fullHeight = await measureHeightAsync(_text);

      if (!isMounted.current) {
        return;
      }

      setMeasured(true);

      await nextFrameAsync();

      if (!isMounted.current) {
        return;
      }
      // Get the height of the text now that number of lines has been set
      const limitedHeight = await measureHeightAsync(_text);

      if (fullHeight > limitedHeight) {
        setShouldShowReadMore(true);
      }
      if (props.onReady) {
        props.onReady();
      }
    }

    handleHeight(_text);
  }, [_text, isMounted, props]);

  function renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name === 'a') {
      return (
        <TextLink
          key={index}
          style={[cardStyle.readMore, {...props.readMoreStyle}]}
          targetUrl={node.attribs.href}>
          {defaultRenderer(node.children, parent)}
        </TextLink>
      );
    }
    if (node.name === 'strong' || node.name === 'b') {
      return (
        <Text key={index} style={cardStyle.boldText}>
          {defaultRenderer(node.children, parent)}
        </Text>
      );
    }
  }

  function _handlePressReadMore() {
    setShowAllText(true);
    props.onReadMore();
  }

  function _handlePressReadLess() {
    setShowAllText(false);
  }

  function _maybeRenderReadMore() {
    if (shouldShowReadMore && !props.isExpanded && !showAllText) {
      if (props.renderTruncatedFooter) {
        return props.renderTruncatedFooter(_handlePressReadMore);
      }

      return (
        <TouchableOpacity
          style={cardStyle.readMoreWrapper}
          onPress={_handlePressReadMore}>
          <Image
            style={cardStyle.readMorePicture}
            source={
              props.purpleMode
                ? require('../../../assets/pictures/plus-purple.png')
                : require('../../../assets/pictures/plus-orange.png')
            }
          />
          <Text style={[cardStyle.readMore, {...props.readMoreStyle}]}>
            En lire plus
          </Text>
        </TouchableOpacity>
      );
    } else if (shouldShowReadMore && (props.isExpanded || showAllText)) {
      if (props.renderRevealedFooter) {
        return props.renderRevealedFooter(_handlePressReadLess);
      }

      if (props.readMoreLink) {
        return (
          <TouchableOpacity
            style={cardStyle.readMoreWrapper}
            onPress={_handlePressReadLess}>
            <Image
              style={cardStyle.readMorePicture}
              source={
                props.purpleMode
                  ? require('../../../assets/pictures/external-purple.png')
                  : require('../../../assets/pictures/external-orange.png')
              }
            />
            <TextLink
              style={[cardStyle.readMore, {...props.readMoreStyle}]}
              targetUrl={props.readMoreLink}>
              En savoir plus
            </TextLink>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={cardStyle.readMoreWrapper}
            onPress={_handlePressReadLess}>
            <Image
              style={cardStyle.readMorePicture}
              source={
                props.purpleMode
                  ? require('../../../assets/pictures/minus-purple.png')
                  : require('../../../assets/pictures/minus-orange.png')
              }
            />
            <Text style={[cardStyle.readMore, {...props.readMoreStyle}]}>
              Refermer
            </Text>
          </TouchableOpacity>
        );
      }
    }
  }

  const NoL =
    measured && !props.isExpanded && !showAllText
      ? props.content.numberOfLines
      : 0;

  return (
    <View style={props.containerStyle}>
      <View style={cardStyle.textContainer}>
        {props.content.title && (
          <Text style={cardStyle.title}>{props.content.title}</Text>
        )}
        <HTMLView
          RootComponent={Text}
          renderNode={renderNode}
          ref={_text}
          value={`<p>${props.content.text}</p>`}
          rootComponentProps={{
            numberOfLines: NoL,
            style: [cardStyle.text, {...props.textStyle}],
          }}
          style={[cardStyle.text, {...props.textStyle}]}
        />
        {props.sound && (
          <CustomTouchableOpacity
            onPress={e => {
              togglePlay(e);
              return false;
            }}
            style={{position: 'absolute', right: 15, top: 20}}>
            <Image
              style={{
                marginLeft: 10,
                width: 23,
                height: 23,
                resizeMode: 'contain',
              }}
              source={soundPicture}
            />
          </CustomTouchableOpacity>
        )}
        {props.sound && (
          <ReactHowler
            src={props.sound.uri}
            onEnd={onPlayStop}
            onStop={onPlayStop}
            playing={play}
          />
        )}
        {_maybeRenderReadMore()}
      </View>
    </View>
  );
}

const cardStyle = StyleSheet.create({
  textContainer: {
    padding: 15,
  },
  title: {
    color: '#F1732C',
    fontSize: 28,
    fontFamily: Colors.titleCard,
  },
  text: {
    color: '#4F4F4F',
    fontSize: 13,
    marginBottom: 25,
    marginTop: 10,
    lineHeight: 19,
    fontFamily: Colors.textFont,
  },
  boldText: {
    color: '#4F4F4F',
    fontFamily: Colors.textFont,
    fontWeight: '600',
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
    fontSize: 13,
  },
  readMorePicture: {
    marginRight: 8,
    width: 16,
    height: 16,
    marginTop: 1,
    paddingTop: 0,
    resizeMode: 'contain',
  },
});
