import React, {FC, useState} from 'react';
import Layout from 'components/Layout';
import {IScreenProps} from 'interfaces/INavigation';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Space from 'components/Space';
import {Icons} from 'icon/icons';
import Container from 'components/Container';
import Flex from 'components/Flex';
import {AuthStackParamList} from '.';
import {statusbarHeight} from 'utils/helper';
import {isIos} from 'utils/conditions';
import BackButton from 'components/Back';
import Input from 'components/Input';
import Button from 'components/Button';
import {navigationRef} from 'utils/navigation';
import PrivacyPolicyDialog from './PrivacyPolilcyDialog';
import auth from '@react-native-firebase/auth';
import {showAlert} from 'utils/toast';

type IProps = IScreenProps<AuthStackParamList, 'ResetPassword'>;

const ResetPassword: FC<IProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const onResetPassword = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const res = await auth().sendPasswordResetEmail(email.toLowerCase());
      // console.log(res);

      setLoading(false);
      showAlert('Password reset email sent successfully', 'success');
      navigationRef.goBack();
    } catch (error: any) {
      showAlert(error?.message, 'error');
      console.log(error);
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
          {/* <Text size={30}>Input Your Name</Text> */}
          <Input
            placeholder="Email"
            style={{borderRadius: 50}}
            containerStyle={{width: '100%'}}
            label="Forget Password"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />

          <Space height={15} />
          {/* <View style={{flexDirection: 'row'}}>
            <Text size={15} center color="#444">
              By Signing in means you are agree with the Terms and Policy
            </Text>
          </View> */}
        </View>
        <Button rounded sm onPress={onResetPassword} loader={loading}>
          Reset Password
        </Button>
      </Container>
    </Layout>
  );
};

export default ResetPassword;
