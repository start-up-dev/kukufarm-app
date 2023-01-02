import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  useColorScheme,
  View,
  Text,
  Image as RNImage,
  StyleSheet,
} from 'react-native';
import Svg, {G, Image} from 'react-native-svg';
import {Circle} from 'react-native-progress';
import {GradientCircularProgress} from 'react-native-circular-gradient-progress';
import styled, {ThemeProvider} from 'styled-components';

import {useInterval} from 'hooks/useInterval';

import imgClock from 'assets/images/clock.png';
import imgLogo from 'assets/images/logo.png';

export const lightTheme = {
  style: 'light',
  bgColor: 'white',
  primaryColor: '#333',
  secondaryColor: '#555',
  accentColor: '#F32013',
};

export const darkTheme = {
  style: 'dark',
  bgColor: '#111',
  primaryColor: '#fff',
  secondaryColor: '#CACACA',
  accentColor: '#4aefd5',
};

import {
  getTime,
  getCheckInProgress,
  getDisplayTime,
  VALUE_CHECKIN_RED,
} from 'utils/time';
import {theme} from 'styles/theme';
import {useCustomSelector} from 'store';
const screenSize = Dimensions.get('window');

const ClockFace = (props: any) => {
  const width = screenSize.width * 0.51 || Dimensions.get('window').width;
  const clockWidth = width * 0.8;
  const diameter = clockWidth - 40;
  const center = clockWidth / 2;
  const radius = diameter / 2;

  const {userData} = useCustomSelector(state => state.auth);

  let [time, setTime] = useState(getTime);
  const themes = useColorScheme() === 'dark' ? darkTheme : lightTheme;
  useInterval(() => {
    setTime(getTime);
  }, 1000);

  let checkInTime = userData?.checkInTime;
  let lastCheckInTime = userData?.lastCheckInTime;

  // const {checkInTime, lastCheckInTime} = props?.checkin;
  let progress = getCheckInProgress(checkInTime, lastCheckInTime);
  const displayTime = checkInTime ? getDisplayTime(checkInTime) : null;

  progress = progress * 2;
  let color = theme.colors.brandWarning;
  if (progress < VALUE_CHECKIN_RED * 2) color = theme.colors.brandDanger;
  let outProgress = progress - 1;

  time.hours += time.minutes / 12;
  const orgSize = screenSize.width * 0.53;
  const progSize = Math.floor(orgSize / 10) * 10;
  const offset = (orgSize - progSize) / 2;

  return (
    <View style={styles.clockContainer}>
      {checkInTime ? (
        <View
          style={{
            position: 'absolute',
            transform: [{scaleX: -1}],
          }}>
          <GradientCircularProgress
            startColor="#e93f3a"
            middleColor="#f1823a"
            endColor="#fde53b"
            size={progSize}
            strokeWidth={2}
            progress={progress * 100}
            withSnail
          />
        </View>
      ) : null}
      {checkInTime && outProgress > 0 ? (
        <View style={{position: 'absolute', transform: [{scaleX: -1}]}}>
          <GradientCircularProgress
            startColor="#fde53b"
            middleColor={theme.colors.primary}
            endColor={theme.colors.primary}
            size={progSize}
            strokeWidth={2}
            progress={outProgress * 100}
            withSnail
          />
        </View>
      ) : null}
      {checkInTime && progress == 0 ? (
        <View style={{position: 'absolute', transform: [{scaleX: -1}]}}>
          <Circle
            color="#e93f3a"
            size={progSize}
            progress={0}
            strokeCap="round"
            borderWidth={0}
            thickness={10}
            direction="counter-clockwise"
          />
        </View>
      ) : null}
      <ImageBackground
        source={imgClock}
        style={{
          width: width - offset * 2,
          padding: width * 0.1 - offset,
        }}>
        <View style={styles.logoInClock}>
          <RNImage
            source={imgLogo}
            style={styles.imgLogoInClock}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.txtInClock}>{displayTime}</Text>

        <ThemeProvider theme={themes}>
          <Svg height={clockWidth} width={clockWidth}>
            <G
              rotation={time.hours}
              origin="5, 70"
              x={center - 5}
              y={center - 70}>
              <Image
                x={0}
                y={0}
                width="10"
                height="75"
                href={require('assets/images/hand_hour.png')}
              />
            </G>

            <G
              rotation={time.minutes}
              origin="5, 70"
              x={center - 5}
              y={center - 70}>
              <Image
                x={0}
                y={0}
                width="10"
                height="75"
                href={require('assets/images/hand_min.png')}
              />
            </G>

            <G
              rotation={time.seconds}
              origin="5, 70"
              x={center - 5}
              y={center - 70}>
              <Image
                x={0}
                y={0}
                width="10"
                height="75"
                href={require('assets/images/hand_sec.png')}
              />
            </G>
          </Svg>
        </ThemeProvider>
      </ImageBackground>
    </View>
  );
};

export default ClockFace;

const styles = StyleSheet.create({
  clockContainer: {
    width: screenSize.width * 0.53,
    height: screenSize.width * 0.53,
    // width: 200,
    // height: 200,

    borderRadius: screenSize.width * 0.3,
    overflow: 'hidden',
    paddingVertical: 1,
    paddingHorizontal: 4,
  },
  logoInClock: {
    position: 'absolute',
    top: screenSize.width * 0.12,
    alignSelf: 'center',
  },
  imgLogoInClock: {
    width: screenSize.width * 0.07,
    height: screenSize.width * 0.07,
    // resizeMode: 'contain',
    // backgroundColor: 'red',
  },
  txtInClock: {
    position: 'absolute',
    // width: screenSize.width * 0.57,
    left: 0,
    right: 0,
    bottom: screenSize.width * 0.15,
    textAlign: 'center',
    fontSize: 15,
    color: theme.colors.grey500,
    fontWeight: 'bold',
  },
  btnCheckTime: {
    marginTop: 10,
  },
  btnCheckTimeText: {
    color: theme.colors.grey500,
  },
  btnCheckInContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '100%',
  },
  btnGroupCheckIn: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnCheckin: {
    backgroundColor: '#eee',
    // borderRadius: 100,
    // padding: 15,
    width: screenSize.width * 0.15 + 30,
    height: screenSize.width * 0.15 + 30,
  },
  btnCheckInImage: {
    width: screenSize.width * 0.25,
    height: screenSize.width * 0.25,
  },
  txtCheckIn: {
    color: theme.colors.grey500,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});
