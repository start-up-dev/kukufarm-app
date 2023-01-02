import React, {useRef, useState} from 'react';
import Layout from 'components/Layout';
import {OtherStackParamList} from '.';
import {IScreenProps} from 'interfaces/INavigation';
import {View} from 'react-native';
import {theme} from 'styles/theme';
import {useCustomDispatch, useCustomSelector} from 'store';

import FlatListPagination from 'components/FlatListPagination';

import Container from 'components/Container';
import Flex from 'components/Flex';
import BackButton from 'components/Back';
import {getTrackList, clearState} from 'store/reducers/trackList';
import SingleTrack from 'components/others/SingleTrack';
// import BottomActionSheet from 'components/BottomSheet';

type IProps = IScreenProps<OtherStackParamList, 'TrackList'>;

const TrackList: React.FC<IProps> = ({navigation, route}) => {
  const {loading, tracks} = useCustomSelector(state => state.trackList);

  const userID = route?.params?.trackId;
  console.log(userID);

  const renderItem = ({item}: {item: ICheckIn}) => {
    return <SingleTrack checkIn={item} />;
  };

  return (
    <Layout darkStatusbar safeArea noSpace>
      <Flex
        justify="flex-start"
        align="flex-end"
        style={{backgroundColor: theme.colors.white}}>
        <BackButton dark title="Wellness Check In" />
      </Flex>

      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.white,
          paddingTop: 15,
        }}>
        <FlatListPagination
          contentContainerStyle={{paddingHorizontal: theme.size.pageBorder}}
          additionalQuery={{
            userID: userID,
          }}
          loading={loading}
          // totalItem={totalItem}
          listEmptyText="There is no Circle Chat"
          data={tracks}
          getApiData={getTrackList}
          clearState={clearState}
          item={renderItem}
        />
      </View>
    </Layout>
  );
};

export default TrackList;
