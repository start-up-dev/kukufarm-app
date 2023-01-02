import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import moment from 'moment';
import Text from 'components/Text';
import {theme} from 'styles/theme';

const CountDown = () => {
  const [time, setTime] = useState<number>(0);

  const measureDiff = () => {
    // const now = moment().add(1, 'hours');
    // const tomorrow = moment().add(1, 'hours').endOf('days');
    const now = moment();
    const tomorrow = moment().endOf('days');
    let diff = moment(tomorrow).diff(now, 'milliseconds');
    setTime(diff);
  };

  useEffect(() => {
    measureDiff();
    const interval = setInterval(() => {
      setTime(prev => prev - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const msToTime = (duration: number) => {
    (seconds = Math.floor((duration / 1000) % 60)),
      (minutes = Math.floor((duration / (1000 * 60)) % 60)),
      (hours = Math.floor((duration / (1000 * 60 * 60)) % 24));

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
  };

  return (
    <View style={{margin: 50, marginBottom: 19}}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          fontWeight: 'normal',
        }}
        color="#555">
        If you do not check in before the time expires your emergency contacts
        will be alerted.
      </Text>
      <View style={{marginTop: 15}}>
        <View
          style={{
            width: 100,
            height: 5,
            backgroundColor: theme.colors.primary,
            alignSelf: 'center',
            marginBottom: 5,
          }}
        />
        <View
          style={{
            borderWidth: 8,
            borderColor: theme.colors.primary,
            borderRadius: 5,
            alignSelf: 'center',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 50,
              textAlign: 'center',
              // marginBottom: 25,
              color: '#F05A29',
              // fontFamily: 'Technology',
            }}>
            {msToTime(time)}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View
            style={{
              width: 30,
              height: 15,
              backgroundColor: theme.colors.primary,
              alignSelf: 'center',
              marginTop: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
          <View
            style={{
              width: 30,
              height: 15,
              backgroundColor: theme.colors.primary,
              alignSelf: 'center',
              marginTop: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CountDown;
