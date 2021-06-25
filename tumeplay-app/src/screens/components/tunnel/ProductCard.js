import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../../styles/Color';
import Styles from '../../../styles/Styles';
import UnderlineText from '../global/UnderlineText';
import CustomTouchableOpacity from '../global/CustomTouchableOpacity';

ProductCard.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  navigation: PropTypes.object
};

export default function ProductCard(props) {
  const [productBox] = useState(props.item);

  const cardStyle = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      opacity: productBox.__typename === 'Box' && !productBox.available ? 0.1 : 1,
      borderRadius: 7,
      marginTop: 20,
      position: 'relative',
    },
    buttonWrapper: {
      flex: 1,
    },
    picture: {
      height: 250,
      width: '100%',
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
    },
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
      fontSize: 14,
      marginBottom: 25,
      marginTop: 10,
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
    },
    plusPicture: {
      marginRight: 3,
      width: 16,
      height: 16,
      marginTop: 3,
      paddingTop: 0,
      resizeMode: 'contain',
    },
    descriptionCard: {
      position: 'absolute',
      top: '35%',
      left: '35%',
      marginHorizontal: 'auto',
      opacity: 1,
      zIndex: 10
    },
    descriptionTitle: {
      color: "#FFFF",
      fontFamily: Colors.appTitleFont,
      fontSize: 30,
      marginBottom: 5,
    },
    descriptionButton: {
      backgroundColor: 'rgb(200,3,82)',
      paddingHorizontal: 10,
      textAlign: 'center',
      paddingVertical: 10,
      borderRadius: 30,
    },
    descriptionText: {
      color: "#FFFF",
    },
    notAvailableWrapper: {
      position: 'absolute',
      flex: 1,
      zIndex: 1,
      width: '100%',
      height: '100%',
      borderRadius: 7,
      top: 0,
      left: 0,
      backgroundColor: 'rgba(200,3,82, 0.5)',
      paddingTop: '35%',
    },
    notAvailableTextWrapper: {
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
    },
    notAvailableText: {
      textAlign: 'center',
      fontSize: 20,
      fontFamily: Colors.titleCard,
      color: '#FFFFFF',
      paddingLeft: 20,
      paddingRight: 20,
    },
  });

  const handleAvailability = () => {
    if(productBox.__typename === 'BoxSurMesure') {
      props.onPress()
    } else if (productBox.__typename === 'Box' && productBox.available) {
      props.onPress()
    } 
  };

  const redirectContact = () => {
   props.navigation.navigate('StayInTouch', {
     box_id: props.item.id
   })
  }

  return (
    <>
      {
        !productBox.available ? 
        <View style={cardStyle.descriptionCard}>
          <Text style={cardStyle.descriptionTitle}>Box indisponible</Text>
          <CustomTouchableOpacity style={cardStyle.descriptionButton} onPress={() => {redirectContact()}}>
            <Text style={cardStyle.descriptionText}>Laisse nous tes coordonnées</Text>
          </CustomTouchableOpacity>
        </View>
        :
          null
      }
    <View style={cardStyle.container}>
      <CustomTouchableOpacity
        style={cardStyle.buttonWrapper}
        disabled={productBox.__typename === 'Box' && !productBox.available}
        onPress={() => {handleAvailability()}}>
        <Image
          source={process.env.REACT_APP_API_URL + productBox.image.url}
          style={cardStyle.picture}
        />
        <View style={cardStyle.textContainer}>
          <Text style={cardStyle.title}>{productBox.title}</Text>
          <Text style={cardStyle.text}>{productBox.description}</Text>
        </View>

        <View style={cardStyle.readMoreWrapper}>
          <Image
            style={cardStyle.plusPicture}
            source={require('../../../assets/pictures/plus-orange.png')}
          />
          <Text style={cardStyle.readMore}>Plus d&apos;infos</Text>
        </View>
      </CustomTouchableOpacity>
    </View>
    </>
  );
}
