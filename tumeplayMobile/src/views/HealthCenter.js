import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Container from '../components/global/Container';
import Title from '../components/Title';

const HealthCenter = props => {
  const webViewRef = useRef(null);
  const mapStyle = () => {
    const script = `
      var elements = document.getElementsByClassName('descriptif-bas');
      if (elements.length > 0) {
        elements[0].style.display = 'none';
      }
      var controlElement = document.getElementsByClassName('leaflet-top');
      if (controlElement.length > 0) {
        controlElement[0].style.top = '50%';
      }

      var filterElement = document.getElementsByClassName('dialog-off-canvas-main-canvas');
      if (filterElement.length > 0) {
        var nestedElements = filterElement[0].getElementsByClassName('filter');
        if (nestedElements.length > 0) {
          nestedElements[0].style.background = '#FBF7F2';
          nestedElements[0].style.margin = "0";
          nestedElements[0].style.paddingTop = "15px";
          nestedElements[0].style.position = "fixed"
          nestedElements[0].style.top = "0";
          nestedElements[0].style.zIndex = "999"
          nestedElements[0].style.width = "100%"
        }
      }
    `;
    webViewRef.current.injectJavaScript(script);
  };

  return (
    <Container style={styles.container}>
      <Title title="Centres" />
      <WebView
        ref={webViewRef}
        source={{
          uri: 'https://www.sante.fr/ressources/iframe-6734099?partenaire=Onsexprime&s=580&l=600&xl=600',
        }}
        style={styles.iframeStyle}
        geolocationEnabled={true}
        onLoad={mapStyle}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 21,
  },
  iframeStyle: {flex: 1, height: 500, marginTop: 20},
});

export default HealthCenter;
