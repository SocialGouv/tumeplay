const AddressValidator = {
  allowedZipCodes: [
    '16',
    '17',
    '19',
    '23',
    '24',
    '33',
    '40',
    '47',
    '64',
    '75',
    '77',
    '78',
    '79',
    '86',
    '87',
    '91',
    '92',
    '93',
    '94',
    '95',         
  ],
  zipCodeTest: /^[0-9]{5}$/,
  zipCodePartTest: /^[0-9]{2}$/,

  validateZipCode: zipCode => {
    try {
      const firstPart = zipCode.substring(0, 2);

      return AddressValidator.allowedZipCodes.indexOf(firstPart) >= 0;
    } catch (e) {
      throw Error(e);
    }

    return false;
  },

  validateZipCodePart: zipCode => {
    try {
      return AddressValidator.zipCodePartTest.test(zipCode);
    } catch (e) {
      throw Error(e);
    }

    return false;
  },
  
  validateZipCodeLocality: async(zipCode) => {
    try {
      const response = await fetch("https://api-adresse.data.gouv.fr/search/?q=" + zipCode + "&format=json&postcode=" + zipCode + "&limit=50&type=municipality");
      const jsonParsed = await response.json();
      let   _return    = false;
      
      if( jsonParsed && jsonParsed.features && jsonParsed.features.length > 0 )
      {
          _return = { city : jsonParsed.features[0].properties.name };
      }
      
      return _return;
    } catch (e) {
      throw Error(e);
    }
  }
};
export default AddressValidator;
