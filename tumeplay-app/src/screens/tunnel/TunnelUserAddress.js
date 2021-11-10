import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Picker,
} from 'react-native';
import PropTypes from 'prop-types';
import openGeocoder from 'node-open-geocoder';
import _ from 'lodash';

import Colors from '../../styles/Color';
import Styles from '../../styles/Styles';
import TunnelUserAdressStyle from '../../styles/components/TunnelUserAdress';

import Backlink from '../components/tunnel/Backlink';
import CustomTextInput from '../components/tunnel/CustomTextInput';

import useIsMounted from '../../hooks/isMounted';
import AddressValidator from '../../services/AddressValidator';
import MailValidator from '../../services/MailValidator';

const zipCodeTest = /^[0-9]{5}$/;
export const phoneTest = /^0[0-9]{9}$/;

const screenWidth = Math.round(Dimensions.get('window').width);

const REACT_APP_ZONE = process.env.REACT_APP_ZONE;

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
    phoneNumber: '',
    address: '',
    addressMore: '',
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
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setInvalidAddress(false);
    if (props.navigation.state.params.userAdress) {
      const userAdress = props.navigation.state.params.userAdress;
      const newAdress = {
        firstName: userAdress.firstName,
        lastName: userAdress.lastName,
        emailAdress: userAdress.emailAdress,
        phoneNumber: userAdress.phoneNumber,
        address: userAdress.address,
        addressMore: userAdress.addressMore,
        zipCode: userAdress.zipCode,
        city: userAdress.city,
      };

      setLocalAdress(newAdress);
    }
  }, [isMounted, props.navigation.state.params.userAdress]);

  async function _validateAddressBeforeGoto() {
    const response = await fetch(
      'https://geo.api.gouv.fr/communes?codePostal=' + localAdress.zipCode,
    );
    const json_response = await response.json();
    if (json_response && json_response[0]) {
      const codeDept = json_response[0].codeDepartement;
      const codeRegion = json_response[0].codeRegion;

      const responseDept = await fetch(
        'https://geo.api.gouv.fr/departements/' + codeDept,
      );
      const responseRegion = await fetch(
        'https://geo.api.gouv.fr/regions/' + codeRegion,
      );

      const json_dept = await responseDept.json();
      const json_region = await responseRegion.json();

      localAdress['address_region'] = json_region.nom;
      localAdress['address_dept'] = json_dept.nom;
      localAdress['address_deptcode'] = json_dept.code;
      _gotoSummary();
    }
    setInvalidAddress(true);
  }

  function _validateFields(defaultValue) {
    let isValid = true;

    // Reset all validations
    const checkedIsValid = defaultIsValid;

    if (localAdress.firstName === '') {
      checkedIsValid.firstName = defaultValue;
      isValid = false;
    }

    if (localAdress.lastName === '' && !deliveryType.includes('referent')) {
      checkedIsValid.lastName = defaultValue;
      isValid = false;
    }

    if (localAdress.emailAdress === '' && !deliveryType.includes('referent')) {
      checkedIsValid.emailAdress = defaultValue;
      isValid = false;
    } else if (!deliveryType.includes('referent')) {
      if (!MailValidator.validateMail(localAdress.emailAdress)) {
        checkedIsValid.emailAdress = CustomTextInput.fieldStatus.INVALID;
        checkedIsValid.emailAdressWrongFormat = true;
        isValid = false;
      }
    }

    if (deliveryType.includes('referent')) {
      if (localAdress.phoneNumber !== '') {
        if (!phoneTest.test(localAdress.phoneNumber)) {
          checkedIsValid.phoneNumber = CustomTextInput.fieldStatus.INVALID;
          checkedIsValid.phoneNumberWrongFormat = true;
          isValid = false;
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
    // A DECOMMENTER UNE FOIS LA REQUÊTE VALIDEE
    // const _isAllowedFromUser = await UserService.isOrderAllowed();
    const _isAllowedFromUser = true;
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
    } else if (deliveryType === 'referent-guyane') {
      props.navigation.navigate('TunnelReferentSelectGuyane', {
        selectedItem: selectedItem,
        selectedProducts: selectedProducts,
        selectedReferent: selectedReferent,
      });
    } else if (deliveryType === 'referent-metropole') {
      props.navigation.navigate('TunnelReferentSelectMetropole', {
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
    localAdress['city'] = '';
    setCities([]);
    const localValue = zipCode.replace(/[^0-9]/g, '');

    if (!isNaN(localValue)) {
      if (localAdress['zipCode'] !== zipCode && zipCodeTest.test(localValue)) {
        const _foundCities = await AddressValidator.validateZipCodeLocality(
          localValue,
        );
        setCities(_foundCities.map(city => city.properties));
        if (_foundCities[0]) {
          localAdress['city'] = _foundCities[0].properties.label;
        }
      }
      localAdress['zipCode'] = localValue;
    }
    setLocalAdress(localAdress);
  }

  function _handleChange(name, inputValue) {
    const value = inputValue.trim();
    if (name === 'zipCode') {
      _handleZipCode(value);
      if (AddressValidator.validateZipCode(value)) {
        setInvalidZipCode(false);
      } else {
        setInvalidZipCode(true);
      }
      _validateFields(CustomTextInput.fieldStatus.NEUTRAL);
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
      {deliveryType.includes('referent') ? (
        <CustomTextInput
          inputLabel="Numéro de téléphone"
          inputPlaceholder="Ton numéro de téléphone"
          onChangeText={val => _handleChange('phoneNumber', val)}
          isValid={localValid.phoneNumber}
          isRequired={false}
          currentValue={localAdress.phoneNumber}
          phoneNumberWrongFormat={localValid.phoneNumberWrongFormat}
          name="phoneNumber"
          filterNumbers={true}
        />
      ) : (
        <>
          <CustomTextInput
            inputLabel="Nom"
            inputPlaceholder="Ton Nom"
            onChangeText={val => _handleChange('lastName', val)}
            isValid={localValid.lastName}
            currentValue={localAdress.lastName}
            name="lastName"
          />
        </>
      )}

      <CustomTextInput
        inputLabel="Adresse e-mail"
        isRequired={!deliveryType.includes('referent')}
        inputPlaceholder="Ton adresse e-mail"
        onChangeText={val => _handleChange('emailAdress', val)}
        isValid={localValid.emailAdress}
        emailAdressWrongFormat={localValid.emailAdressWrongFormat}
        currentValue={localAdress.emailAdress}
        name="emailAdress"
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
            onChangeText={val => _handleChange('addressMore', val)}
            currentValue={localAdress.addressMore}
            name="addressMore"
            isRequired={false}
          />
          <CustomTextInput
            inputLabel="Code Postal"
            inputPlaceholder="Ton code postal"
            onChangeText={val => _handleChange('zipCode', val)}
            isValid={!invalidZipCode}
            currentValue={localAdress.zipCode}
            filterNumbers={true}
            name="zipCode"
          />
          {cities.length > 0 && (
            <>
              <Text style={[Styles.labelText, {marginTop: '25px'}]}>Ville</Text>
              <Picker
                selectedValue={localAdress.city}
                style={[
                  TunnelUserAdressStyle.requiredFieldsWrapper,
                  {
                    borderRadius: '5px',
                    borderColor: Colors.mainButton,
                    marginTop: 0,
                  },
                ]}
                onValueChange={val => _handleChange('city', val)}>
                {cities.map((city, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={city.label}
                      value={city.label}
                    />
                  );
                })}
              </Picker>
            </>
          )}
          {/* <CustomTextInput
            inputLabel="Ville"
            inputPlaceholder="Ta ville"
            onChangeText={val => _handleChange('city', val)}
            isValid={localValid.city}
            currentValue={localAdress.city}
            name="city"
          /> */}
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
      {deliveryType === 'home' && cities.length > 0 && invalidZipCode && (
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

      <View>
        <TouchableOpacity style={Styles.tunnelButton} onPress={_onDone}>
          <Text style={Styles.tunnelButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
