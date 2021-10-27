import React, { useState } from 'react';
import {View, Text} from 'react-native';


const TimeTable = (props) => {
  const {localHeight, timeTable} = props;
  const displayTimeLines = () => {
   return(timeTable.map((item) => {
     let hours = item.value.map((h) => {
       if(h === "0000") {
         return(
           null
         )
       } else if (item.type === 'referent') {
          //Managa data coming from Back Office
           return(
             <Text style={{marginRight: 10,
                           marginVertical: 5,
                           lineHeight: 21,
                           color: '#4F4F4F',
                           fontSize: 12,
                           fontFamily: 'Chivo-Regular',
                           flexWrap: 'wrap',}}>
                {h}
              </Text>
           )
        } else {
        //Managa data coming from Mondial Relay
          return(
            <Text style={{marginRight: 10,
                          marginVertical: 5,
                          lineHeight: 21,
                          color: '#4F4F4F',
                          fontSize: 12,
                          fontFamily: 'Chivo-Regular',
                          flexWrap: 'wrap',}}>
              {h.substring(0,2) + "h" + h.substring(2, h.length)}
            </Text>
          )
        }
      })
      if(!hours[0]) {
        hours = <Text style={{marginRight: 40,
                              marginVertical: 5,
                              lineHeight: 21,
                              color: '#4F4F4F',
                              fontSize: 12,
                              fontFamily: 'Chivo-Regular',
                              flexWrap: 'wrap'}}>
                    Fermé
                  </Text>
      }
      return(
        <View style={{flexDirection: 'col', justifyContent: 'space-between'}}>
          <Text style={{lineHeight: 21,
											color: '#4F4F4F',
											fontSize: 12,
											fontFamily: 'Chivo-Regular',
											flexWrap: 'wrap'}}>
						{item.day}
					</Text>
          <Text>{hours}</Text>
        </View>
      )
    }))
  }

  return(
    <View style={{height: localHeight, overflow: 'hidden', paddingLeft: 27}}>
      {timeTable && displayTimeLines()}
    </View>
  )
}

export default TimeTable;
