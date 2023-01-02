import React, {FC, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import {IScreenProps} from 'interfaces/INavigation';
import {View} from 'react-native';
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
import {updateProfile} from 'api/auth';
import {setAuthStore, updateAuthStore} from 'store/reducers/auth';
import {navigationRef} from 'utils/navigation';
import {redirectSignUpStep} from 'utils/redirectSignupStep';

type IProps = IScreenProps<OtherStackParamList, 'UpdateName'>;

const UpdateName: FC<IProps> = ({route}) => {
  const {userData} = useCustomSelector(state => state.auth);

  const [name, setName] = useState(userData?.name || '');
  const [loading, setLoading] = useState(false);

  const dispatch = useCustomDispatch();

  const onUpdateName = async () => {
    if (!name) return;
    setLoading(true);
    try {
      const {data} = await updateProfile({name});

      dispatch(
        updateAuthStore({
          name,
        }),
      );
      redirectSignUpStep(route?.params?.isFromSignUp!!, 'UpdatePhone');
      setLoading(false);
    } catch (error) {
      console.log(error);
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
          {/* <Text size={30}>Input Your Name</Text> */}
          <Input
            placeholder="Your Name"
            style={{borderRadius: 50}}
            containerStyle={{width: '100%'}}
            label="Input Your Name"
            onChangeText={setName}
            value={name}
          />
        </View>
        <Button rounded sm onPress={onUpdateName} loader={loading}>
          Next
        </Button>
      </Container>
    </Layout>
  );
};

export default UpdateName;
