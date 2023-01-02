import React, {useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import {StatusStackParamList} from '.';
import {IScreenProps} from 'interfaces/INavigation';
import {
  RefreshControl,
  SectionList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from 'styles/theme';
import Feather from 'react-native-vector-icons/Feather';
import {navigationRef} from 'utils/navigation';
import {useCustomDispatch, useCustomSelector} from 'store';

import Header from 'components/Header';
import SingleCircle from 'components/status/SingleCircle';
import {
  addCircles,
  clearState,
  getCircles,
  updateCircleName,
} from 'store/reducers/circles';
import Text from 'components/Text';
import Image from 'components/Image';
import CommonDialog from 'components/dialogs/CommonDialog';
import {create_circle, update_circle} from 'api/circle';
import {showAlert} from 'utils/toast';
import SectionHeader from 'components/status/SectionHeader';

import ActivityInd from 'components/ActivityIndicator';
import MyCircles from 'components/status/MyCircles';
import Space from 'components/Space';
import UpgradePremiumDialog from 'components/dialogs/UpgradePremiumDialog';
import {MAX_EMERGENCY_CONTACT} from 'config/constants';

type IProps = IScreenProps<StatusStackParamList, 'Status'>;

const Emergency: React.FC<IProps> = ({navigation, route}) => {
  const [isVisiblePremium, setIsVisiblePremium] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [circleName, setCircleName] = useState('');

  const {userData} = useCustomSelector(state => state.auth);
  const {circles, loading: getCircleLoading} = useCustomSelector(
    state => state.circles,
  );

  const dispatch = useCustomDispatch();

  const getData = () => {
    dispatch(clearState());
    dispatch(getCircles());
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = () => {
    getData();
  };

  const onPressCreate = async () => {
    if (!circleName) return;
    let trimText = circleName.trim();
    setLoading(true);
    try {
      const payload = {
        name: trimText,
      };

      const {data} = await create_circle(payload);
      dispatch(addCircles({...data?.circle, data: []}));
      showAlert('Circle created successfully', 'success');

      setCircleName('');
      setLoading(false);
      setIsVisible(false);
    } catch (error) {
      showAlert('Failed to create circle', 'error');
      setLoading(false);
    }
  };

  const checkIfPremium = () => {
    if (userData?.isPurchased) {
      setIsVisible(true);
    } else if (circles?.length < MAX_EMERGENCY_CONTACT) {
      setIsVisible(true);
    } else {
      setIsVisiblePremium(true);
    }
  };

  const renderItem = ({item, section}: any) => {
    return <SingleCircle member={item} circleId={section?._id} />;
  };

  return (
    <Layout darkStatusbar>
      <Header
        title="Check In Circle"
        // showBack
        options={
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 'auto',
            }}>
            <TouchableOpacity
              onPress={checkIfPremium}
              // disabled={isEditing}
              style={{
                backgroundColor: theme.colors.primary,

                // marginLeft: 7,
                ...inlineStyles.circleBackground,
              }}>
              <Feather
                color={theme.colors.black}
                size={25}
                name="plus"
                style={{
                  fontWeight: 'bold',
                  ...inlineStyles.headerIcon,
                  // fontSize: 21,
                }}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={{backgroundColor: theme.colors.white, flex: 1}}>
        {getCircleLoading ? (
          <ActivityInd />
        ) : circles.length > 0 ? (
          <SectionList
            contentContainerStyle={
              {
                // paddingHorizontal: theme.size.pageBorder,
              }
            }
            // additionalQuery={{
            //   type: 'friends',
            //   userId: userData?._id,
            // }}
            // loading={loading}
            // totalItem={totalItem}
            sections={circles}
            // getApiData={getCircles}

            keyExtractor={(item, index) => index.toString()}
            // clearState={clearState}
            refreshControl={
              <RefreshControl
                // refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            renderItem={renderItem}
            renderSectionFooter={({section}) => {
              if (section.data.length === 0) {
                return (
                  <Text center color="#888" style={{marginBottom: 10}}>
                    No contact added yet.
                  </Text>
                );
              }
              return null;
            }}
            renderSectionHeader={({section}) => (
              <SectionHeader section={section} />
            )}
          />
        ) : (
          <View style={{marginTop: 50}}>
            <Image
              source={require('assets/images/hand_shake.png')}
              style={{width: 75, height: 75, alignSelf: 'center'}}
            />
            <Text
              onPress={checkIfPremium}
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#2E9FF0',
                marginVertical: 6,
              }}>
              Circle Name
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                color: theme.colors.brandDark,
              }}>
              Your Circle Will See Your Daily Check-Ins
            </Text>
            <Space height={5} />
            <View
              style={{
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={checkIfPremium}
                // disabled={isEditing}
                style={{
                  backgroundColor: theme.colors.primary,

                  // marginLeft: 7,
                  ...inlineStyles.circleBackground,
                }}>
                <Feather
                  color={theme.colors.black}
                  size={25}
                  name="plus"
                  style={{
                    fontWeight: 'bold',
                    ...inlineStyles.headerIcon,
                    // fontSize: 21,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <MyCircles />
      </View>
      <CommonDialog
        isVisible={isVisible}
        onCloseDialog={() => setIsVisible(!isVisible)}
        onPressCancel={() => setIsVisible(!isVisible)}
        onPressConfirm={onPressCreate}
        confirmButtonStyle={{
          backgroundColor: theme.colors.primary,
        }}
        title={'Name Your Circle'}
        confirmText={'Okay'}
        cancelText="Cancel"
        loading={loading}>
        {/* <Text size={17} style={{alignSelf: 'center'}} color={'#444'}>
          Please take the time to subscribe. Your Check In matters.
        </Text> */}
        <TextInput
          style={{
            fontSize: 18,
            color: theme.colors.primary,
            borderBottomColor: theme.colors.primary,
            borderBottomWidth: 1.4,
            paddingVertical: 5,
            marginVertical: 15,
            width: '90%',
            alignSelf: 'center',
            textAlign: 'center',
          }}
          placeholder="Circle name"
          onChangeText={setCircleName}
          value={circleName}
        />
      </CommonDialog>
      <UpgradePremiumDialog
        isVisible={isVisiblePremium}
        onCloseDialog={() => setIsVisiblePremium(false)}
        // onPressUpgrade={onPressUpgrade}
        title={'Create Your Circle'}
      />
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
