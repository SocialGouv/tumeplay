import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import openGeocoder from 'node-open-geocoder';

import Colors from '../../styles/Color';
import Styles from '../../styles/Styles';
import TunnelUserAdressStyle from '../../styles/components/TunnelUserAdress';

import Backlink from '../components/tunnel/Backlink';
import CustomTextInput from '../components/tunnel/CustomTextInput';

import useIsMounted from '../../hooks/isMounted';
import AddressValidator from '../../services/AddressValidator';
import MailValidator from '../../services/MailValidator';
import RemoteApi from '../../services/RemoteApi';
import UserService from '../../services/User';

const zipCodeTest = /^[0-9]{5}$/;
export const phoneTest = /^0[0-9]{9}$/;

const screenWidth = Math.round(Dimensions.get('window').width);

let flexstyletext; // @TODO: Delete if useless

if (screenWidth <= 420) {
  flexstyletext = {
    flex: 0.1,
  };
} else {
  flexstyletext = {
    flex: 0.15,
  };
}

TunnelUserAddress.propTypes = {
  navigation: PropTypes.object,
};

// @TODO : Review this entire file to clean it up - so messy.
export default function TunnelUserAddress(props) {
  var defaultUserAdress = {
    firstName: '',
    lastName: '',
    emailAdress: '',
    emailAdressConfirmation: '',
    phoneNumber: '',
    address: '',
    adressMore: '',
    zipCode: '',
    city: '',
    address_region: '',
    address_dept: '',
    address_deptcode: '',
    address_city: '',
  };

  var defaultIsValid = {
    firstName: -1,
    lastName: -1,
    emailAdress: -1,
    emailAdressConfirmation: -1,
    emailAdressMismatch: false,
    phoneNumber: -1,
    address: -1,
    zipCode: -1,
    city: -1,
  };
  const isMounted = useIsMounted();
  const [deliveryType] = useState(props.navigation.state.params.deliveryType);
  const [selectedItem] = useState(props.navigation.state.params.selectedItem);
  const [selectedPickup] = useState(
    props.navigation.state.params.selectedPickup,
  );
  const [selectedProducts] = useState(
    props.navigation.state.params.selectedProducts,
  );

  const [selectedReferent] = useState(
    props.navigation.state.params.selectedReferent,
  );

  const [localAdress, setLocalAdress] = useState(defaultUserAdress);
  const [localValid, setLocalValid] = useState({});
  const [mainValidFlag, setMainValidFlag] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [invalidZipCode, setInvalidZipCode] = useState(false);
  const [disallowOrder, setDisallowOrder] = useState(false);

  console.log('ADRESS', props)

  useEffect(() => {
    if (props.navigation.state.params.userAdress) {
      const userAdress = props.navigation.state.params.userAdress;
      const newAdress = {
        firstName: userAdress.firstName,
        lastName: userAdress.lastName,
        emailAdress: userAdress.emailAdress,
        emailAdressConfirmation: userAdress.emailAdressConfirmation,
        phoneNumber: userAdress.phoneNumber,
        address: userAdress.adress,
        adressMore: userAdress.adressMore,
        zipCode: userAdress.zipCode,
        city: userAdress.city,
      };

      setLocalAdress(newAdress);
    }
  }, [isMounted, props.navigation.state.params.userAdress]);

  function _validateAddressBeforeGoto() {
    const fullAddress =
      localAdress.adress + ' ' + localAdress.zipCode + ' ' + localAdress.city;

    setInvalidAddress(false);

    openGeocoder()
      .geocode(fullAddress)
      .end((err, res) => {
        let filtered = [];
        if (res.length >= 1) {
          filtered = res.filter(place => place.address.country_code === 'fr');

          if (filtered.length > 0) {
            if (res[0]) {
              const deptCode = res[0].address.postcode;
              if (deptCode.substring(0, 2) === '97') {
                localAdress['address_deptcode'] = deptCode.substring(0, 3);
              } else {
                localAdress['address_deptcode'] = deptCode.substring(0, 2);
              }
              localAdress['address_region'] = res[0].address.state;
              localAdress['address_dept'] = res[0].address.county;
              localAdress['address_city'] = res[0].address.city;
              _gotoSummary();
            }
          }
        }

        if (filtered.length === 0 || res.length === 0) {
          setInvalidAddress(true);
        }
      });
  }

  function _validateFields(defaultValue) {
    let isValid = true;

    // Reset all validations
    const checkedIsValid = defaultIsValid;

    if (localAdress.firstName === '') {
      checkedIsValid.firstName = defaultValue;
      isValid = false;
    }

    if (localAdress.lastName === '') {
      checkedIsValid.lastName = defaultValue;
      isValid = false;
    }

    if (localAdress.emailAdress === '') {
      checkedIsValid.emailAdress = defaultValue;
      isValid = false;
    } else {
      if (!MailValidator.validateMail(localAdress.emailAdress)) {
        checkedIsValid.emailAdress = CustomTextInput.fieldStatus.INVALID;
        checkedIsValid.emailAdressWrongFormat = true;
        isValid = false;
      }
    }

    if (localAdress.emailAdressConfirmation === '') {
      checkedIsValid.emailAdressConfirmation = defaultValue;
      isValid = false;
    } else {
      if (!MailValidator.validateMail(localAdress.emailAdressConfirmation)) {
        checkedIsValid.emailAdressConfirmation =
          CustomTextInput.fieldStatus.INVALID;
        checkedIsValid.emailAdressConfirmationWrongFormat = true;
        isValid = false;
      } else {
        if (
          localAdress.emailAdress !== '' &&
          localAdress.emailAdressConfirmation !== ''
        ) {
          if (localAdress.emailAdress != localAdress.emailAdressConfirmation) {
            console.log('Invalid mismatch.');
            checkedIsValid.emailAdressConfirmation =
              CustomTextInput.fieldStatus.INVALID;
            checkedIsValid.emailAdressMismatch = true;
            isValid = false;
          }
        }
      }
    }

    if (deliveryType === 'home') {
      if (localAdress.address === '') {
        checkedIsValid.address = defaultValue;
        isValid = false;
      }

      if (localAdress.zipCode === '') {
        checkedIsValid.zipCode = defaultValue;
        isValid = false;
      }

      if (localAdress.city === '') {
        checkedIsValid.city = defaultValue;
        isValid = false;
      }

      if (localAdress.phoneNumber === '') {
        checkedIsValid.phoneNumber = defaultValue;
        isValid = false;
      } else {
        if (!phoneTest.test(localAdress.phoneNumber)) {
          checkedIsValid.phoneNumber = CustomTextInput.fieldStatus.INVALID;
          checkedIsValid.phoneNumberWrongFormat = true;
          isValid = false;
        }
      }
    }
    setLocalValid(checkedIsValid);
    setMainValidFlag(isValid);
    return isValid;
  }

  function _gotoSummary() {
    props.navigation.navigate('TunnelCartSummary', {
      selectedItem: selectedItem,
      selectedProducts: selectedProducts,
      deliveryType: deliveryType,
      userAdress: localAdress,
      selectedPickup: selectedPickup,
      selectedReferent: selectedReferent,
    });
  }

  async function _checkBeforeGotoSummary() {
    const _isOrderAllowed = await RemoteApi.isAllowedOrder(
      selectedItem,
      localAdress,
    );

    if (!_isOrderAllowed || !_isOrderAllowed.isAllowed) {
      setDisallowOrder(false);

      return;
    }
    // A DECOMMENTER UNE FOIS LA REQUÊTE VALIDEE
    // const _isAllowedFromUser = await UserService.isOrderAllowed();
    const _isAllowedFromUser = true;

    console.log('ALLOWED : ' + _isAllowedFromUser);

    if (!_isAllowedFromUser) {
      setDisallowOrder(false);

      return;
    }

    setDisallowOrder(false);

    if (deliveryType === 'home') {
      _validateAddressBeforeGoto();
    } else {
      _gotoSummary();
    }
  }

  function _onDone() {
    const isValid = _validateFields(CustomTextInput.fieldStatus.INVALID);

    if (isValid && !invalidZipCode) {
      _checkBeforeGotoSummary();
    }
  }

  function _goBack() {
    if (deliveryType === 'home') {
      props.navigation.navigate('TunnelDeliverySelect', {
        selectedItem: selectedItem,
        selectedProducts: selectedProducts,
      });
    } else if (deliveryType === 'referent') {
      props.navigation.navigate('TunnelReferentSelect', {
        selectedItem: selectedItem,
        selectedProducts: selectedProducts,
        selectedReferent: selectedReferent,
      });
    } else {
      props.navigation.navigate('TunnelPickupSelect', {
        selectedItem: selectedItem,
        selectedProducts: selectedProducts,
        selectedPickup: selectedPickup,
      });
    }
  }

  async function _handleZipCode(zipCode) {
    const localValue = zipCode.replace(/[^0-9]/g, '');

    if (!isNaN(localValue)) {
      if (localAdress['zipCode'] !== zipCode && zipCodeTest.test(localValue)) {
        const _foundCity = await AddressValidator.validateZipCodeLocality(
          localValue,
        );

        if (_foundCity) {
          localAdress['city'] = _foundCity.city;
          localAdress['zipCode'] = localValue;

          setLocalAdress(localAdress);
          _validateFields(CustomTextInput.fieldStatus.NEUTRAL);
        }
      }
    }
  }

  function _handleChange(name, inputValue) {
    const value = inputValue.trim();

    if (name === 'zipCode') {
      if (AddressValidator.validateZipCode(value)) {
        setInvalidZipCode(false);
        _handleZipCode(value);
      } else {
        setInvalidZipCode(true);
      }
    } else {
      localAdress[`${name}`] = value;

      setLocalAdress(localAdress);
      _validateFields(CustomTextInput.fieldStatus.NEUTRAL);
    }
  }

  return (
    <ScrollView
      style={[
        Styles.flexOne,
        {
          backgroundColor: Colors.backgroundColor,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 5,
        },
      ]}>
      <Backlink step={3} onPress={_goBack} />

      <View style={flexstyletext}>
        <Text style={Styles.tunnelTitle}>Complète tes informations</Text>
      </View>

      <CustomTextInput
        inputLabel="Prénom"
        inputPlaceholder="Ton Prénom"
        onChangeText={val => _handleChange('firstName', val)}
        isValid={localValid.firstName}
        currentValue={localAdress.firstName}
        name="firstName"
      />
      <CustomTextInput
        inputLabel="Nom"
        inputPlaceholder="Ton Nom"
        onChangeText={val => _handleChange('lastName', val)}
        isValid={localValid.lastName}
        currentValue={localAdress.lastName}
        name="lastName"
      />
      <CustomTextInput
        inputLabel="Adresse e-mail"
        inputPlaceholder="Ton adresse e-mail"
        onChangeText={val => _handleChange('emailAdress', val)}
        isValid={localValid.emailAdress}
        emailAdressWrongFormat={localValid.emailAdressWrongFormat}
        currentValue={localAdress.emailAdress}
        name="emailAdress"
      />

      <CustomTextInput
        inputLabel="Confirmation adresse e-mail"
        inputPlaceholder="Confirme ton adresse e-mail"
        onChangeText={val => _handleChange('emailAdressConfirmation', val)}
        isValid={localValid.emailAdressConfirmation}
        emailAdressWrongFormat={localValid.emailAdressConfirmationWrongFormat}
        emailAdressMismatch={localValid.emailAdressMismatch}
        currentValue={localAdress.emailAdressConfirmation}
        name="emailAdressConfirmation"
      />

      {deliveryType === 'home' && (
        <CustomTextInput
          inputLabel="Numéro de téléphone"
          inputPlaceholder="Ton numéro de téléphone"
          onChangeText={val => _handleChange('phoneNumber', val)}
          isValid={localValid.phoneNumber}
          currentValue={localAdress.phoneNumber}
          phoneNumberWrongFormat={localValid.phoneNumberWrongFormat}
          name="phoneNumber"
          filterNumbers={true}
        />
      )}

      {deliveryType === 'home' && (
        <View>
          <CustomTextInput
            inputLabel="Adresse"
            inputPlaceholder="Ton adresse"
            onChangeText={val => _handleChange('address', val)}
            isValid={localValid.address}
            currentValue={localAdress.address}
            name="adress"
          />
          <CustomTextInput
            inputLabel="Complément d'adresse"
            inputPlaceholder="Bâtiment, lieu-dit, nom sur la boîte, etc."
            onChangeText={val => _handleChange('adressMore', val)}
            currentValue={localAdress.adressMore}
            name="adressMore"
            isRequired={false}
          />
          <CustomTextInput
            inputLabel="Code Postal"
            inputPlaceholder="Ton code postal"
            onChangeText={val => _handleChange('zipCode', val)}
            isValid={localValid.zipCode}
            currentValue={localAdress.zipCode}
            filterNumbers={true}
            name="zipCode"
          />
          <CustomTextInput
            inputLabel="Ville"
            inputPlaceholder="Ta ville"
            onChangeText={val => _handleChange('city', val)}
            isValid={localValid.city}
            currentValue={localAdress.city}
            name="city"
          />
        </View>
      )}
      {deliveryType === 'home' && invalidAddress && (
        <View style={TunnelUserAdressStyle.requiredFieldsWrapper}>
          <View style={{flex: 1}}>
            <Text
              style={[
                Styles.placeholderText,
                {fontSize: 14, color: '#C80352', fontFamily: 'Chivo-Regular'},
              ]}>
              L&apos;adresse indiquée semble invalide. Merci de vérifier les
              informations.
            </Text>
          </View>
        </View>
      )}
      {deliveryType === 'home' && invalidZipCode && (
        <View style={TunnelUserAdressStyle.requiredFieldsWrapper}>
          <View style={{flex: 1}}>
            <Text
              style={[
                Styles.placeholderText,
                {fontSize: 14, color: '#C80352', fontFamily: 'Chivo-Regular'},
              ]}>
              Aïe ! Cette zone n&apos;est pas encore disponible à la livraison.
            </Text>
          </View>
        </View>
      )}
      {disallowOrder && (
        <View style={TunnelUserAdressStyle.requiredFieldsWrapper}>
          <View style={{flex: 1}}>
            <Text
              style={[
                Styles.placeholderText,
                {fontSize: 14, color: '#C80352', fontFamily: 'Chivo-Regular'},
              ]}>
              La commande de box est à ce jour limitée. Tente ta chance plus
              tard et n&apos;hésite pas à nous faire des retours !
            </Text>
          </View>
        </View>
      )}
      <View style={TunnelUserAdressStyle.requiredFieldsWrapper}>
        <View style={{flex: 1}}>
          <Text
            style={[
              Styles.placeholderText,
              {fontSize: 13, color: '#C80352', fontFamily: 'Chivo-Regular'},
            ]}>
            * Champs obligatoires pour le suivi et la réception de ta commande
          </Text>
        </View>
      </View>
      <View style={Styles.viewopacitytunneletap3}>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingTop: 15,
            paddingBottom: 2,
            width: '40%',
            height: 75,
          }}
          onPress={_onDone}>
          <View style={Styles.tunnelButton}>
            <Text
              style={
                mainValidFlag
                  ? Styles.tunnelButtonText
                  : Styles.tunnelButtonTextOpaque
              }>
              Suivant
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
