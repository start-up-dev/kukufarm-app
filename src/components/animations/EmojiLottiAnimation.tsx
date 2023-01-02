import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import Lottie from 'lottie-react-native';
import emojiJson from 'animations/emoji.json';
import {useCustomDispatch} from 'store';
import {updateCurrentStream} from 'store/reducers/stream/currentStream';

interface IProps {
  emoji: string;
  chairName: string;
}

const EmojiLottiAnimation: FC<IProps> = ({emoji, chairName}) => {
  //   const animationRef = useRef<Lottie>(null);

  //   useEffect(() => {
  //     animationRef.current?.play();

  //     // Or set a specific startFrame and endFrame with:
  //     // animationRef.current?.play(30, 120);
  //   }, []);
  //   console.log(emojiJson);

  const dispatch = useCustomDispatch();

  return (
    <Lottie
      // ref={animationRef}
      source={emojiJson?.[emoji]}
      style={{position: 'absolute', zIndex: 9999999}}
      autoPlay
      loop={false}
      onAnimationFinish={() => {
        dispatch(
          updateCurrentStream({
            [chairName]: {
              emoji: null,
            },
          }),
        );
      }}
    />
  );
};

export default EmojiLottiAnimation;
