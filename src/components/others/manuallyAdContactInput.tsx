import React, {Component, FC} from 'react';
import Text from 'components/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {StyleProp, TextInput, View, ViewStyle} from 'react-native';
import {theme} from 'styles/theme';

interface IProps {
  label: string;
  icon: string;
  onChangeText: (value: string) => void;
  value: string;
  placeholder: string;
  style: StyleProp<ViewStyle>;
}

const ManuallyAddContactInput: FC<IProps> = ({
  label,
  icon,
  onChangeText,
  value,
  placeholder,
  style,
}) => {
  return (
    <>
      <View style={{marginVertical: 15}}>
        <Text style={{marginLeft: 30, color: 'gray'}} size={17}>
          {label}
        </Text>
        <View
          style={[
            {
              flexDirection: 'row',
              borderBottomColor: '#e1e1e1',
              borderBottomWidth: 1,
              // paddingBottom: 7,
            },
            style,
          ]}>
          <Ionicons
            name={icon}
            style={{color: theme.colors.brandWarning}}
            size={20}
          />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 5,
              fontSize: 18,
              color: theme.colors.black,
            }}
            placeholder={placeholder || 'Enter contact name'}
            onChangeText={onChangeText}
            value={value}
          />
        </View>
      </View>
    </>
  );
};

export default ManuallyAddContactInput;
