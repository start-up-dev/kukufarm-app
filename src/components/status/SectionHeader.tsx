import Avatar from 'components/Avatar';
import SingleEmoji from 'components/SingleEmoji';
import Space from 'components/Space';
import Text from 'components/Text';
import React, {Component, FC, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';
import {ICircle} from 'interfaces/ICircle';
import PopoverComp from './SingleCirclePopover';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
  section: ICircle;
}

const SectionHeader: FC<IProps> = ({section}) => {
  return (
    <PopoverComp circleId={section?._id} circleNE={section?.name}>
      <View
        style={{
          backgroundColor: theme.colors.white,
          // borderRadius: 2,
          padding: theme.size.pageBorder,
          paddingVertical: 2,
          // flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 7,
        }}>
        <Text
          center
          style={{
            fontSize: 18,
            // textAlign: 'center',
            color: theme.colors.blue,
            marginVertical: 6,
          }}>
          {section?.name}
        </Text>
        {section?.data?.length === 0 && (
          <Ionicons
            color={theme.colors.black}
            size={20}
            name="md-add-circle-outline"
            style={{
              fontWeight: 'bold',
              // marginLeft: 10,
              alignSelf: 'center',
              marginTop: -5,
            }}
          />
        )}
      </View>
    </PopoverComp>
  );
};
export default SectionHeader;
