import React, {Component, FC} from 'react';

import imgHand from 'assets/images/hand.png';
import {Image, TouchableOpacity, View} from 'react-native';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Button from 'components/Button';
import Feather from 'react-native-vector-icons/Feather';
import Space from 'components/Space';
import TutorialLayout from './TutorialLayout';
import {useCustomDispatch} from 'store';
import {Tutorial} from 'interfaces/IConfig';
import {updateTutorialStep} from 'store/reducers/tutorial';

interface IProps {
  onSetCheckInTime: () => void;
}

const SetCheckInTime: FC<IProps> = ({onSetCheckInTime}) => {
  // const dispatch = useCustomDispatch();
  // const onClickPlus = () => {
  //   dispatch(updateTutorialStep(Tutorial.ADD_EMERGENCY));
  // };

  return (
    <TutorialLayout>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '60%',
          flex: 1,
          // backgroundColor: 'red',
        }}>
        <Button
          rounded
          sm
          style={[
            {
              backgroundColor: theme.colors.white,
              borderRadius: 8,
              marginBottom: 8,
            },
          ]}
          onPress={onSetCheckInTime}>
          <Text style={{color: 'black'}}>Set Check In Time</Text>
        </Button>

        <View
          style={{
            paddingTop: 5,
            flexDirection: 'row',
            marginLeft: 15,
          }}>
          <Image source={imgHand} style={{height: 80, width: 48}} />
        </View>
        <Text
          style={{
            color: theme.colors.white,
            fontWeight: 'bold',
            lineHeight: 30,
          }}
          center
          size={15}>
          Click here to change your daily check-in time; Then Just Check In!
        </Text>
      </View>
    </TutorialLayout>
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

export default SetCheckInTime;
