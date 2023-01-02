import {StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import Avatar from 'components/Avatar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import SingleRow from './SingleRow';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Space from 'components/Space';
import {IEmergency} from 'interfaces/IEmergency';
import {delete_emergency_contact, edit_emergency_contact} from 'api/emergency';
import {useCustomDispatch, useCustomSelector} from 'store';
import {
  editEmergency,
  removeEmergenciesContact,
} from 'store/reducers/emergencies';
import {showAlert} from 'utils/toast';
import ActivityInd from 'components/ActivityIndicator';
import CommonDialog from 'components/dialogs/CommonDialog';
import ContactConfirmDialog from 'components/dialogs/ContactConfirmDialog';

interface IProps {
  contact: IEmergency;
}

const SingleEmergencyContact: FC<IProps> = ({contact}) => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [showEditVisible, setShowEditVisible] = useState(false);
  const {isEditing} = useCustomSelector(state => state.global);

  const dispatch = useCustomDispatch();
  const onDeleteEmergencyContact = async () => {
    setLoading(true);
    try {
      const {data} = await delete_emergency_contact(contact?._id);
      dispatch(removeEmergenciesContact(contact?._id));
      setLoading(false);
      setIsVisible(false);
    } catch (error) {
      showAlert(error?.mesage || 'Failed to delete emergency contact', 'error');
      setLoading(false);
    }
  };

  const onConfirmEditContact = async (editedContact: any) => {
    const formData = {
      name: editedContact?.name,
      phoneNumber: editedContact?.target,
      email: editedContact?.email,
      relationship: editedContact?.relation,
      address: editedContact?.address,
    };

    setEditLoading(true);

    try {
      const {data} = await edit_emergency_contact(contact?._id, formData);
      dispatch(editEmergency(data?.emergencyContact));

      setShowEditVisible(!showEditVisible);
      setEditLoading(false);
    } catch (error) {
      showAlert(error?.message || 'Failed to add contact', 'error');
      setEditLoading(false);
    }
  };

  return (
    <>
      <View
        style={{
          marginTop: 15,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 15,
          backgroundColor: theme.colors.white,
        }}>
        <View style={{padding: 17}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Avatar size={45} />
              <Text style={{marginLeft: 5}} size={18} bold primary>
                {contact?.name}
              </Text>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              {!isEditing ? (
                <Ionicons
                  color={theme.colors.danger}
                  size={25}
                  name="notifications"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              ) : (
                <Ionicons
                  color={theme.colors.danger}
                  onPress={() => setIsVisible(!isVisible)}
                  size={25}
                  name="close-sharp"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              )}
            </View>
          </View>
          <Space height={5} />
          <SingleRow
            setShowEditVisible={setShowEditVisible}
            icon={
              <FontAwesome5
                color={'#666'}
                size={25}
                name="phone-alt"
                style={{
                  fontWeight: 'bold',
                }}
              />
            }
            content={contact?.phoneNumber}
          />
          <SingleRow
            setShowEditVisible={setShowEditVisible}
            icon={
              <MaterialCommunityIcons
                color={'#666'}
                size={25}
                name="email"
                style={{
                  fontWeight: 'bold',
                }}
              />
            }
            content={contact?.email}
          />
          <SingleRow
            setShowEditVisible={setShowEditVisible}
            icon={
              <Ionicons
                color={'#666'}
                size={25}
                name="location"
                style={{
                  fontWeight: 'bold',
                }}
              />
            }
            content={contact?.address}
          />
          <SingleRow
            setShowEditVisible={setShowEditVisible}
            icon={
              <Ionicons
                color={'#666'}
                size={25}
                name="people"
                style={{
                  fontWeight: 'bold',
                }}
              />
            }
            content={contact?.relationship}
          />
        </View>
      </View>
      <CommonDialog
        isVisible={isVisible}
        onCloseDialog={() => setIsVisible(!isVisible)}
        onPressCancel={() => setIsVisible(!isVisible)}
        onPressConfirm={onDeleteEmergencyContact}
        confirmButtonStyle={{
          backgroundColor: theme.colors.primary,
        }}
        title="Alert!"
        confirmText={'Yes'}
        cancelText="No"
        loading={loading}>
        <Text size={17} style={{alignSelf: 'center'}} color={'#444'}>
          Are you sure want to remove this contact?
        </Text>
      </CommonDialog>
      <ContactConfirmDialog
        isVisible={showEditVisible}
        onCloseDialog={() => setShowEditVisible(!showEditVisible)}
        onConfirm={onConfirmEditContact}
        isEdit={true}
        contact={{
          name: contact?.name,
          target: contact?.phoneNumber,
          email: contact?.email,
          address: contact?.address,
          relation: contact?.relationship,
        }}
        loading={editLoading}
      />
    </>
  );
};

export default SingleEmergencyContact;

const styles = StyleSheet.create({});
