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

import Colors from '../../../styles/Color';

import ReactHowler from 'react-howler';
import CustomTouchableOpacity from './CustomTouchableOpacity';
import Tracking from '../../../services/Tracking';

const REACT_APP_ZONE = process.env.REACT_APP_ZONE;
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

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
  const [lines, setLines] = useState(0);
  const [cardHeight, setCardHeight] = useState();

  const soundIconStyle = props.soundStyle || {
    position: 'absolute',
    right: 15,
    top: 20,
  };

  const [play, setPlay] = useState(false);

  const soundPicture = require('../../../assets/pictures/sound.png');

  function onPlayStart() {
    console.log('start');
    setPlay(true);
  }

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
    if (showAllText) {
      setLines(15);
    } else {
      setLines(5);
    }
  }, [showAllText]);

  useEffect(() => {
    setShowAllText(props.isExpanded);
  }, [props.isExpanded]);

  const setMatomoTrackers = node => {
    if (node.dataset === 'content-link') {
      Tracking.externalLink(node.href);
    }
  };

  function renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name === 'a') {
      return (
        <TextLink
          key={index}
          style={[cardStyle.readMore, {...props.readMoreStyle}]}
          onPress={() => setMatomoTrackers(node.attribs)}
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
    if (!showAllText) {
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
    } else if (showAllText && props.content.external_link) {
      if (props.renderRevealedFooter) {
        return props.renderRevealedFooter(_handlePressReadLess);
      }

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
            targetUrl={props.content.external_link}>
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

  return (
    <View style={props.containerStyle}>
      <View style={cardStyle.textContainer}>
        {props.content.title ? (
          <Text style={cardStyle.title}>{props.content.title}</Text>
        ) : (
          <></>
        )}
        <HTMLView
          RootComponent={Text}
          renderNode={renderNode}
          value={`<p>${props.content.text}</p>`}
          rootComponentProps={{
            numberOfLines: lines,
            style: [cardStyle.text, {...props.textStyle}],
          }}
          style={[cardStyle.text, {...props.textStyle}]}
        />
        {props.sound && REACT_APP_ZONE === 'guyane' && (
          <CustomTouchableOpacity
            onPress={e => {
              togglePlay(e);
              return false;
            }}
            style={soundIconStyle}>
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
        {props.sound && REACT_APP_ZONE === 'guyane' && (
          <ReactHowler
            src={REACT_APP_API_URL + props.sound}
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
