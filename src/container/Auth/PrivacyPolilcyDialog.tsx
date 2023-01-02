import React from 'react';
import Modal from 'react-native-modal';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import imgLogo from 'assets/images/logo_h.png';
import {theme} from 'styles/theme';
import Button from 'components/Button';
import Text from 'components/Text';
export const screenSize = Dimensions.get('window');

const {width, height} = screenSize;

export default function PrivacyPolicyDialog(props: any) {
  const {isOpen, onClose, onAccept} = props;
  return (
    <SafeAreaView>
      <Modal
        isVisible={isOpen}
        // animationIn="bounce"
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        coverScreen={true}
        statusBarTranslucent>
        <View style={styles.modalContainer}>
          <ScrollView>
            <View>
              <Image
                source={imgLogo}
                style={styles.imgLogoH}
                resizeMode="contain"
              />
              <View
                style={{
                  borderBottomColor: `${theme.colors.primary}88`,
                  borderBottomWidth: 1,
                  alignSelf: 'flex-start',
                  marginBottom: 9,
                }}>
                <Text
                  style={{
                    ...styles.pageTitleSub,
                    fontSize: 18,
                    color: `${theme.colors.primary}88`,
                  }}>
                  Just Checking In Privacy Policy
                </Text>
              </View>
              <Text style={{color: theme.colors.black}}>
                Your privacy is important to Just Checking In. This privacy
                policy (“Privacy Policy”) applies to the Just Checking In
                website (www.JustCheckingIn.co) and the Just Checking In mobile
                application Just Checking In and related services and explains
                how personal information is collected, used, disclosed, and
                protected by Just Checking In.
              </Text>

              <Text
                style={{
                  ...styles.pageTitleSub,
                  fontSize: 18,
                  marginBottom: 3,
                  marginTop: 15,
                  alignSelf: 'flex-start',
                  color: '#777',
                }}>
                Changes to This Privacy Policy
              </Text>
              <Text style={{color: theme.colors.black}}>
                We may change this Privacy Policy from time to time. If we make
                any changes to this Privacy Policy, we will inform you by
                posting the revised Privacy Policy on the
                www.JustCheckingIn.com. Those changes will go into effect on the
                “last updated” date shown in the revised Privacy Policy.
              </Text>
            </View>
            <View style={{...styles.btnCheckInContainer, marginTop: 20}}>
              <Button
                rounded
                onPress={onClose}
                style={{
                  backgroundColor: 'transparent',
                  borderColor: theme.colors.black,
                  borderWidth: 1,
                }}>
                <Text color={theme.colors.black}>Cancel</Text>
              </Button>
              <Button rounded onPress={onAccept}>
                <Text color={theme.colors.white}>Accept</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  btnCheckInContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // width: '100%',
  },
  imgLogoH: {
    width: width * 0.75,
  },
  logoTitle: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  logoSubTitle: {
    color: theme.colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  pageTitleSub: {
    fontSize: 23,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  overlay: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: theme.colors.grey500,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
