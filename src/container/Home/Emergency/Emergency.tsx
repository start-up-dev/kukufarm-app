import React, {useRef, useState} from 'react';
import Layout from 'components/Layout';
import {EmergencyStackParamList} from '.';
import {IScreenProps} from 'interfaces/INavigation';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {theme} from 'styles/theme';
import Feather from 'react-native-vector-icons/Feather';
import {navigationRef} from 'utils/navigation';
import {useCustomDispatch, useCustomSelector} from 'store';
import HeaderRadius from 'components/HeaderRadius';
import PopoverComp from 'components/Popover';
import FlatListPagination from 'components/FlatListPagination';
import SingleEmergencyContact from 'components/emergency/SingleEmergencyContact';
import {clearState, getEmergencies} from 'store/reducers/emergencies';
import {toggleEditing} from 'store/reducers/global';

import EmergencyContact from 'components/tutorial/EmergencyContact';
// import BottomActionSheet from 'components/BottomSheet';

type IProps = IScreenProps<EmergencyStackParamList, 'Emergency'>;

const Emergency: React.FC<IProps> = ({navigation, route}) => {
  // const {loading, users} = useCustomSelector(state => state.inbox.inboxUsers);
  const dispatch = useCustomDispatch();

  const isTutorial = route?.params?.isTutorial;

  // const {userData} = useCustomSelector(state => state.auth);
  const {isEditing} = useCustomSelector(state => state.global);
  const {loading, emergencies} = useCustomSelector(state => state.emergencies);

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return <SingleEmergencyContact contact={item} />;
  };

  return (
    <Layout darkStatusbar noSpace={isTutorial}>
      <HeaderRadius
        title="Emergency Contacts"
        // showBack
        options={
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 'auto',
            }}>
            <PopoverComp emergencies={emergencies} />

            <TouchableOpacity
              // onPress={this.onEditContact}
              // disabled={isEditing}
              style={{
                backgroundColor: !isEditing
                  ? theme.colors.primary
                  : theme.colors.secondary,
                marginLeft: 7,
                ...inlineStyles.circleBackground,
              }}>
              <Feather
                color={theme.colors.black}
                size={25}
                name="edit"
                style={{
                  fontWeight: 'bold',
                  ...inlineStyles.headerIcon,
                  fontSize: 21,
                }}
                onPress={() => dispatch(toggleEditing())}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <FlatListPagination
        contentContainerStyle={{paddingHorizontal: theme.size.pageBorder}}
        // additionalQuery={{
        //   type: 'friends',
        //   userId: userData?._id,
        // }}
        loading={loading}
        // totalItem={totalItem}

        data={emergencies}
        getApiData={getEmergencies}
        clearState={clearState}
        item={renderItem}
      />

      {isTutorial && <EmergencyContact />}
    </Layout>
  );
};

export default Emergency;

const inlineStyles = StyleSheet.create({
  circleBackground: {
    // backgroundColor: theme.colors.primary,
    borderRadius: 100,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    color: 'white',
    fontSize: 25,
  },
});
