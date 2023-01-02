import React, {FC, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  StatusBar,
  View,
  NativeModules,
  Platform,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Modal from 'react-native-modal';
import Input from 'components/others/manuallyAdContactInput';

import {APP_NAME, DURATION_TOAST, MAX_EMERGENCY_CONTACT} from 'config/config';

import {getContactInfo} from 'utils/callingCodes';

// import {RnLabelPhoneNumberInput} from './PhoneInput';

import * as RNLocalize from 'react-native-localize';
import {RnLabelPhoneNumberInput} from 'components/PhoneInput';
import Text from 'components/Text';
import Button from 'components/Button';
import {theme} from 'styles/theme';
import Space from 'components/Space';

interface IProps {
  isVisible: boolean;
  onCloseDialog: () => void;
  onConfirm: () => void;
  contact: any;
  loading: boolean;
  isEdit: boolean;
}

const ContactConfirmDialog: FC<IProps> = ({
  isVisible,
  onCloseDialog,
  onConfirm,
  contact,
  loading,
  isEdit,
}) => {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('');
  const [address, setAddress] = useState('');
  const [invalidPhone, setInvalidPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');

  useEffect(() => {
    setName(contact?.name);
    setTarget(contact?.target?.replace(/[^0-9]/g, ''));
    setEmail(contact?.email);
    setRelation(contact?.relation);
    setAddress(contact?.address);
    if (contact?.target) {
      const phone = getContactInfo(contact?.target);
      if (phone) {
        setTarget(phone.phoneNumber);
        setCountryCode(phone.countryCode);
      } else {
        setCountryCode(RNLocalize.getCountry());
      }
    }

    return () => {
      setName('');
      setTarget('');
      setEmail('');
      setRelation('');
      setAddress('');
      setInvalidPhone('');
      setCountryCode('');
    };
  }, [contact]);

  const phoneInputRef = useRef(null);

  const onSubmit = () => {
    setInvalidPhone('');

    const checkValid = phoneInputRef.current?.isValidNumber(target);
    const callingCode = phoneInputRef.current?.getCallingCode();

    if (!checkValid) {
      setInvalidPhone('Invalid phone number');
      return;
    }

    const formData = {
      name,
      target: `+${callingCode + target}`,
      email,
      relation,
      address,
    };
    onConfirm(formData);
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
        <View style={{...styles.modalContainer, maxHeight: '70%'}}>
          <Text size={20} color={theme.colors.primary} center>
            {isEdit ? 'Edit emergency' : 'Please confirm contact'}
          </Text>
          {/* <Text>Please take the time to subscribe.</Text> */}
          {/* <Text>Your Check In matters.</Text> */}

          <ScrollView>
            <Input
              onChangeText={text => setName(text)}
              value={name}
              label="Name"
              icon="person"
              placeholder="Enter contact name"
              style={{paddingBottom: 4}}
            />

            {countryCode ? (
              <RnLabelPhoneNumberInput
                ref={phoneInputRef}
                onChangeText={text => {
                  setTarget(text);
                }}
                keyboardType="phone-pad"
                // placeholder="Phone Number"
                phoneInputContainer={true}
                error={invalidPhone}
                // value={target}
                // defaultValue={target}
                textInputProps={{
                  value: target,
                }}
                wrapperStyle={{
                  paddingBottom: 0,
                  marginTop: Platform.OS === 'ios' ? -6 : -13,
                }}
                containerStyle={{marginBottom: 0}}
                textContainerStyle={{paddingBottom: 3}}
                defaultCode={countryCode}
                setCountryCode={setCountryCode}
              />
            ) : null}
            <Input
              onChangeText={text => setEmail(text)}
              value={email}
              label="Email"
              icon="mail-outline"
              placeholder="Enter contact email"
              style={{paddingBottom: 4}}
            />
            <Input
              onChangeText={text => setAddress(text)}
              value={address}
              label="Address"
              icon="location"
              placeholder="Enter contact address"
              style={{paddingBottom: 4}}
            />
            <Input
              onChangeText={text => setRelation(text)}
              value={relation}
              label="Relationship"
              icon="people-outline"
              placeholder="Enter contact relationship"
              style={{paddingBottom: 4}}
            />
          </ScrollView>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',

              justifyContent: 'center',
            }}>
            <Button
              rounded
              onPress={onCloseDialog}
              style={{
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.black,
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 25,
              }}>
              <Text>Cancel</Text>
            </Button>
            <Space width={25} />
            <Button
              style={{paddingVertical: 8, paddingHorizontal: 25}}
              rounded
              loader={loading}
              onPress={onSubmit}>
              <Text color={theme.colors.white}>
                {isEdit ? 'Update' : 'Confirm'}
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ContactConfirmDialog;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
});
