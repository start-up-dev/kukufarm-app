import React, {FC, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import {IScreenProps} from 'interfaces/INavigation';
import {Platform, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
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
import {login_with_id_token} from 'api/auth';
import {setAuthStore} from 'store/reducers/auth';
import {showAlert} from 'utils/toast';
import {useCustomDispatch} from 'store';
import Ionicons from 'react-native-vector-icons/Ionicons';

type IProps = IScreenProps<AuthStackParamList, 'SignIn'>;

const SignIn: FC<IProps> = ({}) => {
  const dispatch = useCustomDispatch();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setError({
      email: '',
      password: '',
    });
  }, [email, password]);

  const onSignUp = async () => {
    if (!email && !password) return;
    setIsOpenDialog(!isOpenDialog);
    setLoading(true);
    try {
      const res = await auth().signInWithEmailAndPassword(
        email.toLowerCase(),
        password,
      );
      const id_token = await res.user.getIdToken();
      const {data} = await login_with_id_token({id_token});
      console.log(data);

      dispatch(
        setAuthStore({
          userData: data?.user,
          token: data?.token,
        }),
      );
      // navigationRef.navigate('HomeStack', {
      //   screen: 'CheckIn',
      // });

      navigationRef.reset({
        routes: [{name: 'HomeStack'}],
      });
      setLoading(false);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError({...error, email: 'That email address is already in use!'});
      } else if (error.code === 'auth/invalid-email') {
        setError({...error, email: 'That email address is invalid!'});
      } else if (error.code === 'auth/weak-password') {
        setError({...error, password: 'The given password is invalid'});
      } else {
        showAlert(error?.message, 'error');
        console.log(error);
      }
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
            label="Sign In"
            onChangeText={setEmail}
            value={email}
            error={error?.email}
            keyboardType="email-address"
          />
          <Space height={10} />
          <Input
            placeholder="Password"
            style={{borderRadius: 50}}
            containerStyle={{width: '100%'}}
            // label="Sign Up"
            onChangeText={setPassword}
            value={password}
            error={error?.password}
            secureTextEntry={showPassword}
            iconRight={
              <Ionicons
                color={theme.colors.primary}
                style={{marginTop: Platform.OS === 'ios' ? 7.5 : 12}}
                size={30}
                name={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                // style={{fontSize: 25}}
              />
            }
          />

          <Space height={15} />
          {/* <View style={{flexDirection: 'row'}}>
            <Text size={15} center color="#444">
              By Signing in means you are agree with the Terms and Policy
            </Text>
          </View> */}

          <View style={{flexDirection: 'row'}}>
            <Text size={17}>Forget Password </Text>
            <Text
              size={17}
              bold
              primary
              onPress={() =>
                navigationRef.navigate('AuthStack', {
                  screen: 'ResetPassword',
                })
              }>
              Reset Password{' '}
            </Text>
          </View>
        </View>
        <Button
          rounded
          sm
          onPress={() => email && password && setIsOpenDialog(true)}
          loader={loading}>
          Sign In
        </Button>
      </Container>
      <PrivacyPolicyDialog
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(!isOpenDialog)}
        onAccept={onSignUp}
      />
    </Layout>
  );
};

export default SignIn;
