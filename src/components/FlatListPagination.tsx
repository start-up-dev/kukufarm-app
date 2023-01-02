import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  RefreshControl,
  Dimensions,
  FlatList,
  Text,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import {useCustomDispatch} from 'store';

// import { FlatList } from "react-native-gesture-handler";

import {theme} from 'styles/theme';

const {width, height} = Dimensions.get('window');

interface IProps {
  limit?: number;
  clearState?: () => void | any;
  getApiData?: (query: any, params: any) => void | any;
  loading?: boolean;
  data: any[];
  item: (item: any, index: number) => void;
  ListHeaderComponent?: () => React.ReactNode;
  ListEmptyComponent?: React.ReactNode;
  additionalQuery?: any;
  params?: object;
  plainApi?: boolean;
  totalItem?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onEndReachedThreshold?: number;
  listEmptyText?: string;
}

const FlatListPagination: React.FC<IProps> = React.forwardRef(
  (
    {
      limit = 20,
      clearState = () => {},
      getApiData = () => {},
      loading,
      data = [],
      item = () => <></>,
      additionalQuery = {},
      params,
      plainApi,
      totalItem,
      contentContainerStyle,
      ListHeaderComponent,
      ListEmptyComponent,
      onEndReachedThreshold,
      listEmptyText,
      ...rest
    },
    ref,
  ) => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useCustomDispatch();

    const getData = (query: object) => {
      if (loading) return;
      !!plainApi
        ? getApiData({...additionalQuery, ...query}, params)
        : dispatch(getApiData({...additionalQuery, ...query}, params));
    };

    useEffect(() => {
      !!plainApi ? clearState() : dispatch(clearState());
      getData({limit: limit});

      return () => {
        !!plainApi ? clearState() : dispatch(clearState());
      };
    }, [additionalQuery?.search, additionalQuery?.country]);

    // useEffect(() => {
    //   if (additionalQuery?.search) {
    //     !!plainApi ? clearState() : dispatch(clearState());
    //     getData({limit: limit, ...additionalQuery});
    //   } else {
    //     console.log('I M TEUE');

    //     !!plainApi ? clearState() : dispatch(clearState());
    //     getData({limit: limit});
    //   }
    // }, [additionalQuery?.search]);

    // useFocusEffect(
    //   React.useCallback(() => {
    //     // getData({ limit: limit });
    //     return () => {
    //       !!plainApi ? clearState() : dispatch(clearState());
    //     };
    //   }, [])
    // );

    const onRefresh = async () => {
      await setRefreshing(true);
      !!plainApi ? clearState() : await dispatch(clearState());
      await getData({limit: limit});
      await setRefreshing(false);
    };

    const loadMoreItem = () => {
      if (totalItem) {
        if (data?.length > limit - 1 && totalItem > data?.length) {
          getData({limit: limit, skip: data?.length});
        }
      } else {
        if (data?.length > limit - 1) {
          getData({limit: limit, skip: data?.length});
        }
      }
    };

    const renderItem = useCallback(item, [data]);

    const renderLoader = () => {
      if (refreshing) return <></>;
      return (
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              width: width,
            }}>
            {loading ? <ActivityIndicator /> : null}
          </View>
        </>
      );
    };

    return (
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        ref={ref}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={onEndReachedThreshold || 0}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={() => (
          <>
            {!loading && !refreshing ? (
              ListEmptyComponent ? (
                ListEmptyComponent
              ) : (
                <Text
                  style={[
                    {
                      fontSize: 18,
                      color: theme.colors.gray,
                      marginVertical: 8,
                      marginTop: 20,
                      textAlign: 'center',
                    },
                  ]}>
                  {listEmptyText || 'There is no data'}
                </Text>
              )
            ) : null}
          </>
        )}
        {...rest}
      />
    );
  },
);

export default FlatListPagination;
