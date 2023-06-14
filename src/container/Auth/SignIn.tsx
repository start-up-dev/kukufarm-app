import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import React, {useEffect} from 'react';

// import * as Google from "expo-auth-session/providers/google";
// import * as AppleAuthentication from "expo-apple-authentication";

import Space from 'components/Space';
import color from 'constants/color';

// import {appleAuth, googleAuth} from 'api/auth';
// import {logIn} from 'store/authSlice';
// import Loader from 'components/Loader';
import {useCustomDispatch, useCustomSelector} from 'store';

import {
  appleAuthAndroid,
  AppleButton,
} from '@invertase/react-native-apple-authentication';

//Images
import google from 'assets/images/google.png';
import apple from 'assets/images/apple.png';
import {login_with_apple} from 'api/auth';
import {useNavigation} from '@react-navigation/native';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LogInScreen = () => {
  const token = useCustomSelector(state => state.auth.token);
  const navigation = useNavigation();

  const dispatch = useCustomDispatch();

  // const status = useCustomSelector(state => state.auth.status);

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId:
  //     '693246696932-s8tgtc2bqb60k8tm4ihs3vrs9cod4mqh.apps.googleusercontent.com',
  //   iosClientId:
  //     '693246696932-q9c3lcph74l2jgi9hj3frp38hb9ji7os.apps.googleusercontent.com',
  //   expoClientId:
  //     '693246696932-giabagvkjh0o9tv9eq9eelomr6o52ge2.apps.googleusercontent.com',
  // });

  // const appleLogin = async () => {
  //   try {
  //     const credential = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //       ],
  //     });
  //     // signed in
  //     setAppleToken(credential.identityToken);
  //   } catch (e) {
  //     if (e.code === 'ERR_REQUEST_CANCELED') {
  //       // handle that the user canceled the sign-in flow
  //     } else {
  //       // handle other errors
  //     }
  //   }
  // };

  const onAppleButtonPress = async () => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      dispatch(login_with_apple(appleAuthRequestResponse.identityToken));

      // // get current authentication state for user
      // // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      // const credentialState = await appleAuth.getCredentialStateForUser(
      //   appleAuthRequestResponse.user,
      // );

      // // use credentialState response to ensure the user is authenticated
      // if (credentialState === appleAuth.State.AUTHORIZED) {
      //   // user is authenticated
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const onAppleButtonPressAndroid = async () => {
    try {
      // Generate secure, random values for state and nonce

      // Configure the request
      appleAuthAndroid.configure({
        // The Service ID you registered with Apple
        clientId:
          '693246696932-s8tgtc2bqb60k8tm4ihs3vrs9cod4mqh.apps.googleusercontent.com',

        // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
        // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
        redirectUri: 'https://example.com/auth/callback',

        // The type of response requested - code, id_token, or both.
        responseType: appleAuthAndroid.ResponseType.ALL,

        // The amount of user information requested from Apple.
        scope: appleAuthAndroid.Scope.ALL,

        // Random nonce value that will be SHA256 hashed before sending to Apple.
      });

      // Open the browser window for user sign in
      const response = await appleAuthAndroid.signIn();

      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // Send the authorization code to your backend for verification
  };

  // import statusCodes along with GoogleSignin

  // Somewhere in your code
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error: any) {
      console.log(error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  // useEffect(() => {
  //   if (response?.type === 'success') {
  //     setToken(response.authentication.accessToken);
  //     getUserInfo();
  //   }
  //   if (!!token) {
  //     const body = {bearerToken: token};
  //     dispatch(googleAuth(body));
  //   }
  // }, [response, token]);

  // useEffect(() => {
  //   if (!!appleToken) {
  //     const body = {identityToken: appleToken};
  //     dispatch(appleAuth(body));
  //     console.log(body);
  //   }
  // }, [appleToken]);

  useEffect(() => {
    if (token) {
      navigation.reset({
        routes: [{name: 'HomeStack'}],
      });
    }
  }, [token]);

  // const getUserInfo = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://www.googleapis.com/userinfo/v2/me',
  //       {
  //         headers: {Authorization: `Bearer ${token}`},
  //       },
  //     );
  //   } catch (error) {
  //     // Add your own error handler here
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {/* <Loader visible={status === 'loading' ? true : false} /> */}
      <ScrollView style={{paddingHorizontal: 16}}>
        <Space height={100} />
        <Text style={styles.title}>Kuku farm</Text>
        <Text style={styles.subTitle}>Flock management and record keeping</Text>
        <Space height={150} />

        {/* {Platform.OS === 'ios' && ( */}
        <TouchableOpacity
          style={styles.logInBox}
          onPress={() =>
            Platform.OS === 'ios'
              ? onAppleButtonPress()
              : onAppleButtonPressAndroid()
          }>
          <Image source={apple} style={styles.appleIcon} />
          <Text style={styles.logInText}>Continue with Apple</Text>
        </TouchableOpacity>
        {/* )} */}

        <Space height={20} />

        <TouchableOpacity
          style={styles.logInBox}
          // disabled={!request}
          onPress={() => {
            googleSignIn();
          }}>
          <Image source={google} style={styles.googleIcon} />
          <Text style={styles.logInText}>Continue with Google</Text>
        </TouchableOpacity>

        <Space height={250} />
        <Text style={styles.bottomText}>
          By continuing, you agree to Kuku farm’s{' '}
          <Text style={styles.bottomLink}>Terms of service</Text> and{' '}
          <Text style={styles.bottomLink}>Privacy policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.background,
    flex: 1,
  },
  title: {
    fontFamily: 'Sora-Bold',
    fontSize: 28,
    lineHeight: 40,
    textAlign: 'center',
  },
  subTitle: {
    // fontFamily: 'Sora-Regular',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
  },
  logInBox: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.TextPrimary,
  },
  logInText: {
    // fontFamily: 'Sora-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: color.TextPrimary,
  },
  appleIcon: {
    width: 12.64,
    height: 15,
    marginRight: 12,
  },
  googleIcon: {
    width: 16.22,
    height: 16.67,
    marginRight: 12,
  },
  bottomText: {
    // fontFamily: 'Sora-Regular',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 24,
    paddingHorizontal: 50,
    color: color.TextSecondary,
  },
  bottomLink: {
    // fontFamily: 'Sora-SemiBold',
    color: color.TextLink,
  },
});

