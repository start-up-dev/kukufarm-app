import Text from 'components/Text';
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const RedeemDialog = ({isVisible, onCloseDialog}) => {
  return (
    <>
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        onBackdropPress={onCloseDialog}
        onBackButtonPress={onCloseDialog}
        statusBarTranslucent
        avoidKeyboard>
        <View style={{...styles.modalContainer}}>
          <Text style={{fontSize: 16, color: '#2E9FF0'}}>Use Your Credit</Text>

          <View style={{padding: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('assets/images/progress.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={{fontSize: 16, marginLeft: 20}}>Check Progress</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 18,
              }}>
              <Image
                source={require('assets/images/redeem.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={{fontSize: 16, marginLeft: 20}}>Redeem</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('assets/images/donate.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={{fontSize: 16, marginLeft: 20}}>Donate</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RedeemDialog;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
});
