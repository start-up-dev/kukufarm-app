import React, {useEffect} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {theme} from 'styles/theme';

const Ring = ({
  delay,
  style,
}: {
  delay: number;
  style?: StyleProp<ViewStyle>;
}) => {
  const ring = useSharedValue(0.7);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 1.1]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 500,
        }),
        -1,
        false,
      ),
    );
  }, []);
  return <Animated.View style={[styles.ring, ringStyle, style]} />;
};

interface IProps {
  children: React.ReactNode;
  isShowWave: boolean;
  isHost?: boolean;
}

const AudioWave: React.FC<IProps> = ({children, isShowWave, isHost}) => {
  const getStyle = () => {
    return {width: isHost ? 120 : 80, height: isHost ? 120 : 80};
  };

  return (
    <View
      style={{
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'column',
      }}>
      {isShowWave && (
        <>
          <Ring delay={0} style={getStyle()} />
          <Ring delay={100} style={getStyle()} />
          <Ring delay={200} style={getStyle()} />
          <Ring delay={300} style={getStyle()} />
          <Ring delay={400} style={getStyle()} />
          <Ring delay={500} style={getStyle()} />
          {/* <Ring delay={1250} style={getStyle()} />
          <Ring delay={1500} style={getStyle()} /> */}
        </>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    borderRadius: 50,
    borderColor: theme.colors.white,
    borderWidth: 2,
  },
});

export default AudioWave;

// import {StyleSheet, View, Animated} from 'react-native';
// import React, {useEffect, useRef} from 'react';

// const AudioWave = () => {
//   const ripple = useRef(new Animated.Value(0)).current;
//   const opacity = useRef(new Animated.Value(1)).current;

//   const ripple2 = useRef(new Animated.Value(0)).current;
//   const opacity2 = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.stagger(1000, [
//       Animated.loop(
//         Animated.parallel([
//           Animated.timing(ripple, {
//             toValue: 1,
//             duration: 1500,
//             useNativeDriver: true,
//           }),

//           Animated.timing(opacity, {
//             toValue: 0,
//             duration: 1500,
//             useNativeDriver: true,
//           }),
//         ]),
//       ),

//       Animated.loop(
//         Animated.parallel([
//           Animated.timing(ripple2, {
//             toValue: 1,
//             duration: 1500,
//             useNativeDriver: true,
//           }),

//           Animated.timing(opacity2, {
//             toValue: 0,
//             duration: 1500,
//             useNativeDriver: true,
//           }),
//         ]),
//       ),
//     ]).start();
//   }, []);

//   return (
//     <View
//       style={{
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         backgroundColor: 'blue',
//       }}>
//       <Animated.View
//         style={{
//           width: 100,
//           height: 100,
//           borderRadius: 50,
//           backgroundColor: '#ff000055',

//           opacity: opacity,
//           transform: [
//             {
//               scale: ripple,
//             },
//           ],
//         }}>
//         <Animated.View
//           style={{
//             width: 100,
//             height: 100,
//             borderRadius: 50,
//             backgroundColor: '#00ff0055',

//             opacity: opacity2,
//             transform: [
//               {
//                 scale: ripple2,
//               },
//             ],
//           }}></Animated.View>
//       </Animated.View>
//     </View>
//   );
// };

// export default AudioWave;

// const styles = StyleSheet.create({});
