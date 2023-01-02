import React, {FC} from 'react';

import {Image, StyleSheet} from 'react-native';

import {renderEmoji} from 'utils/renderEmoji';

interface IProps {
  value: number;
}

const SingleEmoji: FC<IProps> = ({value}) => {
  return (
    <Image
      source={renderEmoji(value)}
      style={{
        ...inlineStyles.emojiButton,
      }}
    />
  );
};

export default SingleEmoji;

const inlineStyles = StyleSheet.create({
  emojiButton: {
    width: 30,
    height: 30,
  },
});
