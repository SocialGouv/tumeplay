import React, {useState, useRef, useEffect, useMemo} from 'react';
import {ScrollView, SafeAreaView, View} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';

import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import CustomFooter from './CustomFooter';
import QuizzScreen from './QuizzScreen';
import QuizzFinishScreen from './QuizzFinishScreen';
import BadgeFinishScreen from './BadgeFinishScreen';

import MoreThan25YearsScreen from './MoreThan25YearsScreen';
import ContactButton from './components/global/ContactButton';
import ContentCards from './components/content/ContentCards';
import QuizzButton from './components/content/QuizzButton';
import ModalCloseButton from './components/global/ModalCloseButton';
import UserService from '../services/User';
import Tracking from '../services/Tracking';
import QuizzService from '../services/Quiz';

import autoScrollToTop from '../hooks/autoScrollToTop';
import useIsMounted from '../hooks/isMounted';

import Styles from '../styles/Styles';
import ModalStyle from '../styles/components/Modal';

import {useQuery} from '@apollo/client';
import {GET_CONTENTS} from '../services/api/contents';
import {GET_QUESTIONS} from '../services/api/questions';

ContentScreen.propTypes = {
  navigation: PropTypes.object,
};

export default function ContentScreen(props) {
  Modal.setAppElement('body'); // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

  const [isQuizzModalVisible, setIsQuizzModalVisible] = useState(false);
  const [isAge25ModalVisible, setIsAge25ModalVisible] = useState(false);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [isBadgeModalVisible, setIsBadgeModalVisible] = useState(false);

  const [isAge25, setIsAge25] = useState(null);

  const [badgeInfoDetails] = useState();
  const [isQuizzButtonVisible, setIsQuizzButtonVisible] = useState(false);
  const [needResultModal, setNeedResultModal] = useState(false);

  const [localQuestions, setLocalQuestions] = useState([]);
  const [selectedTheme] = useState(props.navigation.state.params.selectedTheme);
  const [availableTokens, setAvailableTokens] = useState(0);
  const [activeOpacity, setActiveOpacity] = useState(0.5);
  const isMounted = useIsMounted();

  const {data, loading} = useQuery(GET_QUESTIONS, {
    variables: {theme_id: selectedTheme.id},
  });

  const opacityTimer = useRef(null);
  autoScrollToTop(props);

  var quizTimer = false;
  // Listeners to fix QuizzButton display on web mode
  const willFocusSubscription = props.navigation.addListener(
    'willFocus',
    () => {
      setIsQuizzButtonVisible(true);
    },
  );

  useEffect(() => {
    if (isMounted.current) {
      const handleScroll = event => {
        setActiveOpacity(1);

        if (opacityTimer && opacityTimer.current) {
          clearTimeout(opacityTimer.current);
        }

        opacityTimer.current = setTimeout(() => {
          setActiveOpacity(0.5);
        }, 150);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isMounted]);

  const willBlurSubscription = props.navigation.addListener('willBlur', () => {
    if (isQuizzButtonVisible) {
      setIsQuizzButtonVisible(false);
    }

    willFocusSubscription.remove();
    willBlurSubscription.remove();
  });

  const DisplayContentCards = () => {
    const {data, loading} = useQuery(GET_CONTENTS, {
      variables: {theme_id: selectedTheme.id},
    });
    if (!loading) {
      const contents = data.contents.map(content => {
        //changer le content.description pour y insérer des balises a si lien
        const Rexp = /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
        const text = content.text.replace(
          Rexp,
          "<a href='$1' target='_blank'>$1</a>",
        );
        content = {...content, text};
        return content;
      });
      return (
        <ContentCards
          activeOpacity={activeOpacity}
          style={{flex: 0.8}}
          localContents={contents}
        />
      );
    }
  };

  useEffect(() => {
    if (needResultModal) {
      setNeedResultModal(false);
      if (isAge25) {
        setIsBadgeModalVisible(!isBadgeModalVisible);
      } else {
        setIsResultModalVisible(!isResultModalVisible);
      }
    }
  }, [isAge25, isBadgeModalVisible, isResultModalVisible, needResultModal]);

  async function _openInitialModal() {
    /**
     * STEPS:
     * 0. Get user data ( isAge25)
     * 1. Check if isAge25 is null
     * 2. if null, open the modal MoreThan25Years
     * 3. else  open the modal quizzModal
     * */
    // Step 1
    const _isAge25 = await UserService.getIsMoreThan25YearsOld();
    // console.log(`_isAge25: ${_isAge25}`);

    setIsAge25(_isAge25 || null);
    if (_isAge25 === null || _isAge25 === undefined) {
      // Step 2
      _toggleMoreThan25YearsModal();
    } else {
      // Step 3
      Tracking.quizStarted();
      quizTimer = Math.floor(Date.now() / 1000);

      _shuffleQuestions();
      _toggleQuizzModal();
    }
  }

  useEffect(() => {
    if (!loading && data) {
      QuizzService.setQuestions(data.questions);
    }
  }, [loading, data]);

  const displayQuizzScreen = () => {
    return (
      <QuizzScreen
        onFinishedQuizz={_onFinishedQuizz}
        questions={localQuestions}
      />
    );
  };

  function _shuffleQuestions() {
    const newQuestions = QuizzService.getQuestions();
    setLocalQuestions(newQuestions);
  }

  function _toggleBadgeModal() {
    // Switching between the age modal and quizz modal
    setIsBadgeModalVisible(!isBadgeModalVisible);
  }

  function _toggleMoreThan25YearsModal() {
    // Switching between the age modal and quizz modal
    setIsAge25ModalVisible(!isAge25ModalVisible);
  }

  function _toggleQuizzModal() {
    setIsQuizzModalVisible(!isQuizzModalVisible);
  }

  function _toggleResultModal() {
    setIsResultModalVisible(!isResultModalVisible);
  }

  function _onFinishedQuizz() {
    quizTimer = Math.floor(Date.now() / 1000) - quizTimer;
    Tracking.quizEnded(quizTimer);

    _toggleQuizzModal();
    setNeedResultModal(true);
  }

  function _onOrder() {
    _toggleResultModal();
    props.navigation.navigate('TunnelProductSelect');
  }

  function _onRetry(hideQuizzModal) {
    // Set to invisible, resetup and reopen quizz modal
    _shuffleQuestions();
    setIsBadgeModalVisible(false);
    setIsResultModalVisible(false);
    if (hideQuizzModal) {
      _toggleQuizzModal();
    }
  }

  /**
   * @param {number} value
   */
  async function _onSelectedMoreThan25Years() {
    await setAndToggleMoreThan25Years(true);
  }
  /**
   * @param {number} value
   */
  async function _onSelectedLessThan25Years() {
    await setAndToggleMoreThan25Years(false);
  }

  /**
   *
   * @param {boolean} val
   */
  async function setAndToggleMoreThan25Years(val) {
    await UserService.setIsMoreThan25YearsOld(val);
    EventRegister.emit('isAgeMoreThan25Changed', val);
    setIsAge25(val);
    _toggleMoreThan25YearsModal();
    _shuffleQuestions();
    _toggleQuizzModal();
    Tracking.quizStarted();
  }

  function _onContactClick() {
    setIsAge25ModalVisible(false);
    setIsQuizzModalVisible(false);
    setIsResultModalVisible(false);

    props.navigation.navigate('StayInTouch');
  }

  return (
    <SafeAreaView style={[Styles.safeAreaView]}>
      <View style={[Styles.safeAreaViewInner, {flex: 1, paddingTop: 40}]}>
        <ScrollView style={{flex: 0.8}}>
          {DisplayContentCards()}
          <ContactButton />
          <CustomFooter
            style={{flex: 0.2}}
            navigation={props.navigation}
            containerStyle={{paddingLeft: 0, paddingRight: 0}}
          />
        </ScrollView>
      </View>

      <Modal
        visible={isQuizzModalVisible}
        isVisible={isQuizzModalVisible}
        style={ModalStyle.modal}
        animationType="fade"
        backdropOpacity={0}
        transparent={true}>
        {/* Because backdrop is not available for web, just a little trick ... */}
        <View style={ModalStyle.backdrop}></View>
        <View style={ModalStyle.innerModal}>
          <ModalCloseButton onClose={_toggleQuizzModal} />
          {displayQuizzScreen()}
        </View>
      </Modal>

      {/* Modal for asking user if age > 25 */}
      <Modal
        visible={isAge25ModalVisible}
        isVisible={isAge25ModalVisible}
        style={ModalStyle.modal}
        animationType="fade"
        backdropOpacity={0}
        transparent={true}>
        <View style={ModalStyle.backdrop}></View>
        <View style={ModalStyle.innerModal}>
          <ModalCloseButton onClose={_toggleMoreThan25YearsModal} />

          <MoreThan25YearsScreen
            moreThan25={_onSelectedMoreThan25Years}
            lessThan25={_onSelectedLessThan25Years}
            onContactClick={_onContactClick}
          />
        </View>
      </Modal>

      <Modal
        visible={isResultModalVisible}
        isVisible={isResultModalVisible}
        style={ModalStyle.modal}
        animationType="fade"
        transparent={true}>
        {/* Because backdrop is not available for web, just a little trick ... */}
        <View style={ModalStyle.backdrop}></View>
        <View style={ModalStyle.innerModal}>
          <ModalCloseButton onClose={_toggleResultModal} />
          <QuizzFinishScreen
            onRetry={_onRetry}
            availableTokens={availableTokens}
            onOrder={_onOrder}
          />
        </View>
      </Modal>

      <Modal
        visible={isBadgeModalVisible}
        isVisible={isBadgeModalVisible}
        style={ModalStyle.modal}
        animationType="fade"
        transparent={true}>
        {/* Because backdrop is not available for web, just a little trick ... */}
        <View style={ModalStyle.backdrop} />
        <View style={ModalStyle.innerModal}>
          <ModalCloseButton onClose={_toggleBadgeModal} />
          <BadgeFinishScreen
            badgeInfoDetails={badgeInfoDetails}
            availableTokens={availableTokens}
            onRetry={_onRetry}
          />
        </View>
      </Modal>

      {/* Fix staying button on web */}
      {selectedTheme &&
        selectedTheme.display_quiz &&
        isQuizzButtonVisible &&
        !isQuizzModalVisible && <QuizzButton onClick={_openInitialModal} />}
    </SafeAreaView>
  );
}
