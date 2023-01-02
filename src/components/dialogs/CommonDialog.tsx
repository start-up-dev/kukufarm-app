import Button from 'components/Button';
import Space from 'components/Space';
import Text from 'components/Text';
import {APP_NAME} from 'config/config';
import React, {FC} from 'react';
import {View, Image, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import {theme} from 'styles/theme';

interface IProps {
  isVisible: boolean;
  onCloseDialog: (isVisible: boolean) => void;
  onPressConfirm: () => void;
  onPressCancel: () => void;
  children: React.ReactNode;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const CommonDialog: FC<IProps> = ({
  isVisible,
  onCloseDialog,
  onPressConfirm,
  onPressCancel,
  children,
  title,
  confirmText,
  cancelText,
  confirmButtonStyle,
  cancelButtonStyle,
  loading,
}) => {
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
          <Text style={{fontSize: 22, color: theme.colors.primary}} bold center>
            {title || APP_NAME}
          </Text>

          <View style={{padding: 10}}>{children}</View>
          <View style={{...styles.btnGroupCheckIn, marginTop: 15}}>
            <Button
              rounded
              sm
              onPress={onPressCancel}
              style={[
                {
                  backgroundColor: theme.colors.white,
                  borderColor: theme.colors.black,
                  borderWidth: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 25,
                },
                cancelButtonStyle,
              ]}>
              <Text bold>{cancelText || 'Close'}</Text>
            </Button>
            <Space width={25} />
            <Button
              rounded
              sm
              onPress={onPressConfirm}
              loader={loading}
              style={[
                {paddingVertical: 8, paddingHorizontal: 25},
                confirmButtonStyle,
              ]}>
              <Text dark bold>
                {confirmText || 'Confirm'}
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CommonDialog;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  btnCheckInContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '100%',
  },
  btnGroupCheckIn: {
    marginTop: 10,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'center',
  },
});
