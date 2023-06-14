import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import color from 'constants/color';
import {navigationRef} from 'utils/navigation';

const SingleItem = ({title, subtitle, link, coopId, offlineId}) => {
  return (
    <TouchableOpacity
      onPress={
        link
          ? () => navigationRef.navigate(link, {coopId: coopId, offlineId})
          : // navigation.navigate(link, coopId && {coopId: coopId, offlineId})
            null
      }
      style={styles.coopView}>
      <Text style={styles.coopTitle}>{title}</Text>
      <Text style={styles.flockCount}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  coopView: {
    borderWidth: 1,
    height: 104,
    borderColor: color.border,
    borderRadius: 7,
    padding: 20,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  coopTitle: {
    fontFamily: 'Sora-Regular',
    fontSize: 18,
    lineHeight: 24,
    color: color.foundation,
  },
  flockCount: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: color.TextSecondary,
  },
});

export default SingleItem;
