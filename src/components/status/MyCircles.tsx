import React, {useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import {StatusStackParamList} from '.';
import {IScreenProps} from 'interfaces/INavigation';
import {StyleSheet, View} from 'react-native';
import {theme} from 'styles/theme';

import {useCustomDispatch, useCustomSelector} from 'store';

import Header from 'components/Header';
import SingleCircle from 'components/status/SingleCircle';

import FlatListPagination from 'components/FlatListPagination';
import {getMyCircles, clearState} from 'store/reducers/myCircles';
import {IMyCircle} from 'interfaces/ICircle';

const MyCircles = () => {
  //   const {userData} = useCustomSelector(state => state.auth);
  const {myCircles, loading} = useCustomSelector(state => state.myCircles);

  const renderItem = ({item}: {item: IMyCircle}) => {
    return (
      <SingleCircle member={item} circleId={item?.circle?._id} isMyCircle />
    );
  };

  return (
    <>
      <Header
        title="My Circles"
        // showBack
      />
      <View style={{backgroundColor: theme.colors.white, flex: 1}}>
        <FlatListPagination
          contentContainerStyle={{paddingHorizontal: theme.size.pageBorder}}
          // additionalQuery={{
          //   type: 'friends',
          //   userId: userData?._id,
          // }}
          loading={loading}
          // totalItem={totalItem}

          data={myCircles}
          getApiData={getMyCircles}
          clearState={clearState}
          item={renderItem}
        />
      </View>
    </>
  );
};

export default MyCircles;
