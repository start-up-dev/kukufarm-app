import React from 'react';

import {Image, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {theme} from 'styles/theme';
import {renderEmoji} from 'utils/renderEmoji';
// import styles, {Material} from '../styles';

const SingleEmojiForDialog = ({
  onSelectEmoji = () => {},
  selectedEmoji,
  value,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onSelectEmoji}
      style={{
        ...style,
      }}>
      <View style={{justifyContent: 'space-around', alignItems: 'center'}}>
        <View
          style={{
            borderTopColor:
              selectedEmoji === value ? theme.colors.primary : 'black',
            borderTopWidth: 2,
            transform: [{rotate: '90deg'}],
            marginTop: 7,
            // backgroundColor: 'green',
            width: 16,
          }}></View>
        <View style={{marginTop: 7}}>
          <Text
            style={{
              // fontSize: 30,
              fontSize: selectedEmoji === value ? 33 : 31,
              color: selectedEmoji === value ? 'black' : '#333',
              fontWeight: selectedEmoji === value ? '800' : '600',

              ...textStyle,
            }}>
            {value}
          </Text>
        </View>
        <View>
          <Image
            source={renderEmoji(value)}
            style={{
              ...inlineStyles.emojiButton,
              width: selectedEmoji === value ? 47 : 41,
              height: selectedEmoji === value ? 47 : 41,
            }}
          />
        </View>

        {selectedEmoji === value && (
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 50,
              backgroundColor: theme.colors.primary,
              marginTop: 5,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SingleEmojiForDialog;

const inlineStyles = StyleSheet.create({
  emojiButton: {
    width: 41,
    height: 41,
    marginTop: 2,
  },
});
