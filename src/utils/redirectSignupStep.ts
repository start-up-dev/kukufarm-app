import {navigationRef} from 'utils/navigation';
export const redirectSignUpStep = (
  isFromSignUp: boolean,
  nextScreen: string,
) => {
  if (isFromSignUp) {
    navigationRef.navigate('OtherStack', {
      screen: nextScreen,
      params: {
        isFromSignUp: true,
      },
    });
  } else {
    navigationRef.goBack();
  }
};
