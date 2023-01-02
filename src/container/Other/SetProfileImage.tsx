import React, {FC, useCallback, useRef, useState} from 'react';
import Layout from 'components/Layout';
import {IScreenProps} from 'interfaces/INavigation';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Space from 'components/Space';
import {Icons} from 'icon/icons';
import Container from 'components/Container';
import Flex from 'components/Flex';
import {OtherStackParamList} from '.';
import {statusbarHeight} from 'utils/helper';
import {isIos} from 'utils/conditions';
import BackButton from 'components/Back';
import Input from 'components/Input';
import Button from 'components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectUploadTypeSheet from 'components/sheet/SelectUploadType';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useCustomDispatch, useCustomSelector} from 'store';
import {updateProfile} from 'api/auth';
import {updateAuthStore} from 'store/reducers/auth';
import Image from 'components/Image';
import Avatar from 'components/Avatar';
import {navigationRef} from 'utils/navigation';
import {updateTutorialStep} from 'store/reducers/tutorial';
import {Tutorial} from 'interfaces/IConfig';

type IProps = IScreenProps<OtherStackParamList, 'SetProfileImage'>;

const SetProfileImage: FC<IProps> = ({route}) => {
  const selectUploadRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    selectUploadRef.current?.present();
  }, []);

  const {userData} = useCustomSelector(state => state.auth);
  console.log(userData?.avatar);

  const [avatar, setAvatar] = useState(userData?.avatar || '');
  const [loading, setLoading] = useState(false);

  const dispatch = useCustomDispatch();

  const onProfileImageUpdate = async () => {
    if (!avatar) return;
    setLoading(true);
    try {
      const {data} = await updateProfile({avatar});

      dispatch(
        updateAuthStore({
          avatar,
        }),
      );
      setLoading(false);
      if (route.params?.isFromSignUp) {
        dispatch(updateTutorialStep(Tutorial.EMERGENCY_CONTACT));
      } else {
        navigationRef.goBack();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Layout
        noSpace
        statusbarColor="black"
        darkStatusbar
        translucent={false}
        safeArea>
        <Container
          style={{
            justifyContent: 'center',
            backgroundColor: theme.colors.white,
            flex: 1,
            padding: theme.size.pageBorder + 5,
          }}>
          {/* {isIos && <Space height={statusbarHeight} />} */}
          <Flex justify="flex-start" align="flex-end">
            <BackButton dark title="" />
          </Flex>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text size={30} center style={{marginBottom: 10}} color={'#444'}>
              Select Profile Image
            </Text>
            <TouchableOpacity
              onPress={handlePresentModalPress}
              style={{
                backgroundColor: '#eee',
                width: avatar ? 120 : 80,
                height: avatar ? 120 : 80,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {avatar ? (
                <Avatar size={120} source={avatar} />
              ) : (
                <AntDesign
                  color={theme.colors.primary}
                  size={30}
                  name="plus"
                  style={{
                    fontWeight: 'bold',
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <Button rounded sm onPress={onProfileImageUpdate} loader={loading}>
            Next
          </Button>
        </Container>
      </Layout>
      <SelectUploadTypeSheet
        selectUploadRef={selectUploadRef}
        setAvatar={setAvatar}
      />
    </>
  );
};

export default SetProfileImage;
