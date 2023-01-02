import {StyleProp, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import Lottie from 'lottie-react-native';
import liveJson from 'animations/live.json';

interface IProps {
  name: string;
  style?: StyleProp<ViewStyle>;
}

const BarChartAnimation: FC<IProps> = ({name, style, ...rest}) => {
  return (
    <Lottie
      // ref={animationRef}
      source={liveJson?.[name]}
      style={[{position: 'relative'}, style]}
      autoPlay
      //   loop={false}
      //   onAnimationFinish={() => {}}
      {...rest}
    />
  );
};

export default BarChartAnimation;
