import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useCustomSelector} from 'store';
import {Tutorial} from 'interfaces/IConfig';
import {navigationRef} from 'utils/navigation';
import {theme} from 'styles/theme';
import ActivityInd from 'components/ActivityIndicator';

const Initial = ({}) => {
  const {step} = useCustomSelector(state => state.tutorial);

  const init = async () => {
    if (step === Tutorial.FINISHED) {
      navigationRef.reset({
        routes: [{name: 'HomeStack'}],
      });
    } else if (step === Tutorial.EMERGENCY_CONTACT) {
      navigationRef?.navigate('TutorialStack', {
        screen: 'Emergency',
        params: {isTutorial: true},
      });
    } else if (step === Tutorial.ADD_EMERGENCY) {
      navigationRef?.navigate('TutorialStack', {
        screen: 'Contacts',
        params: {isTutorial: true},
      });
    } else if (step === Tutorial.SET_CHECK_IN_TIME) {
      navigationRef?.navigate('TutorialStack', {
        screen: 'Checkin',
        params: {isTutorial: true, setCheckInTime: true},
      });
    } else if (step === Tutorial.DO_CHECK_IN) {
      navigationRef?.navigate('TutorialStack', {
        screen: 'Checkin',
        params: {isTutorial: true, doCheckIn: true},
      });
    } else if (step === Tutorial.EMERGENCY_ALERT_SOS) {
      navigationRef?.navigate('TutorialStack', {
        screen: 'Checkin',
        params: {isTutorial: true, isSos: true},
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityInd />
      <Text>I M TUTORIAL STACK</Text>
    </View>
  );
};

export default Initial;

const styles = StyleSheet.create({});
