import React, {FC, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import {IScreenProps} from 'interfaces/INavigation';
import {KeyboardAvoidingView, Platform, TextInput, View} from 'react-native';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Space from 'components/Space';
import Container from 'components/Container';
import Flex from 'components/Flex';
import {OtherStackParamList} from '.';
import {statusbarHeight} from 'utils/helper';
import {isIos} from 'utils/conditions';
import BackButton from 'components/Back';
import Input from 'components/Input';
import Button from 'components/Button';
import {useCustomDispatch, useCustomSelector} from 'store';
import {delete_account, updateProfile} from 'api/auth';
import {setAuthStore, updateAuthStore} from 'store/reducers/auth';
import RadioForm from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {showAlert} from 'utils/toast';

var radio_props = [
  {label: 'I have duplicate account', value: 0},
  {label: 'I am getting too many emails', value: 1},
  {label: 'I am not getting any value from my membership', value: 2},
  {label: 'I have a privacy concern', value: 3},
  {label: 'I am receiving unwanted contact', value: 4},
  {label: 'I am receiving too many notifications', value: 5},
  {label: 'Others', value: 6},
];

type IProps = IScreenProps<OtherStackParamList, 'AccountDelete'>;

const UpdateName: FC<IProps> = ({}) => {
  const {userData} = useCustomSelector(state => state.auth);

  const [reason, setReason] = useState('');
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useCustomDispatch();

  const onUpdateName = async () => {
    // console.log(value, reason);
    let deleteReason = '';
    if (value === 6) {
      deleteReason = reason;
    } else {
      deleteReason = radio_props.find(radio => radio.value === value)?.label!!;
    }

    if (!deleteReason) return;
    setLoading(true);
    try {
      const {data} = await delete_account({reason});

      dispatch(
        setAuthStore({
          userData: undefined,
          token: '',
        }),
      );

      setLoading(false);
      await AsyncStorage.clear();
      RNRestart.Restart();
    } catch (error) {
      console.log(error);
      showAlert(error?.message || 'Account delete failed!');
      setLoading(false);
    }
  };

  return (
    <Layout
      noSpace
      statusbarColor="black"
      darkStatusbar
      translucent={false}
      safeArea>
      <KeyboardAwareScrollView>
        <Container
          style={{
            // justifyContent: 'center',
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
              marginHorizontal: 10,
            }}>
            <Space height={20} />
            <Text color="#555" size={20}>
              {userData?.name}, We're sorry to see you to go
            </Text>
            <Space height={20} />
            <Text color="#555" size={18} style={{fontWeight: '500'}}>
              Tell us why you're closing your account:
            </Text>
            <Space height={30} />
            {/* <Text size={30}>Input Your Name</Text> */}
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={value => {
                setValue(value);
                if (value !== 6) {
                  setReason('');
                }
              }}
              buttonColor={theme.colors.primary}
              selectedButtonColor={theme.colors.secondary}
              labelColor="#555"
              buttonSize={15}
            />
            <Space height={9} />
            <Text color="#666" size={15}>
              Your feedback matters. Is there any else you'd like us to know?
            </Text>
            <Space height={8} />
            <TextInput
              placeholder="Your feedback"
              style={{
                borderWidth: 1,
                borderColor: '#bbb',
                // flex: 1,
                width: '100%',
                height: 100,
                borderRadius: 10,
                padding: 10,
              }}
              editable={value === 6}
              // label="Input Your Name"
              onChangeText={setReason}
              value={reason}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor={'#888'}
            />
          </View>
          <Space height={50} />
          <Button rounded sm onPress={onUpdateName} loader={loading}>
            Delete Account
          </Button>
        </Container>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export default UpdateName;
