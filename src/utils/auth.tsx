import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {oAuthLogin} from 'api/auth';
import {setAuthStore} from 'store/reducers/auth';
import {useCustomDispatch, useCustomSelector} from 'store';
import {useEffect, useState} from 'react';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {showAlert} from './toast';
import {toggleLoader} from 'store/reducers/global';
import {loginWithGoogle} from 'api/auth';
import {ILoginResponse} from 'interfaces/IUser';
import {navigationRef} from './navigation';

interface IReturnProps {
  googleAuth: () => void;
  phoneAuth: (number: string) => any;
  logout: () => void;
  setLogin: (data: ILoginResponse) => void;
  loader: boolean;
}

const useOAuth = (): IReturnProps => {
  const dispatch = useCustomDispatch();
  const [loader, setLoader] = useState(false);
  const {userData} = useCustomSelector(state => state.auth);

  async function googleAuth() {
    try {
      dispatch(toggleLoader());
      const {idToken} = await GoogleSignin.signIn();

      if (idToken) {
        const {data} = await loginWithGoogle(idToken);
        setLogin(data);
      }
      dispatch(toggleLoader());
    } catch (error) {
      console.log(error);
      dispatch(toggleLoader());
    }
  }

  async function phoneAuth(number: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+880` + number);
      showAlert('Code sent successfully', 'success');
      return confirmation;
    } catch (error) {
      console.log(error);
    }
  }

  const setLogin = (data: ILoginResponse) => {
    dispatch(
      setAuthStore({
        userData: data.user,
        token: data.jwtToken,
      }),
    );

    if (data?.user?.nickname === 'N/A') {
      navigationRef.navigate('AuthStack', {
        screen: 'Setup',
      });
    } else {
      navigationRef.reset({
        routes: [{name: 'HomeStack'}],
      });
    }
  };

  const logout = async () => {
    dispatch(toggleLoader());
    try {
      if (userData?.loginMethod === 'google') {
        await GoogleSignin.signOut();
      } else if (userData?.loginMethod === 'phone') {
        await auth().signOut();
      }
      dispatch(
        setAuthStore({
          userData: undefined,
          token: '',
        }),
      );
      dispatch(toggleLoader());
      AsyncStorage.clear();
      RNRestart.Restart();
    } catch (error) {
      console.log(error);
      dispatch(toggleLoader());
    }
  };

  return {googleAuth, loader, logout, phoneAuth, setLogin};
};

export default useOAuth;
