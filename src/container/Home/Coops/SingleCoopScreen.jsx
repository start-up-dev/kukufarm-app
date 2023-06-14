import {SafeAreaView, Text, ScrollView, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import color from 'constants/color';
import Button from 'components/common/Button';
import Space from 'components/common/Space';
import SingleItem from 'components/coops/SingleItem';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getFlock} from 'api/coop';
import Loader from 'components/common/Loader';
import {navigationRef} from 'utils/navigation';
import {useCustomSelector} from 'store';

const SingleCoopScreen = ({route}) => {
  const navigation = useNavigation();

  const flock = useCustomSelector(state => state.coops.flock);
  const status = useCustomSelector(state => state.coops.status);

  const dispatch = useDispatch();

  const {coopId, offlineId} = route.params;
  console.log('====================================');
  console.log('Single Coop screen', offlineId);
  console.log('====================================');

  const getWeeks = date => {
    const inputDateParts = date.split('-');
    const day = parseInt(inputDateParts[0]);
    const month = parseInt(inputDateParts[1]) - 1; // Month is zero-based in Date object
    const year = parseInt(inputDateParts[2]);
    const inputDate = new Date(year, month, day);

    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - inputDate.getTime();
    const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

    return weeksDiff;
  };

  useEffect(() => {
    // if (flock === null) {
    dispatch(getFlock(coopId));
    // }
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: color.background, flex: 1}}>
      <StatusBar />
      <Loader visible={status === 'loading' ? true : false} />
      <ScrollView style={{paddingHorizontal: 20}}>
        <Space height={20} />
        <Button
          title="New Flock"
          onPress={() =>
            navigationRef.navigate('OtherStack', {
              screen: 'AddFlock',
              params: {coopId: coopId, offlineId},
            })
          }
          icon
        />
        <Space height={20} />
        {flock?.length > 0 &&
          flock.map(item => (
            <SingleItem
              title={item?.name}
              subtitle={`${item?.quantity} Birds · ${getWeeks(
                item?.dateStarted,
              )} W`}
              link="FlockDetails"
              coopId={item?._id}
              key={item?._id}
              offlineId={offlineId}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleCoopScreen;
