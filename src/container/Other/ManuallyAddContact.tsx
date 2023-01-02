import React, {FC, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  StatusBar,
  View,
  NativeModules,
  Platform,
  Alert,
  Linking,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import imgLogoG from 'assets/images/avatar.png';
import {APP_NAME, DURATION_TOAST, MAX_EMERGENCY_CONTACT} from 'config/config';
import Input from 'components/others/manuallyAdContactInput';
import {RnLabelPhoneNumberInput} from 'components/PhoneInput';
import * as RNLocalize from 'react-native-localize';
import Layout from 'components/Layout';
import {theme} from 'styles/theme';
import {screenSize} from 'container/Home/Checkin/Checkin';
import TransparentHeader from 'components/TransparentHeader';
import Text from 'components/Text';
import {IScreenProps} from 'interfaces/INavigation';
import {OtherStackParamList} from '.';
import {add_emergency_contact} from 'api/emergency';
import {useCustomDispatch, useCustomSelector} from 'store';
import {navigationRef} from 'utils/navigation';
import {showAlert} from 'utils/toast';
import ActivityInd from 'components/ActivityIndicator';
import DropdownComponent from 'components/DropDown';
import {add_member_in_circle} from 'api/circle';
import {addMemberInCircle} from 'store/reducers/circles';
import {addEmergencies} from 'store/reducers/emergencies';
type IProps = IScreenProps<OtherStackParamList, 'ManuallyAddContact'>;

const ManualAddContact: FC<IProps> = ({route}) => {
  const circleId = route?.params?.circleId;

  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('');
  const [address, setAddress] = useState('');
  const [invalidPhone, setInvalidPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [circle, setCircle] = useState(circleId);
  // console.log(circle);

  //   const {userData} = useCustomSelector(state => state.auth);
  const dispatch = useCustomDispatch();

  useEffect(() => {
    setCountryCode(RNLocalize.getCountry());
  }, []);

  const phoneInputRef = useRef(null);

  const onAddContact = async () => {
    setInvalidPhone('');

    const checkValid = phoneInputRef.current?.isValidNumber(target);
    const callingCode = phoneInputRef.current?.getCallingCode();

    if (!checkValid) {
      setInvalidPhone('Invalid phone number');
      return;
    }

    const formData = {
      name,
      [circleId ? 'phone_number' : 'phoneNumber']: `+${callingCode + target}`,
      email,
      relationship: relation,
      address,
    };

    setLoading(true);

    try {
      if (circleId) {
        const {data} = await add_member_in_circle(circleId, formData);
        dispatch(addMemberInCircle(data?.newMember));
      } else {
        const {data} = await add_emergency_contact(formData);
        dispatch(addEmergencies(data?.newEmergencyContact));
      }

      setLoading(false);
      navigationRef.goBack();
    } catch (error) {
      showAlert(error?.message || 'Failed to add contact', 'error');
      setLoading(false);
    }
  };

  return (
    <>
      <Layout noSpace>
        <View
          style={{
            ...styles.imgSubscribe,
            flex: 1,
            backgroundColor: theme.colors.primary,
          }}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
            }}>
            <TransparentHeader
              showBack
              options={
                <TouchableOpacity onPress={onAddContact}>
                  <Text style={{color: 'white', fontSize: 17}}>
                    {loading ? (
                      <ActivityInd size="small" color={theme.colors.white} />
                    ) : (
                      'Save'
                    )}
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>

          <View
            style={{
              paddingTop: screenSize.width * 0.34,
              flex: 1,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                // marginBottom: screenSize.width * 0.34,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                // flex: 1,
              }}>
              <View style={{...styles.imgSubscribeLogoContainer, padding: 15}}>
                <Image source={imgLogoG} style={{...styles.imgSubscribeLogo}} />
              </View>

              <View
                style={{
                  paddingHorizontal: 40,
                  // backgroundColor: 'white',
                  height: '100%',
                  paddingBottom: screenSize.width * 0.34,
                }}>
                <ScrollView>
                  <Input
                    onChangeText={text => setName(text)}
                    value={name}
                    label="Name"
                    icon="person"
                    placeholder="Enter contact name"
                    style={{paddingBottom: 6}}
                  />

                  {!!countryCode ? (
                    <RnLabelPhoneNumberInput
                      ref={phoneInputRef}
                      onChangeText={text => {
                        setTarget(text);
                      }}
                      keyboardType="phone-pad"
                      // placeholder="Phone Number"
                      phoneInputContainer={true}
                      error={invalidPhone}
                      defaultCode={countryCode}
                    />
                  ) : null}

                  <Input
                    onChangeText={text => setEmail(text)}
                    value={email}
                    label="Email"
                    icon="mail-outline"
                    placeholder="Enter contact email"
                    style={{paddingBottom: 6}}
                  />
                  <Input
                    onChangeText={text => setAddress(text)}
                    value={address}
                    label="Address"
                    icon="location"
                    placeholder="Enter contact address"
                    style={{paddingBottom: 6}}
                  />
                  <Input
                    onChangeText={text => setRelation(text)}
                    value={relation}
                    label="Relationship"
                    icon="people-outline"
                    placeholder="Enter contact relationship"
                    style={{paddingBottom: 6}}
                  />

                  {circleId && (
                    <DropdownComponent setValue={setCircle} value={circle} />
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Layout>
    </>
  );
};

export default ManualAddContact;

const styles = StyleSheet.create({
  imgSubscribe: {
    width: screenSize.width,
    height: screenSize.width * 0.64,
  },
  imgSubscribeLogoContainer: {
    marginTop: -screenSize.width * 0.125 - 20,
    alignSelf: 'center',
    padding: 20,
    backgroundColor: theme.colors.white,
    borderRadius: screenSize.width * 0.2,
  },
  imgSubscribeLogo: {
    width: screenSize.width * 0.25,
    height: screenSize.width * 0.25,
  },
});
