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
import {updateAuthStore} from 'store/reducers/auth';
import {phone_otp_verify} from 'api/profile';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {showAlert} from 'utils/toast';
import {redirectSignUpStep} from 'utils/redirectSignupStep';

type IProps = IScreenProps<OtherStackParamList, 'PhoneOtpVerify'>;

const PhoneOtpVerify: FC<IProps> = ({route}) => {
  const {userData} = useCustomSelector(state => state.auth);

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useCustomDispatch();

  const onSubmitOtp = async () => {
    if (!otp) return;
    setLoading(true);
    try {
      const {data} = await phone_otp_verify({
        phone_number: route?.params?.phone,
        code: otp,
      });

      dispatch(
        updateAuthStore({
          phoneNumber: route?.params?.phone,
        }),
      );
      setLoading(false);
      showAlert('Your phone number is verified', 'success');
      redirectSignUpStep(route?.params?.isFromSignUp!!, 'SetProfileImage');
    } catch (error: any) {
      console.log(error);
      setError(error?.message);
      setLoading(false);
    }
  };

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
            Verify your cell number
          </Text>

          <OTPInputView
            style={{flex: 0, height: 50, width: '100%'}}
            pinCount={6}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={code => setError('')}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              setOtp(code);
            }}
          />
          {error ? (
            <Text
              bold
              style={{marginTop: 8, marginLeft: 5}}
              color={theme.colors.danger}>
              {error}
            </Text>
          ) : null}
        </View>
        <Button rounded sm onPress={onSubmitOtp} loader={loading}>
          Submit
        </Button>
      </Container>
    </Layout>
  );
};

export default PhoneOtpVerify;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: theme.colors.primary,
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 3,
    color: '#333',
    fontSize: 19,
  },

  underlineStyleHighLighted: {
    borderColor: theme.colors.secondary,
  },
});
