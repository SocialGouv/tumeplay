/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {createAppContainer} from 'react-navigation'; //@TODO : Check package lint error
import React, {useState} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';

import AppStack from './src/routes/routes';
import AppSlider from './src/canvas/slider/AppSlider';
import Styles from './src/styles/Styles';

const AppContainer = createAppContainer(AppStack);

export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);

  function _renderItem({item}) {
    if (screenWidth <= 320) {
      return (
        <View style={Styles.slide}>
          <View
            style={{
              flex: 8,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Image style={Styles.contentPicture} source={item.image} />
          </View>
          <View style={{flex: 1, alignSelf: 'center'}}>
            <Text style={Styles.appTitle}>{item.title}</Text>
          </View>
          <View style={{flex: 4, alignSelf: 'center'}}>
            <Text style={Styles.text}>{item.text}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={Styles.slide}>
          <View
            style={{
              flex: 8,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Image style={Styles.contentPicture} source={item.image} />
          </View>
          <View style={{flex: 1, alignSelf: 'center'}}>
            <Text style={Styles.appTitle}>{item.title}</Text>
          </View>
          <View style={{flex: 3, alignSelf: 'center'}}>
            <Text style={Styles.text}>{item.text}</Text>
          </View>
        </View>
      );
    }
  }

  function _onDone() {
    setShowRealApp(true);
  }

  if (showRealApp) {
    return <AppContainer />;
  } else {
    return (
      <AppSlider
        renderItem={_renderItem}
        slides={slides}
        onDone={_onDone}
        showSkipButton
        showPrevButton
        bottomButton
        nextLabel="Suivant"
        skipLabel="Passer"
        doneLabel="Terminer"
        prevLabel="Retour"
        onSkip={_onDone}
      />
    );
  }
}

/*
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
          	<View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle} >Welcome to PassPréservatif</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
*/
