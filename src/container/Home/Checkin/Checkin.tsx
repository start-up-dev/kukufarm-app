import React, {useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import {CheckinStackParamList} from '.';
import {IScreenProps} from 'interfaces/INavigation';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from 'styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigationRef} from 'utils/navigation';
import {useCustomDispatch, useCustomSelector} from 'store';

import Image from 'components/Image';
import Avatar from 'components/Avatar';
import Text from 'components/Text';
import CountDown from 'components/checkin/CountDown';
import ClockFace from 'components/checkin/Clock';
// import BottomActionSheet from 'components/BottomSheet';
export const screenSize = Dimensions.get('window');
import imgLogo from 'assets/images/B.png';
import imgSos from 'assets/images/A.png';
import {statusbarHeight} from 'utils/helper';
import Space from 'components/Space';
import CheckInDialog from 'components/checkin/CheckInDialog';
import {sliceText} from 'utils/textConverter';
import {get_quote} from 'api/checkIn';
import CommonDialog from 'components/dialogs/CommonDialog';
import {toggle_config} from 'api/profile';
import {updateAuthStore} from 'store/reducers/auth';
import {showAlert} from 'utils/toast';
import DateTimePickerComp from 'components/DateTimePicker';
import SetCheckInTime from 'components/tutorial/SetCheckInTime';
import DoCheckIn from 'components/tutorial/DoCheckIn';
import SOS from 'components/tutorial/SOS';
import {updateTutorialStep} from 'store/reducers/tutorial';
import {Tutorial} from 'interfaces/IConfig';
import status_b from 'assets/images/tabs/status_b.png';
import moment from 'moment';
type IProps = IScreenProps<CheckinStackParamList, 'Checkin'>;

const Checkin: React.FC<IProps> = ({navigation, route}) => {
  // const {loading, users} = useCustomSelector(state => state.inbox.inboxUsers);

  const setCheckInTime = route?.params?.setCheckInTime;
  const isTutorial = route?.params?.isTutorial;
  const doCheckIn = route?.params?.doCheckIn;
  const isSos = route?.params?.isSos;

  const [isEmojiVisible, setIsEmojiVisible] = useState(false);
  const [checkInModeLoading, setCheckInModeLoading] = useState(false);
  const [isiVisibleCheckInMode, setIsiVisibleCheckInMode] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [quote, setQuote] = useState();

  const {userData} = useCustomSelector(state => state.auth);
  const dispatch = useCustomDispatch();
  const getQuote = async () => {
    try {
      const {data} = await get_quote();
      setQuote(data?.quote);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  const onChangeCheckInMode = async () => {
    let name = 'checkInMode';
    setCheckInModeLoading(true);
    try {
      const {data} = await toggle_config('checkInMode');
      dispatch(
        updateAuthStore({
          config: {
            [name]: data?.user?.config[name],
          },
        }),
      );
      setCheckInModeLoading(false);
      setIsiVisibleCheckInMode(false);
    } catch (error) {
      showAlert('Failed to change checkin mode.');
      setCheckInModeLoading(false);
    }
  };

  const onPressSubscribe = () => {
    if (isSos) {
      dispatch(updateTutorialStep(Tutorial.FINISHED));
    }
    navigationRef.navigate('OtherStack', {
      screen: 'Subscription',
      params: {isTutorialStep: true},
    });
    setShowEmergencyDialog(false);
  };

  const onOpenCheckInDialog = () => {
    const checkBeforeDate = moment(
      userData?.lastCheckInTime || 1653955200000,
    ).isBefore(new Date(), 'day');
    if (checkBeforeDate) {
      setIsEmojiVisible(true);
    } else {
      showAlert(
        'You have already check in today. Thank you for checkin in.',
        'info',
      );
    }
  };
  const is24HourMode = userData?.config?.checkInMode === 'in_a_day';

  return (
    <Layout darkStatusbar noSpace={isTutorial}>
      <ScrollView
        style={{
          backgroundColor: theme.colors.white,
          flex: 1,
          padding: theme.size.pageBorder,
        }}>
        <View
          style={{
            marginTop: statusbarHeight,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => setIsiVisibleCheckInMode(!isiVisibleCheckInMode)}>
              {/* <Button transparent onPress={this.onSetTime} rounded> */}
              {is24HourMode ? (
                <Image
                  source={require('assets/icons/hour_24.png')}
                  style={{width: 27, height: 25}}
                />
              ) : (
                <Ionicons
                  color={theme.colors.primary}
                  size={26}
                  name="time-outline"
                  // style={{fontSize: 25}}
                />
              )}
            </TouchableOpacity>
            <Space width={15} />
            <TouchableOpacity
              onPress={() =>
                navigationRef.navigate('HomeStack', {
                  screen: 'Status',
                })
              }>
              {/* <Icon name="share-social" /> */}
              <Image source={status_b} style={{width: 28, height: 28}} />

              {/* <Image
                source={require('assets/icons/share.png')}
                style={{width: 28, height: 23}}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
        <Space height={10} />
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Avatar size={70} source={userData?.avatar} />
          <Text
            style={{
              fontSize: 21,
              marginTop: 10,
              fontWeight: 'bold',
            }}
            color={theme.colors.primary}>
            Hi! {sliceText(userData?.name!!)}
          </Text>
          <Text
            style={{
              fontSize: 28,

              fontWeight: 'bold',
            }}
            color={theme.colors.primary}>
            Just Check In!
          </Text>
        </View>

        {is24HourMode ? (
          false ? (
            <View style={{marginVertical: 70}}>
              <Ionicons
                name="checkmark-done-circle-sharp"
                style={{
                  fontSize: 60,
                  alignSelf: 'center',
                  color: theme.colors.primary,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  color: '#555',
                }}>
                You have already checked in today.
              </Text>
            </View>
          ) : (
            <CountDown />
          )
        ) : (
          <>
            <View style={{marginTop: 10, alignItems: 'center'}}>
              <TouchableOpacity>
                <ClockFace
                  checkin={{checkInTime: 222222222, lastCheckInTime: 333333333}}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text onPress={() => setShowTimePicker(true)} center>
                Set Check In Time
              </Text>
            </View>
          </>
        )}

        <View
          style={{
            ...styles.btnCheckInContainer,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setShowEmergencyDialog(!showEmergencyDialog)}>
              <Image source={imgSos} style={styles.btnCheckInImage} />
            </TouchableOpacity>
            <Text style={{...styles.txtCheckIn}}>Emergency Alert</Text>
          </View>
          <View style={{width: 40}} />
          <View>
            <TouchableOpacity onPress={onOpenCheckInDialog}>
              <Image source={imgLogo} style={styles.btnCheckInImage} />
            </TouchableOpacity>
            <Text style={{...styles.txtCheckIn}}>Check In</Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 15,
            marginTop: 35,
            marginBottom: Platform.OS === 'android' ? 30 : 0,
          }}>
          <Text style={{fontSize: 16, textAlign: 'center'}}>
            {quote?.content}
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {' '}
              - {quote?.author}
            </Text>
          </Text>
        </View>

        {/* <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              headerTextIOS="Set Your Daily Check In Time"
              value={new Date()}
              onConfirm={this.onConfirmTimePicker}
              onCancel={this.onCancelTimePicker}
              minuteInterval={30}
            />
 */}
        <CheckInDialog
          isEmojiVisible={isEmojiVisible}
          onCloseEmoji={() => setIsEmojiVisible(false)}
          doCheckIn={doCheckIn}
          // onEmojiStatus={onEmojiStatus}
        />
        {/* Emergency Dialog */}
        <CommonDialog
          isVisible={showEmergencyDialog}
          onCloseDialog={() => setShowEmergencyDialog(!showEmergencyDialog)}
          onPressCancel={() => setShowEmergencyDialog(!showEmergencyDialog)}
          onPressConfirm={onPressSubscribe}
          confirmButtonStyle={{
            backgroundColor: theme.colors.primary,
          }}
          title="Please subscribe first"
          confirmText={'Subscribe'}
          // loading={checkInModeLoading}
        >
          <Text size={17} style={{alignSelf: 'center'}} color={'#444'}>
            Please take the time to subscribe. Your Check In matters.
          </Text>
        </CommonDialog>

        {/* Set CheckIn Dialog */}
        <CommonDialog
          isVisible={isiVisibleCheckInMode}
          onCloseDialog={() => setIsiVisibleCheckInMode(!isiVisibleCheckInMode)}
          onPressCancel={() => setIsiVisibleCheckInMode(!isiVisibleCheckInMode)}
          onPressConfirm={onChangeCheckInMode}
          confirmButtonStyle={{
            backgroundColor: is24HourMode
              ? theme.colors.primary
              : theme.colors.brandDanger,
          }}
          confirmText={is24HourMode ? 'Change' : 'Start Countdown'}
          loading={checkInModeLoading}>
          <Text size={17} style={{alignSelf: 'center'}} color={'#444'}>
            {is24HourMode
              ? 'Do you want to change to a set daily check in mode? In this feature you need to set a daily check in time. You will receive daily notification to check in.'
              : 'Do you want to change to the 24 hours countdown mode? In this feature you do not need to set a check in time. You can check in anytime within the 24hour period.'}
          </Text>
        </CommonDialog>
      </ScrollView>
      <DateTimePickerComp
        isDatePickerVisible={showTimePicker}
        setDatePickerVisibility={setShowTimePicker}
        setCheckInTime={setCheckInTime}
      />

      {setCheckInTime && (
        <SetCheckInTime onSetCheckInTime={() => setShowTimePicker(true)} />
      )}
      {doCheckIn && (
        <DoCheckIn onPressCheckIn={() => setIsEmojiVisible(!isEmojiVisible)} />
      )}
      {isSos && (
        <SOS onPressSos={() => setShowEmergencyDialog(!showEmergencyDialog)} />
      )}
    </Layout>
  );
};

export default Checkin;

const styles = StyleSheet.create({
  circleBackground: {
    // backgroundColor: theme.colors.primary,
    borderRadius: 100,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    color: 'white',
    fontSize: 25,
  },
  // Check In page
  clockContainer: {
    width: screenSize.width * 0.53,
    height: screenSize.width * 0.53,
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
    resizeMode: 'contain',
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
    justifyContent: 'center',
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

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  btnEmoji: {
    borderRadius: 100,
    width: screenSize.width * 0.25,
    height: screenSize.width * 0.25,
  },
  btnEmojiInactive: {
    opacity: 0.3,
  },
  btnEmojiImage: {
    width: screenSize.width * 0.25,
    height: screenSize.width * 0.25,
  },
});
