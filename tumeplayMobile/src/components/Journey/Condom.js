import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Condom = props => {
  const {style, doneModules_ids} = props;
  const condomsStep = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [condomStratCompleted, setCondomStratCompleted] = useState(1);

  const handleCondomStratCompleted = () => {
    if (doneModules_ids.length <= 10) {
      setCondomStratCompleted(doneModules_ids.length);
    } else {
      setCondomStratCompleted(doneModules_ids.length % 10);
    }
  };

  useEffect(() => {
    handleCondomStratCompleted();
  }, [doneModules_ids]);

  const condom = condomsStep.map((_condom, index) => {
    let stepstyles = [];
    condomsStep.forEach((_condom, index) => {
      if (index === 0) {
        stepstyles.push({
          width: 25,
          height: 18,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          border: 1,
          borderWidth: 1,
          marginBottom: 1,
          borderColor: '#F7EFE6',
          backgroundColor: '#FBF7F2',
        });
      } else if (index === 1) {
        stepstyles.push({
          width: 55,
          height: 16,
          border: 1,
          borderWidth: 1,
          marginBottom: 1,
          borderColor: '#F7EFE6',
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          backgroundColor: '#FBF7F2',
        });
      } else if (index === 2) {
        stepstyles.push({
          width: 60,
          height: 16,
          border: 1,
          borderTopEndRadius: 5,
          borderTopStartRadius: 5,
          topWidth: 0.5,
          borderWidth: 0.5,
          marginBottom: 1,
          borderColor: '#F7EFE6',
          backgroundColor: '#FBF7F2',
        });
      } else if (index === 9) {
        stepstyles.push({
          width: 76,
          height: 16,
          borderRadius: 50,
          border: 1,
          borderWidth: 0.5,
          marginBottom: 1,
          borderColor: '#F7EFE6',
          backgroundColor: '#FBF7F2',
        });
      } else {
        stepstyles.push({
          width: 60,
          height: 16,
          border: 1,
          borderWidth: 0.5,
          marginBottom: 1,
          borderColor: '#F7EFE6',
          backgroundColor: '#FBF7F2',
        });
      }
    });

    const colors = {
      0: ['#D42201', '#D42201'],
      1: ['#DB4D18', '#DE6525'],
      2: ['#E0722C', '#E38737'],
      3: ['#E5903C', '#E9AB4A'],
      4: ['#EBB54F', '#E2BF57'],
      5: ['#D8BE59', '#C4BC5C'],
      6: ['#BABB5E', '#A7B961'],
      7: ['#9DB863', '#88B667'],
      8: ['#80B568', '#6BB36C'],
      9: ['#51B070', '#51B070'],
    };

    return 10 - condomStratCompleted <= index ? (
      <LinearGradient
        colors={colors[index]}
        key={index}
        style={stepstyles[index]}
      />
    ) : (
      <View key={index} style={stepstyles[index]} />
    );
  });

  return <View style={[styles.container, style]}>{condom}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 50,
  },
});

export default Condom;
