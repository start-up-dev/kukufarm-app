import React, {FC, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Text from 'components/Text';
import {theme} from 'styles/theme';
import {navigationRef} from 'utils/navigation';
import {useCustomSelector} from 'store';

interface IProps {
  isVisible: boolean;
  onCloseDialog: () => void;
  // onPressUpgrade: () => void;
  title: string;
}

const UpgradePremiumDialog: FC<IProps> = ({
  isVisible,
  onCloseDialog,
  // onPressUpgrade,
  title,
}) => {
  // const {userData} = useCustomSelector(state => state.auth);

  const onPressUpgrade = () => {
    navigationRef.navigate('OtherStack', {
      screen: 'Subscription',
    });
    onCloseDialog();
  };

  return (
    <>
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        onBackdropPress={onCloseDialog}
        onBackButtonPress={onCloseDialog}
        statusBarTranslucent
        avoidKeyboard>
        <View style={{backgroundColor: '#fff', borderRadius: 20, padding: 20}}>
          <Text
            center
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: '#2E9FF0',

              fontWeight: '600',
            }}>
            {title}
          </Text>

          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              marginVertical: 17,
              fontWeight: '400',
            }}>
            To add more than 3 required {'\n'} premium account
          </Text>
          <TouchableOpacity
            onPress={onPressUpgrade}
            style={{
              alignSelf: 'center',
              paddingVertical: 5,
              paddingHorizontal: 18,
              backgroundColor: theme.colors.green100,
              borderRadius: 50,
            }}>
            <Text
              style={{
                fontSize: 17,
                color: '#fff',
              }}>
              Upgrade to Premium
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default UpgradePremiumDialog;
