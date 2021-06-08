import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  Picker,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import RemoteApi from '../services/RemoteApi';
import useIsMounted from '../hooks/isMounted';

import Styles from '../styles/Styles';
import Colors from '../styles/Color';

AddCommentScreen.propTypes = {
  onWriteComment: PropTypes.func,
  onClose: PropTypes.func,
};
export default function AddCommentScreen(props) {
  const [selectedValue, setSelectedValue] = useState();
  const [selectedId, setSelectedId] = useState(0);
  const [menuChoices, setMenuChoices] = useState([]);
  const [content, setContent] = useState('');
  const [canComment, setCanComment] = useState(true);
  const isMounted = useIsMounted();

  const description =
    "Tu trouves que la question n'est pas claire ? Ou bien la réponse n'est pas compréhensible ? Alors tu peux nous l'indiquer ici pour que nous la modifions.";
  /*const _menuComments = [
    {id: 1, text: "Je n'ai pas compris la question"},
    {id: 2, text: "La réponse n'est pas claire"},
    {id: 3, text: 'Autre'},
  ];*/

  useEffect(() => {
    async function _fetchChoices() {
      if (isMounted.current) {
        const rawChoices = await RemoteApi.fetchFeedbackTypes();

        const choices = rawChoices.map(item => {
          return {
            id: item.id,
            text: item.title,
          };
        });
        if (isMounted.current) {
          setMenuChoices(choices);
          setSelectedId(choices[0].id);
        }
      }
    }

    _fetchChoices();
  }, [isMounted]);

  function _chooseTypeComment(text, key) {
    setSelectedValue(text);
    setSelectedId(key);

    setCanComment(false);
    setContent('');
  }
  function handleChange(event) {
    setContent(event.target.value);
    if (event.target.value !== '') {
      setCanComment(true);
    } else {
      setCanComment(false);
    }
  }

  function _writeComment() {
    if (content !== '') {
      props.onWriteComment(content, selectedId);
    } else {
      props.onWriteComment(selectedValue, selectedId);
    }
    props.onClose();
  }

  const _menuButtons = menuChoices.map((item, key) => {
    return <Picker.Item key={item.id} label={item.text} value={item.text} />;
  });

  return (
    <View
      style={[
        Styles.flexOne,
        {
          backgroundColor: Colors.backgroundColor,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 5,
        },
      ]}>
      <Text style={[Styles.landingScreenTitle, {marginLeft: 0}]}>
        Tes retours
      </Text>
      <View style={{marginTop: 20, marginBottom: 20}}>
        <Text style={[Styles.landingScreenSubtitle, {marginLeft: 0}]}>
          {description}
          <br />
          Merci !
        </Text>
      </View>

      <View>
        <Text style={[Styles.labelText, {marginBottom: 5}]}>Ta remarque *</Text>
        <Picker
          selectedValue={selectedValue}
          style={Styles.tunnelPicker}
          onValueChange={(itemValue, itemIndex) =>
            _chooseTypeComment(itemValue, itemIndex)
          }>
          {_menuButtons}
        </Picker>
      </View>

      <View>
        <Text style={[Styles.labelText, {marginBottom: 5}]}>Remarque *</Text>
        <TextInput
          placeholder={'Écris ici ta remarque'}
          multiline={true}
          numberOfLines={6}
          style={{
            borderRadius: 5,
            padding: 5,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            borderColor: '#D13E72',
            outline: 'none',
            textAlignVertical: 'top',
          }}
          value={content}
          onChange={handleChange}
        />

        <TouchableOpacity
          onPress={() => setContent('')}
          style={{position: 'absolute', right: 10, top: 30, zIndex: 10}}>
          <Image
            style={{width: 15, height: 15, resizeMode: 'contain'}}
            source={require('../assets/pictures/cancel.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <Text
          style={[
            Styles.placeholderText,
            {
              fontSize: 13,
              color: '#FFFFFF',
              marginTop: 5,
              fontFamily: 'Chivo-Regular',
            },
          ]}>
          * Champs obligatoires pour valider
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          _writeComment();
        }}
        style={
          canComment ? Styles.bottomButtonValid : Styles.bottomButtonInValid
        }>
        <Text style={Styles.bottomCommText}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
}
