import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';

function useBackButtonPress(handleBackButtonClick: any) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
}

export default useBackButtonPress;
