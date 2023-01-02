import React, {Component, FC} from 'react';

import imgHand from 'assets/images/hand.png';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Button from 'components/Button';
import Feather from 'react-native-vector-icons/Feather';
import Space from 'components/Space';
import TutorialLayout from './TutorialLayout';
import {useCustomDispatch} from 'store';
import {Tutorial} from 'interfaces/IConfig';
import {updateTutorialStep} from 'store/reducers/tutorial';
import imgLogo from 'assets/images/B.png';
export const screenSize = Dimensions.get('window');

interface IProps {
  onPressCheckIn: () => void;
}

const SetCheckInTime: FC<IProps> = ({onPressCheckIn}) => {
  // const dispatch = useCustomDispatch();
  // const onClickPlus = () => {
  //   dispatch(updateTutorialStep(Tutorial.ADD_EMERGENCY));
  // };

  return (
    <TutorialLayout>
      <View
        style={{
          justifyContent: 'center',
          // alignItems: 'center',
          // paddingTop: '20%',
          flex: 1,
          // backgroundColor: 'red',
        }}>
        <Text
          style={{
            color: theme.colors.white,
            fontWeight: 'bold',
            lineHeight: 30,
          }}
          // center
          size={15}>
          When we alert you to check in, please click here to check in.
        </Text>
        <View
          style={{
            paddingTop: 5,
            // flexDirection: 'row',
            marginLeft: 15,
            alignSelf: 'flex-end',
            marginRight: 50,
          }}>
          <Image
            source={imgHand}
            style={{
              height: 80,
              width: 48,
              transform: [{rotate: '200deg'}],
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity onPress={onPressCheckIn}>
            <Image source={imgLogo} style={styles.btnCheckInImage} />
          </TouchableOpacity>
        </View>
      </View>
    </TutorialLayout>
  );
};

export default SetCheckInTime;

const styles = StyleSheet.create({
  btnCheckInImage: {
    width: screenSize.width * 0.25,
    height: screenSize.width * 0.25,
  },
});
