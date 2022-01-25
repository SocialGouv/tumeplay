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
    '973',
  ],
  zipCodeTest: /^[0-9]{5}$/,
  zipCodePartTest: /^[0-9]{2}$/,
  zipCodePartTestGuy: /^[0-9]{3}$/,

  validateZipCode: zipCode => {
    try {
      let firstPart;
			if (zipCode.substring(0, 2) !== '97') {
				firstPart = zipCode.substring(0, 2);
			} else {
      	firstPart = zipCode.substring(0, 3);
			}
      return zipCode.length === 5 && AddressValidator.allowedZipCodes.indexOf(firstPart) >= 0;
    } catch (e) {
      throw Error(e);
    }

    return false;
  },

  validateZipCodePart: zipCode => {
    try {
      if(zipCode.substring(0, 2) === '97') {
        return AddressValidator.zipCodePartTestGuy.test(zipCode);
      } else {
        return AddressValidator.zipCodePartTest.test(zipCode);
      }
    } catch (e) {
      throw Error(e);
    }

    return false;
  },

  validateZipCodeLocality: async(zipCode) => {
    try {
      const response = await fetch("https://api-adresse.data.gouv.fr/search/?q=" + zipCode + "&format=json&postcode=" + zipCode + "&limit=50&type=municipality");
      const jsonParsed = await response.json();
      return jsonParsed.features;
    } catch (e) {
      throw Error(e);
    }
  }
};
export default AddressValidator;
