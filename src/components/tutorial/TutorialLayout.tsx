import React, {Component, FC} from 'react';

import imgHand from 'assets/images/hand.png';
import {Image, TouchableOpacity, View} from 'react-native';
import IconStatusW from 'assets/images/tabs/status_w.png';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Button from 'components/Button';
import Feather from 'react-native-vector-icons/Feather';
import Space from 'components/Space';
import {statusbarHeight} from 'utils/helper';

interface IProps {
  children: React.ReactNode;
  marginHorizontal?: number;
}

const TutorialLayout: FC<IProps> = ({children, marginHorizontal}) => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.darkOverlayColor,
        position: 'absolute',
        left: 0,

        top: 0,
        right: 0,
        bottom: 0,
      }}>
      <View
        style={{
          flex: 1,
          marginHorizontal: marginHorizontal || theme.size.pageBorder + 10,
          paddingTop: statusbarHeight,
        }}>
        {children}
      </View>
    </View>
    // <View
    //   style={{
    //     backgroundColor: theme.colors.darkOverlayColor,
    //     position: 'absolute',
    //     left: 0,
    //     top: 0,
    //     right: 0,
    //     bottom: 0,
    //   }}>
    //   <View
    //     style={{
    //       borderRadius: 30,
    //       padding: 20,
    //       margin: 40,
    //       alignSelf: 'center',
    //     }}></View>

    //   <View
    //     style={{
    //       paddingHorizontal: 30,
    //       justifyContent: 'center',
    //       // marginBottom: width * 0.2,
    //     }}>
    //     <Text
    //       style={{
    //         color: theme.colors.white,
    //         fontWeight: 'bold',
    //         lineHeight: 30,
    //       }}>
    //       Keep track of your tribe! View daily check ins by clicking here:
    //       {'\n'}
    //       Then Just Check In!
    //     </Text>

    //     <View
    //       style={{
    //         justifyContent: 'flex-end',
    //         flexDirection: 'row',
    //         marginTop: 30,
    //       }}>
    //       <Button
    //         sm
    //         rounded
    //         style={{
    //           alignSelf: 'center',
    //           backgroundColor: theme.colors.white,
    //         }}
    //         onPress={onSkip}>
    //         <Text style={{fontWeight: 'bold', width: 150, textAlign: 'center'}}>
    //           Skip
    //         </Text>
    //       </Button>
    //     </View>
    //   </View>

    //   <View
    //     style={{
    //       // paddingLeft: screenSize.width * 0.3 - 30,
    //       paddingVertical: 10,
    //       flexDirection: 'row',
    //     }}>
    //     <Image source={imgArrow} style={{transform: [{rotate: '180deg'}]}} />
    //   </View>
    //   <View>
    //     <Button
    //       rounded
    //       style={[
    //         {
    //           backgroundColor: theme.colors.primary,
    //           width: 60,
    //           justifyContent: 'center',
    //         },
    //       ]}
    //       onPress={onNext}>
    //       <Image source={IconStatusW} />
    //     </Button>
    //   </View>
    // </View>
  );
};

export default TutorialLayout;
