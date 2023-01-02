import React, {Component, FC} from 'react';

import {getDisplayTime, hunamDuration, timeFromNow} from 'utils/time';
import {getNotificationStyle} from 'utils/images';
import {StyleSheet, View} from 'react-native';
import SingleEmoji from 'components/SingleEmoji';
import Text from 'components/Text';
import {theme} from 'styles/theme';
import {ICheckIn} from 'interfaces/ICheckin';
import Space from 'components/Space';

interface IProps {
  checkIn: ICheckIn;
}

const SingleFrdCheckin: FC<IProps> = ({checkIn}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginBottom: 13,
        marginTop: 15,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <SingleEmoji
          // selectedEmoji={checkIn?.status}
          value={checkIn?.status}
          // style={{width: 30, height: 30}}
          // textStyle={{fontSize: 18}}
        />
        <Space width={10} />
        <View>
          {checkIn?.user?.name && (
            <Text size={16} color={'#444'}>
              {checkIn?.user?.name}
            </Text>
          )}

          {checkIn?.status ? (
            <Text style={styles.subText}>
              Checked in at {getDisplayTime(checkIn?.createdAt)}
            </Text>
          ) : (
            <Text size={15} color={'#555'}>
              Did not check in
            </Text>
          )}
          {checkIn?.text ? (
            <Text style={styles.subTextDesc}>{checkIn?.text}</Text>
          ) : (
            <Text>...</Text>
          )}
        </View>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 12, color: 'gray'}}>
          {timeFromNow(checkIn?.createdAt)}
        </Text>
      </View>
    </View>
  );
};
export default SingleFrdCheckin;

const styles = StyleSheet.create({
  subText: {
    color: theme.colors.grey100,
    fontSize: 15,
  },

  subTextDesc: {
    color: '#555',
    fontSize: 12,
    marginTop: 5,
  },
});
