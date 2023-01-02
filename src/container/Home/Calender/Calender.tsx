import React, {useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import {CalenderStackParamList} from '.';
import {IScreenProps} from 'interfaces/INavigation';
import {ImageBackground, TouchableOpacity, View} from 'react-native';

import HeaderRadius from 'components/HeaderRadius';

import Text from 'components/Text';
import Image from 'components/Image';
import Calender from 'components/calender/Calender';
import RedeemDialog from 'components/dialogs/RedeemDialog';
import {useCustomDispatch, useCustomSelector} from 'store';
import {showAlert} from 'utils/toast';
import {get_checkIn_list} from 'api/calender';
import {filterCheckInData} from 'utils/calender';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from 'styles/theme';

// import BottomActionSheet from 'components/BottomSheet';

type IProps = IScreenProps<CalenderStackParamList, 'Calender'>;

const CalenderScreen: React.FC<IProps> = ({navigation, route}) => {
  // const {loading, users} = useCustomSelector(state => state.inbox.inboxUsers);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkInList, setCheckInList] = useState([]);

  const {userData} = useCustomSelector(state => state.auth);

  // const dispatch = useCustomDispatch();
  const getCheckInList = async (year: string, month: string) => {
    setLoading(true);
    try {
      // await auth().signOut();
      const {data} = await get_checkIn_list(year, month);

      const values = filterCheckInData(data?.data).sort(function (a, b) {
        var c = new Date(a.title);
        var d = new Date(b.title);
        return d - c;
      });
      setCheckInList(values);
      setLoading(false);
    } catch (error) {
      console.log(error);
      showAlert(error?.message || 'Get checking list failed');
      setLoading(false);
    }
  };

  useEffect(() => {
    getCheckInList(moment().year(), moment().month() + 1);
  }, []);

  return (
    <Layout darkStatusbar>
      <HeaderRadius
        title="Check In Diary"
        // showBack
        options={
          <View>
            {userData?.checkInStack ? (
              <>
                <ImageBackground
                  source={require('assets/images/start.png')}
                  style={{
                    width: 37,
                    height: 37,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    color={theme.colors.primary}
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: 4,
                    }}>
                    {userData?.checkInStack}
                  </Text>
                </ImageBackground>
                {/* <Ionicons
                  color={theme.colors.orange100}
                  size={26}
                  name="star"
                  // style={{fontSize: 25}}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {userData?.checkInStack}
                </Text> */}
              </>
            ) : userData?.stackPoint ? (
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <Image
                  source={require('assets/images/start.png')}
                  style={{width: 37, height: 37}}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        }
      />
      <View style={{marginVertical: 4}} />
      <Calender
        notifications={checkInList}
        getData={getCheckInList}
        isLoading={loading}
      />

      <RedeemDialog
        isVisible={isVisible}
        onCloseDialog={() => setIsVisible(!isVisible)}
        // onConfirm={onConfirm}
      />
    </Layout>
  );
};

export default CalenderScreen;
