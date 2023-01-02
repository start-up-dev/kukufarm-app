import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';

interface IProps {
  isModalVisible: boolean;
  statusBarTranslucent?: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
const ActionModal = ({
  isModalVisible,
  statusBarTranslucent,
  setIsModalVisible,
  children,
  style,
  ...rest
}: IProps) => {
  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      animationIn="zoomIn"
      animationOut="zoomOut"
      statusBarTranslucent={statusBarTranslucent}
      onBackdropPress={() => setIsModalVisible(false)}
      style={style}
      {...rest}>
      {children}
    </Modal>
  );
};

export default ActionModal;
