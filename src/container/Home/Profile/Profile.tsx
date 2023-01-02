import React, {useRef, useState} from 'react';
import Layout from 'components/Layout';
import {ProfileStackParamList} from '.';
import {IScreenProps} from 'interfaces/INavigation';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from 'styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigationRef} from 'utils/navigation';

import Avatar from 'components/Avatar';
import Text from 'components/Text';

export const screenSize = Dimensions.get('window');
// import auth from '@react-native-firebase/auth';
import RNRestart from 'react-native-restart';
import {statusbarHeight} from 'utils/helper';
import Space from 'components/Space';
import SingleProfileItem from 'components/profile/SingleProfileItem';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SingleProfileSwitch from 'components/profile/SingleSwitch';
import {setAuthStore, updateAuthStore} from 'store/reducers/auth';
import {useCustomDispatch, useCustomSelector} from 'store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_logout} from 'api/auth';
import {IConfig} from 'interfaces/IUser';
import {toggle_config} from 'api/profile';
import {showAlert} from 'utils/toast';
import CommonDialog from 'components/dialogs/CommonDialog';
type IProps = IScreenProps<ProfileStackParamList, 'Profile'>;

const Profile: React.FC<IProps> = ({navigation, route}) => {
  const {userData} = useCustomSelector(state => state.auth);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useCustomDispatch();
  const logout = async () => {
    setLogoutLoading(true);
    try {
      // await auth().signOut();
      await user_logout();
      dispatch(
        setAuthStore({
          userData: undefined,
          token: '',
        }),
      );
      setLogoutLoading(false);
      setIsVisible(false);
      AsyncStorage.clear();
      RNRestart.Restart();
    } catch (error) {
      console.log(error);
      setLogoutLoading(false);
    }
  };

  const toggleSwitch = async (name: keyof IConfig) => {
    try {
      const {data} = await toggle_config(name);
      dispatch(
        updateAuthStore({
          config: {
            [name]: data?.user?.config[name],
          },
        }),
      );
    } catch (error) {
      showAlert('Failed to update configuration.');
    }
  };

  return (
    <>
      <Layout darkStatusbar>
        <ScrollView
          style={{
            backgroundColor: theme.colors.white,
            flex: 1,
            // padding: theme.size.pageBorder,
          }}>
          <View
            style={{
              paddingHorizontal: theme.size.pageBorder,
              paddingTop: theme.size.pageBorder,
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
                <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                  <Text style={{color: theme.colors.primary}} size={20}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigationRef.navigate('OtherStack', {
                  screen: 'SetProfileImage',
                })
              }
              style={{
                marginTop: 10,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Avatar size={150} source={userData?.avatar} />
              <Space height={10} />
              <Text center primary size={16}>
                Press to change avatar
              </Text>
            </TouchableOpacity>
            <Space height={25} />
            <SingleProfileItem
              isVerified
              text={userData?.name!!}
              onPress={() =>
                navigationRef.navigate('OtherStack', {
                  screen: 'UpdateName',
                })
              }
              icon={
                <Ionicons
                  color={'#666'}
                  size={25}
                  name="person"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              }
            />
            <SingleProfileItem
              isVerified
              text={userData?.email!!}
              icon={
                <MaterialCommunityIcons
                  color={'#666'}
                  size={25}
                  name="email"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              }
            />
            <SingleProfileItem
              isVerified
              text={userData?.phoneNumber!!}
              onPress={() =>
                navigationRef.navigate('OtherStack', {
                  screen: 'UpdatePhone',
                })
              }
              icon={
                <FontAwesome5
                  color={'#666'}
                  size={25}
                  name="phone-alt"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              }
            />
          </View>
          <View
            style={{
              backgroundColor: theme.colors.layoutBg,
              paddingVertical: 8,
              paddingLeft: theme.size.pageBorder,
            }}>
            <Text size={18}>Configurations</Text>
          </View>

          <View
            style={{
              paddingHorizontal: theme.size.pageBorder,
              // paddingTop: theme.size.pageBorder,
            }}>
            <SingleProfileSwitch
              text="Check In Alerts"
              toggleSwitch={() => toggleSwitch('checkInAlerts')}
              isEnabled={userData?.config?.checkInAlerts!!}
              icon={
                <Feather
                  color={'#666'}
                  size={25}
                  name="alert-circle"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              }
            />
            <SingleProfileSwitch
              text="Email Alerts"
              toggleSwitch={() => toggleSwitch('emailAlerts')}
              isEnabled={userData?.config?.emailAlerts!!}
              icon={
                <Ionicons
                  color={'#666'}
                  size={25}
                  name="mail-unread-outline"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              }
            />
            <SingleProfileSwitch
              text="SMS Alerts"
              toggleSwitch={() => toggleSwitch('smsAlerts')}
              isEnabled={userData?.config?.smsAlerts!!}
              icon={
                <Ionicons
                  color={'#666'}
                  size={25}
                  name="chatbox-ellipses-outline"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              }
            />
            <SingleProfileSwitch
              text="Vacation Mode"
              toggleSwitch={() => toggleSwitch('vacationMode')}
              isEnabled={userData?.config?.vacationMode!!}
              icon={
                <Ionicons
                  color={'#666'}
                  size={25}
                  name="airplane-outline"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              }
            />
            <SingleProfileSwitch
              text="24 Hours Countdown Mode"
              toggleSwitch={() => toggleSwitch('checkInMode')}
              isEnabled={
                userData?.config?.checkInMode === 'in_a_day' ? true : false
              }
              icon={
                <Ionicons
                  color={'#666'}
                  size={25}
                  name="stopwatch-outline"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              }
            />
          </View>

          <View
            style={{
              backgroundColor: theme.colors.layoutBg,
              paddingVertical: 8,
              paddingLeft: theme.size.pageBorder,
            }}>
            <Text size={18}>Others</Text>
          </View>
          <View
            style={{
              paddingHorizontal: theme.size.pageBorder,
              // paddingTop: theme.size.pageBorder,
            }}>
            <SingleProfileItem
              text="Subscribe"
              subTitle={userData?.isPurchased ? 'Purchased' : 'Not Purchased'}
              onPress={() =>
                navigationRef.navigate('OtherStack', {
                  screen: 'Subscription',
                })
              }
              icon={
                <Ionicons
                  color={'#666'}
                  size={25}
                  name="finger-print"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              }
            />
            <SingleProfileItem
              text="Delete Account"
              // subTitle="Not Purchased"
              onPress={() =>
                navigationRef.navigate('OtherStack', {
                  screen: 'AccountDelete',
                })
              }
              icon={
                <Ionicons
                  color={'#666'}
                  size={25}
                  name="alert"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              }
            />
          </View>
        </ScrollView>
      </Layout>

      <CommonDialog
        isVisible={isVisible}
        onCloseDialog={() => setIsVisible(!isVisible)}
        onPressCancel={() => setIsVisible(!isVisible)}
        onPressConfirm={logout}
        confirmButtonStyle={{
          backgroundColor: theme.colors.primary,
        }}
        // title="Alert!"
        confirmText={'Yes'}
        cancelText="No"
        loading={logoutLoading}>
        <Text size={17} style={{alignSelf: 'center'}} color={'#444'}>
          Are you sure want to logout?
        </Text>
      </CommonDialog>
    </>
  );
};

export default Profile;

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
