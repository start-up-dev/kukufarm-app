import {FC, PureComponent, useState} from 'react';
import React from 'react';
import Modal from 'react-native-modal';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import close from 'assets/icons/close.png';
import SingleEmojiForDialog from './SingleEmojiForDialog';
import {classes, theme} from 'styles/theme';
import Text from 'components/Text';
import Button from 'components/Button';
import Input from 'components/Input';
import {set_checkIn} from 'api/checkIn';
import {showAlert} from 'utils/toast';
import {useCustomDispatch} from 'store';
import {updateTutorialStep} from 'store/reducers/tutorial';
import {Tutorial} from 'interfaces/IConfig';
import {get_my_profile} from 'api/auth';
import {setAuthStore} from 'store/reducers/auth';

interface IProps {
  isEmojiVisible: boolean;
  onCloseEmoji: () => void;
  doCheckIn: boolean;
}

const CheckInDialog: FC<IProps> = ({
  isEmojiVisible,
  onCloseEmoji,
  doCheckIn,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState(3);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useCustomDispatch();

  const onSelectEmoji = (status: number) => {
    setSelectedEmoji(status);
  };

  const onInputText = (value: string) => {
    setText(value.slice(0, 100));
  };

  const getMyProfile = async () => {
    try {
      const {data} = await get_my_profile();
      dispatch(
        setAuthStore({
          userData: data.user,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckIn = async () => {
    let trimText = text.trim();
    setLoading(true);
    try {
      const payload = {
        status: selectedEmoji,
        text: trimText,
      };
      const {data} = await set_checkIn(payload);
      // dispatch(
      //   updateAuthStore({
      //     config: {
      //       [name]: data?.user?.config[name],
      //     },
      //   }),
      // );
      setLoading(false);
      onCloseEmoji();
      showAlert('Checked in successfully', 'success');
      setSelectedEmoji(3);
      setText('');
      getMyProfile();
      if (doCheckIn) {
        dispatch(updateTutorialStep(Tutorial.EMERGENCY_ALERT_SOS));
      }
    } catch (error) {
      showAlert('Failed to set checkin time', 'error');
      setLoading(false);
    }
  };

  const isAndroid = Platform.OS === 'android';

  return (
    <Modal
      isVisible={isEmojiVisible}
      animationIn="fadeIn"
      onBackdropPress={onCloseEmoji}
      onBackButtonPress={onCloseEmoji}
      style={classes.shadow}
      backdropColor="#e1e1e1"
      // backdropOpacity={0.6}
      statusBarTranslucent>
      <KeyboardAvoidingView
        behavior={'padding'}
        enable
        style={styles.modalKeyboardView}>
        <View style={styles.modalContainer}>
          {/* <Text style={{...styles.pageTitleSub, textAlign: 'right'}}>X</Text> */}
          {isAndroid ? null : (
            <TouchableOpacity
              style={{marginLeft: 'auto'}}
              onPress={onCloseEmoji}>
              <Image
                source={close}
                resizeMode="cover"
                style={{
                  width: 22,
                  height: 22,
                  marginTop: -8,
                  marginRight: -4,
                }}
              />
            </TouchableOpacity>
          )}
          <View>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 20,
                marginTop: isAndroid ? 3 : -12,
                marginBottom: 10,
              }}
              center>
              How are you feeling?
            </Text>
          </View>
          <View
            style={{
              height: 115,
              // backgroundColor: 'red',
              borderTopColor: isAndroid ? 'black' : 'transparent',
              borderTopWidth: isAndroid ? 2 : 0,
            }}>
            <ScrollView
              contentContainerStyle={{
                // ...styles.btnCheckInContainer,
                marginTop: 8,
                justifyContent: 'space-between',
                // backgroundColor: 'red',
                width: '100%',
                marginBottom: 0,
                borderTopColor: 'black',
                borderTopWidth: 2,
                marginTop: isAndroid ? -2 : 0,
              }}
              style={{}}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <SingleEmojiForDialog
                onSelectEmoji={() => onSelectEmoji(1)}
                selectedEmoji={selectedEmoji}
                value={1}
              />
              <SingleEmojiForDialog
                onSelectEmoji={() => onSelectEmoji(2)}
                selectedEmoji={selectedEmoji}
                value={2}
              />
              <SingleEmojiForDialog
                onSelectEmoji={() => onSelectEmoji(3)}
                selectedEmoji={selectedEmoji}
                value={3}
              />
              <SingleEmojiForDialog
                onSelectEmoji={() => onSelectEmoji(4)}
                selectedEmoji={selectedEmoji}
                value={4}
              />
              <SingleEmojiForDialog
                onSelectEmoji={() => onSelectEmoji(5)}
                selectedEmoji={selectedEmoji}
                value={5}
              />
            </ScrollView>
          </View>
          <View style={{...styles.btnCheckInContainer, marginTop: 12}}>
            <Input
              placeholder="Journal your thoughts or add a description (optional)"
              style={{
                backgroundColor: '#eee',
                borderRadius: 10,
                minHeight: 100,
                width: '100%',
              }}
              containerStyle={{flex: 1}}
              value={text}
              numberOfLines={5}
              multiline
              textAlignVertical="top"
              onChangeText={onInputText}
            />
          </View>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 1,
            }}>
            <Text style={{fontSize: 15}}>{text?.length}/100</Text>
          </View>

          <View style={{...styles.btnGroupCheckIn, marginTop: 20}}>
            <Button
              rounded
              sm
              onPress={onCloseEmoji}
              style={{
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.black,
                borderWidth: 1,
              }}>
              <Text>Close</Text>
            </Button>
            <Button rounded sm onPress={onCheckIn} loader={loading}>
              <Text dark>Check In</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CheckInDialog;

const styles = StyleSheet.create({
  modalKeyboardView: {
    // alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  btnCheckInContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '100%',
  },
  btnGroupCheckIn: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

// import {PureComponent} from 'react';
// import {Button, Input, Text, View, Toast} from 'native-base';
// import React from 'react';
// import Modal from 'react-native-modal';
// import {
//   Image,
//   KeyboardAvoidingView,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';
// import styles from '../styles';

// import close from '../../assets/icons/close.png';
// import Center from './Center';
// import {DURATION_TOAST} from '../config';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import SingleEmoji from './SingleEmoji';

// class EmojiStatusDialog extends PureComponent {
//   state = {
//     selectedEmoji: 3,
//     text: '',
//   };

//   onSelectEmoji = (status) => {
//     this.setState({selectedEmoji: status});
//   };

//   onInputText = (value) => {
//     this.setState({text: value});
//   };

//   onCheckIn = () => {
//     const {selectedEmoji} = this.state;
//     let {text} = this.state;
//     const {onEmojiStatus} = this.props;

//     text = text.trim();
//     // if (!text) {
//     //   Toast.show({
//     //     text: 'Please type your text here.',
//     //     type: 'success',
//     //     duration: DURATION_TOAST,
//     //     position: 'top',
//     //     style: styles.flushMessage,
//     //   });
//     //   return;
//     // }
//     this.setState({
//       selectedEmoji: 3,
//       text: '',
//     });
//     onEmojiStatus(selectedEmoji, text, 1);
//   };

//   render() {
//     const {isEmojiVisible, onCloseEmoji} = this.props;
//     const {selectedEmoji} = this.state;

//     return (
//       <Modal
//         isVisible={isEmojiVisible}
//         animationIn="bounce"
//         onBackdropPress={onCloseEmoji}
//         onBackButtonPress={onCloseEmoji}
//         statusBarTranslucent>
//         <KeyboardAvoidingView
//           behavior={'padding'}
//           enable
//           style={styles.modalKeyboardView}>
//           <View style={styles.modalContainer}>
//             {/* <Text style={{...styles.pageTitleSub, textAlign: 'right'}}>X</Text> */}
//             <TouchableOpacity
//               style={{marginLeft: 'auto'}}
//               onPress={onCloseEmoji}>
//               <Image
//                 source={close}
//                 resizeMode="cover"
//                 style={{
//                   width: 22,
//                   height: 22,

//                   marginTop: -8,
//                   marginRight: -4,
//                 }}
//               />
//             </TouchableOpacity>
//             <Center>
//               <Text style={styles.pageTitleSub}>How are you feeling?</Text>
//             </Center>
//             <View style={{height: 60}}>
//               <ScrollView
//                 contentContainerStyle={{
//                   ...styles.btnCheckInContainer,
//                 }}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}>
//                 <SingleEmoji
//                   onSelectEmoji={() => this.onSelectEmoji(1)}
//                   selectedEmoji={selectedEmoji}
//                   value={1}
//                 />
//                 <SingleEmoji
//                   onSelectEmoji={() => this.onSelectEmoji(2)}
//                   selectedEmoji={selectedEmoji}
//                   value={2}
//                 />
//                 <SingleEmoji
//                   onSelectEmoji={() => this.onSelectEmoji(3)}
//                   selectedEmoji={selectedEmoji}
//                   value={3}
//                 />
//                 <SingleEmoji
//                   onSelectEmoji={() => this.onSelectEmoji(4)}
//                   selectedEmoji={selectedEmoji}
//                   value={4}
//                 />
//                 <SingleEmoji
//                   onSelectEmoji={() => this.onSelectEmoji(5)}
//                   selectedEmoji={selectedEmoji}
//                   value={5}
//                 />
//                 <SingleEmoji
//                   onSelectEmoji={() => this.onSelectEmoji(6)}
//                   selectedEmoji={selectedEmoji}
//                   value={6}
//                 />
//                 <SingleEmoji
//                   onSelectEmoji={() => this.onSelectEmoji(7)}
//                   selectedEmoji={selectedEmoji}
//                   value={7}
//                 />
//                 <SingleEmoji
//                   onSelectEmoji={() => this.onSelectEmoji(8)}
//                   selectedEmoji={selectedEmoji}
//                   value={8}
//                 />
//                 <SingleEmoji
//                   onSelectEmoji={() => this.onSelectEmoji(9)}
//                   selectedEmoji={selectedEmoji}
//                   value={9}
//                 />
//                 <SingleEmoji
//                   onSelectEmoji={() => this.onSelectEmoji(10)}
//                   selectedEmoji={selectedEmoji}
//                   value={10}
//                 />
//                 {/*
//                 <Button
//                   rounded
//                   transparent
//                   style={
//                     [
//                       // styles.btnEmoji,
//                       // selectedEmoji == 1 ? {} : styles.btnEmojiInactive,
//                     ]
//                   }
//                   onPress={() => onSelectEmoji(8)}>
//                   <Image source={imgEmoji1} style={inlineStyles.emojiButton} />
//                 </Button> */}
//                 {/* <Button
//                   rounded
//                   transparent
//                   style={[
//                     styles.btnEmoji,
//                     selectedEmoji == -1 ? {} : styles.btnEmojiInactive,
//                   ]}
//                   onPress={this.onSelectEmoji.bind(this, -1)}>
//                   <Image source={imgEmoji3} style={styles.btnEmojiImage} />
//                 </Button> */}
//               </ScrollView>
//             </View>

//             <View style={{...styles.btnCheckInContainer}}>
//               <Input
//                 placeholder="Type your text here"
//                 style={{
//                   backgroundColor: '#eee',
//                   borderRadius: 10,
//                   minHeight: 100,
//                   fontSize: 17,
//                 }}
//                 numberOfLines={5}
//                 multiline
//                 textAlignVertical="top"
//                 onChangeText={this.onInputText}
//               />
//             </View>

//             <View style={styles.btnGroupCheckIn}>
//               <Button rounded success onPress={onCloseEmoji}>
//                 <Text uppercase={false}>Close</Text>
//               </Button>
//               <Button rounded onPress={this.onCheckIn.bind(this)}>
//                 <Text uppercase={false}>Check In</Text>
//               </Button>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </Modal>
//     );
//   }
// }

// export default EmojiStatusDialog;

// const inlineStyles = StyleSheet.create({
//   emojiButton: {
//     width: 50,
//     height: 50,
//   },
// });
