import Space from 'components/Space';
import Text from 'components/Text';
import React, {FC} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {theme} from 'styles/theme';

interface IProps {
  isVisible: boolean;
  onCloseDialog: () => void;
  contacts: any[];
  setSelectedContact: (contact: any) => void;
  onModalHide: () => void;
  onBackdropPress: () => void;
  onCancelPress: () => void;
}

const ContactSelectDialog: FC<IProps> = ({
  isVisible,
  onCloseDialog,
  contacts,
  setSelectedContact,
  onModalHide,
  onCancelPress,
  onBackdropPress,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      style={{justifyContent: 'flex-end', marginHorizontal: 5}}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onCloseDialog}
      statusBarTranslucent
      onModalHide={onModalHide}
      avoidKeyboard>
      <View>
        <View style={{...styles.modalContainer}}>
          <View>
            <TouchableOpacity style={{paddingVertical: 12}} onPress={() => {}}>
              <Text size={16} center color={theme.colors.grey500}>
                {contacts?.[0]?.name}
              </Text>
            </TouchableOpacity>
            <View style={{width: '100%', height: 1, backgroundColor: '#ddd'}} />
          </View>
          {contacts?.map((item, index) => (
            <View key={index.toString()}>
              <TouchableOpacity
                style={{paddingVertical: 12}}
                onPress={() => {
                  setSelectedContact(item);
                }}>
                <Text size={18} center color={theme.colors.primary}>
                  {item.target}
                </Text>
              </TouchableOpacity>
              {contacts?.length !== index + 1 && (
                <View
                  style={{width: '100%', height: 1, backgroundColor: '#ddd'}}
                />
              )}
            </View>
          ))}
        </View>
        <Space height={10} />
        <TouchableOpacity
          onPress={onCancelPress}
          style={{...styles.modalContainer}}>
          <Text
            size={20}
            center
            bold
            style={{marginVertical: 10}}
            color={theme.colors.primary}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ContactSelectDialog;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    // paddingVertical: 10,
  },
});
