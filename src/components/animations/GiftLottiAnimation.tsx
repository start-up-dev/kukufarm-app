import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import giftJson from 'animations/gift.json';
import {useCustomDispatch, useCustomSelector} from 'store';
import {removeGiftAnimation} from 'store/reducers/stream/currentStream';

const GiftLottiAnimation = () => {
  // const user = useCustomSelector(state => state.auth.userData);
  const {animations} = useCustomSelector(state => state.stream?.currentStream);

  const dispatch = useCustomDispatch();

  if (animations?.length < 1) return <></>;

  return animations?.map((item, index) => (
    <Lottie
      // ref={animationRef}
      key={index.toString()}
      source={giftJson?.[item]}
      style={{position: 'absolute'}}
      autoPlay
      loop={false}
      onAnimationFinish={() => {
        dispatch(removeGiftAnimation(item));
      }}
    />
  ));
};

export default GiftLottiAnimation;