export default LogInScreen;

// <View style={styles.container}>
//       {userInfo === null ? (
//         <Button
//           title="Sign in with Google"

//         />
//       ) : (
//         <Text style={styles.text}>{userInfo.name}</Text>
//       )}
//     </View>

// import React, {FC, useEffect, useState} from 'react';
// import Layout from 'components/Layout';
// import {IScreenProps} from 'interfaces/INavigation';
// import {Platform, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
// import {theme} from 'styles/theme';
// import Text from 'components/Text';
// import Space from 'components/Space';
// import {Icons} from 'icon/icons';
// import Container from 'components/Container';
// import Flex from 'components/Flex';
// import {AuthStackParamList} from '.';
// import {statusbarHeight} from 'utils/helper';
// import {isIos} from 'utils/conditions';
// import BackButton from 'components/Back';
// import Input from 'components/Input';
// import Button from 'components/Button';
// import {navigationRef} from 'utils/navigation';
// import auth from '@react-native-firebase/auth';
// import {login_with_id_token} from 'api/auth';
// import {setAuthStore} from 'store/reducers/auth';
// import {showAlert} from 'utils/toast';
// import {useCustomDispatch} from 'store';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// type IProps = IScreenProps<AuthStackParamList, 'SignIn'>;

// const SignIn: FC<IProps> = ({}) => {
//   const dispatch = useCustomDispatch();

//   const [isOpenDialog, setIsOpenDialog] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(true);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState({
//     email: '',
//     password: '',
//   });

//   useEffect(() => {
//     setError({
//       email: '',
//       password: '',
//     });
//   }, [email, password]);

//   const onSignUp = async () => {
//     if (!email && !password) return;
//     setIsOpenDialog(!isOpenDialog);
//     setLoading(true);
//     try {
//       const res = await auth().signInWithEmailAndPassword(
//         email.toLowerCase(),
//         password,
//       );
//       const id_token = await res.user.getIdToken();
//       const {data} = await login_with_id_token({id_token});
//       console.log(data);

//       dispatch(
//         setAuthStore({
//           userData: data?.user,
//           token: data?.token,
//         }),
//       );
//       // navigationRef.navigate('HomeStack', {
//       //   screen: 'CheckIn',
//       // });

//       navigationRef.reset({
//         routes: [{name: 'HomeStack'}],
//       });
//       setLoading(false);
//     } catch (error: any) {
//       if (error.code === 'auth/email-already-in-use') {
//         setError({...error, email: 'That email address is already in use!'});
//       } else if (error.code === 'auth/invalid-email') {
//         setError({...error, email: 'That email address is invalid!'});
//       } else if (error.code === 'auth/weak-password') {
//         setError({...error, password: 'The given password is invalid'});
//       } else {
//         showAlert(error?.message, 'error');
//         console.log(error);
//       }
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout
//       noSpace
//       statusbarColor="black"
//       darkStatusbar
//       translucent={false}
//       safeArea>
//       <Container
//         style={{
//           justifyContent: 'center',
//           backgroundColor: theme.colors.white,
//           flex: 1,
//           padding: theme.size.pageBorder + 5,
//         }}>
//         {/* {isIos && <Space height={statusbarHeight} />} */}
//         <Flex justify="flex-start" align="flex-end">
//           <BackButton dark title="" />
//         </Flex>

//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           {/* <Text size={30}>Input Your Name</Text> */}
//           <Input
//             placeholder="Email"
//             style={{borderRadius: 50}}
//             containerStyle={{width: '100%'}}
//             label="Sign In"
//             onChangeText={setEmail}
//             value={email}
//             error={error?.email}
//             keyboardType="email-address"
//           />
//           <Space height={10} />
//           <Input
//             placeholder="Password"
//             style={{borderRadius: 50}}
//             containerStyle={{width: '100%'}}
//             // label="Sign Up"
//             onChangeText={setPassword}
//             value={password}
//             error={error?.password}
//             secureTextEntry={showPassword}
//             iconRight={
//               <Ionicons
//                 color={theme.colors.primary}
//                 style={{marginTop: Platform.OS === 'ios' ? 7.5 : 12}}
//                 size={30}
//                 name={showPassword ? 'eye-off' : 'eye'}
//                 onPress={() => setShowPassword(!showPassword)}
//                 // style={{fontSize: 25}}
//               />
//             }
//           />

//           <Space height={15} />
//           {/* <View style={{flexDirection: 'row'}}>
//             <Text size={15} center color="#444">
//               By Signing in means you are agree with the Terms and Policy
//             </Text>
//           </View> */}

//           <View style={{flexDirection: 'row'}}>
//             <Text size={17}>Forget Password </Text>
//             <Text
//               size={17}
//               bold
//               primary
//               onPress={() =>
//                 navigationRef.navigate('AuthStack', {
//                   screen: 'ResetPassword',
//                 })
//               }>
//               Reset Password{' '}
//             </Text>
//           </View>
//         </View>
//         <Button
//           rounded
//           sm
//           onPress={() => email && password && setIsOpenDialog(true)}
//           loader={loading}>
//           Sign In
//         </Button>
//       </Container>
//     </Layout>
//   );
// };

// export default SignIn;
