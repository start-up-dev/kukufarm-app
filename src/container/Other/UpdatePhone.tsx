import React, {FC, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import {IScreenProps} from 'interfaces/INavigation';
import {Platform, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Space from 'components/Space';
import {Icons} from 'icon/icons';
import Container from 'components/Container';
import Flex from 'components/Flex';
import {OtherStackParamList} from '.';
import {statusbarHeight} from 'utils/helper';
import {isIos} from 'utils/conditions';
import BackButton from 'components/Back';
import Input from 'components/Input';
import Button from 'components/Button';
import * as RNLocalize from 'react-native-localize';
import RnPhoneNumberInput from 'components/PhoneInput';
import {useCustomDispatch, useCustomSelector} from 'store';
import {phone_otp_send} from 'api/profile';
import {navigationRef} from 'utils/navigation';
import {getContactInfo} from 'utils/callingCodes';

type IProps = IScreenProps<OtherStackParamList, 'UpdatePhone'>;

const UpdatePhone: FC<IProps> = ({route}) => {
  const {userData} = useCustomSelector(state => state.auth);

  const [loading, setLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [isInValidPhoneNumber, setIsInValidPhoneNumber] = useState('');

  const phoneInputRef = useRef(null);

  const onNext = async () => {
    setIsInValidPhoneNumber('');

    const checkValid = phoneInputRef.current?.isValidNumber(phoneNumber);
    const callingCode = phoneInputRef.current?.getCallingCode();

    if (!checkValid) {
      setIsInValidPhoneNumber('Invalid phone number');
      return;
    }

    setLoading(true);
    try {
      const {data} = await phone_otp_send({
        phone_number: `+${callingCode + phoneNumber}`,
      });

      navigationRef.navigate('OtherStack', {
        screen: 'PhoneOtpVerify',
        params: {
          phone: `+${callingCode + phoneNumber}`,
          isFromSignUp: route?.params?.isFromSignUp,
        },
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setPhoneNumber(userData?.phoneNumber?.replace(/[^0-9]/g, ''));

    if (userData?.phoneNumber) {
      const phone = getContactInfo(userData?.phoneNumber);
      console.log(phone);

      if (phone) {
        setPhoneNumber(phone.phoneNumber);
        setCountryCode(phone.countryCode);
      } else {
        setCountryCode(RNLocalize.getCountry());
      }
    } else {
      setCountryCode(RNLocalize.getCountry());
    }

    return () => {
      setPhoneNumber('');
      setCountryCode('');
    };
  }, [userData?.phoneNumber]);

  return (
    <Layout
      noSpace
      statusbarColor="black"
      darkStatusbar
      translucent={false}
      safeArea>
      <Container
        style={{
          justifyContent: 'center',
          backgroundColor: theme.colors.white,
          flex: 1,
          padding: theme.size.pageBorder + 5,
        }}>
        {/* {isIos && <Space height={statusbarHeight} />} */}
        <Flex justify="flex-start" align="flex-end">
          <BackButton dark title="" />
        </Flex>

        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text size={30} center style={{marginBottom: 10}} color={'#444'}>
            Input your cell number
          </Text>
          <View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 20,
                paddingHorizontal: 13,
                paddingVertical: Platform.OS === 'android' ? 0 : 5,
              }}>
              {/* <Input
                placeholder="Write your phone number"
                onChangeText={this.onChangePhoneNumber}
                defaultValue={phoneNumber}
              /> */}
              {countryCode ? (
                <RnPhoneNumberInput
                  ref={phoneInputRef}
                  onChangeText={text => {
                    setPhoneNumber(text);
                  }}
                  keyboardType="phone-pad"
                  // placeholder="Phone Number"
                  phoneInputContainer={true}
                  value={phoneNumber}
                  defaultCode={countryCode}
                />
              ) : null}
            </View>
            {isInValidPhoneNumber ? (
              <Text style={{color: 'red'}}>{isInValidPhoneNumber}</Text>
            ) : null}
          </View>
        </View>
        <Button rounded sm onPress={onNext} loader={loading}>
          Next
        </Button>
      </Container>
    </Layout>
  );
};

export default UpdatePhone;
