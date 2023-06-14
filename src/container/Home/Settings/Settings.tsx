import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import color from 'constants/color';
import SingleMenu from 'components/settings/SingleMenu';
import Space from 'components/common/Space';

import {useCustomSelector} from 'store';

const {width, height} = Dimensions.get('window');

const SettingsScreen = () => {
  const userData = useCustomSelector(state => state.auth.userData);

  return (
    <SafeAreaView style={{backgroundColor: color.background}}>
      <StatusBar />
      <ScrollView style={{paddingHorizontal: 20, height: height}}>
        <SingleMenu
          title={
            userData?.firstName
              ? `${userData?.firstName} ${userData?.lastName}`
              : 'Add Name'
          }
          subTitle={userData?.email}
          profile={userData?.picture}
          link="Profile"
        />
        <SingleMenu
          title="Currency"
          unit={userData?.currency}
          link="Currency"
        />
        <SingleMenu
          title="Number of eggs in a tray"
          unit="30"
          link="EggsTray"
        />
        <SingleMenu
          title="Upgrade"
          subTitle="Current plan: Small farm"
          link="Upgrade"
        />
        <SingleMenu title="Restorepurchase" />
        <SingleMenu title="FAQs" />
        <SingleMenu title="About" />
        <Space height={100} />
        <Text style={styles.v}>V 1.0</Text>
        <Text style={styles.c}>(c) Kuku farm 2023. All rights reserved</Text>
        <Space height={100} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  v: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1.5,
    color: '#141414',
    textAlign: 'center',
    marginBottom: 8,
  },
  c: {
    fontFamily: 'Sora-Regular',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: color.TextSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default SettingsScreen;
