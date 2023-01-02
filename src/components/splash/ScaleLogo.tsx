import {StyleSheet, View, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Image from 'components/Image';
import logo from 'assets/images/logo_updated.png';

interface IProps {
  children?: React.ReactNode;
}

const ScaleLogo: React.FC<IProps> = ({children}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [toggle, setToggle] = useState(false);
  const scaleOut = () => {
    let animation;
    if (!toggle) {
      animation = Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      });
    } else {
      animation = Animated.timing(animatedValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      });
    }
    animation.start(() => {
      setToggle(!toggle);
    });
  };

  useEffect(() => {
    scaleOut();
  });
  let scaleAnim = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1.2],
  });

  return (
    <Animated.View style={{transform: [{scale: scaleAnim}]}}>
      {children || <Image size={120} source={logo} />}
    </Animated.View>
  );
};

export default ScaleLogo;

const styles = StyleSheet.create({});
