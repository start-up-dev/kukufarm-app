import React, {Component} from 'react';

import imgHand from 'assets/images/hand.png';
import {Image, TouchableOpacity, View} from 'react-native';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Button from 'components/Button';
import Feather from 'react-native-vector-icons/Feather';
import Space from 'components/Space';
import {statusbarHeight} from 'utils/helper';
import TutorialLayout from './TutorialLayout';
import {useCustomDispatch} from 'store';
import {Tutorial} from 'interfaces/IConfig';
import {updateTutorialStep} from 'store/reducers/tutorial';

const EmergencyContact = () => {
  const dispatch = useCustomDispatch();
  const onClickPlus = () => {
    dispatch(updateTutorialStep(Tutorial.ADD_EMERGENCY));
  };

  const onSkipTutorial = () => {
    dispatch(updateTutorialStep(Tutorial.FINISHED));
  };

  return (
    <TutorialLayout>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.brandWarning,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 13,
            paddingVertical: 8,
          }}
          onPress={onSkipTutorial}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Skip Tutorial
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.white,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 3,
            paddingHorizontal: 4,
            marginRight: 45,
          }}
          onPress={onClickPlus}>
          <Feather
            color={theme.colors.black}
            size={25}
            name="plus"
            style={{
              fontWeight: 'bold',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          position: 'relative',
          paddingTop: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'center',
            width: '80%',
          }}>
          <Text
            style={{
              color: theme.colors.white,
              fontWeight: 'bold',
              lineHeight: 30,
            }}
            size={15}>
            Click here to add your 3 emergency contacts. We will send this
            invite below.
          </Text>
        </View>
        <View
          style={{
            paddingTop: 5,
            flexDirection: 'row',
            position: 'absolute',
            right: 23,
          }}>
          <Image source={imgHand} style={{height: 80, width: 48}} />
        </View>
      </View>
      <Space height={110} />
      <View
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: 30,
          paddingHorizontal: 25,
          paddingVertical: 30,
        }}>
        <Text style={{fontSize: 16, textAlign: 'center'}}>
          Hi, "Just checking in! I added you as my emergency contact.{'\n'}
          If I don’t check in daily with you, you will be alerted to check in
          with me. So please, Just Check In if you don’t hear from me. Thanks!"
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

export default EmergencyContact;
