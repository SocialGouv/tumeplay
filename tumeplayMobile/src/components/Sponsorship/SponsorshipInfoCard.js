import {View, StyleSheet} from 'react-native';
import Text from '../Text';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import AppContext from '../../../AppContext';

const SponsorshipInfoCard = ({sponsor_code}) => {
  const [numberOfSponsors, setNumberOfSponsors] = useState(0);
  const {apiUrl, reloadUser} = useContext(AppContext);

  const handleNumberOfSponsors = async () => {
    let res = await axios.get(
      `${apiUrl}/utilisateurs-mobiles/count?sponsor_code=${sponsor_code}`,
    );
    setNumberOfSponsors(res.data);
    reloadUser();
  };

  useEffect(() => {
    handleNumberOfSponsors();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greyText}>Tu as parrainé</Text>
        <Text style={styles.blackText}>{numberOfSponsors} / 3</Text>
      </View>
      {/* <View style={styles.textContainer}>
        <Text style={styles.greyText}>1 kit à gagner</Text>
        <Text style={styles.blackText}>{numberOfSponsors >= 3 ? 1 : 0}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    maxHeight: 90,
    flexDirection: 'row',
    marginTop: 40,
  },
  textContainer: {
    borderWidth: 1,
    borderColor: '#EAE2D7',
    flexGrow: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyText: {
    color: '#00000080',
    opacity: 0.5,
  },
  blackText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 5,
  },
});

export default SponsorshipInfoCard;
