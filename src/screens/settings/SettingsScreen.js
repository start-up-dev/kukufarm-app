import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from "react-native";
import color from "../../const/color";
import SingleMenu from "../../components/settings/SingleMenu";
import Space from "../../components/common/Space";

const right = require("../../../assets/images/right.png");

const { width, height } = Dimensions.get("window");

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: color.background }}>
      <StatusBar />
      <ScrollView style={{ paddingHorizontal: 20, height: height }}>
        <SingleMenu
          title="John Appleseed"
          subTitle="john.applessed@apple.com"
          profile
          link="Profile"
        />
        <SingleMenu title="Currency" unit="KSH" link="Currency" />
        <SingleMenu
          title="Number of eggs in a tray"
          unit="30"
          link="Eggs Tray"
        />
        <SingleMenu
          title="Upgrade"
          subTitle="Current plan: Small farm"
          link="Upgrade"
        />
        <SingleMenu title="Restore purchase" />
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
    fontFamily: "Sora-SemiBold",
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1.5,
    color: "#141414",
    textAlign: "center",
    marginBottom: 8,
  },
  c: {
    fontFamily: "Sora-Regular",
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: color.TextSecondary,
    textAlign: "center",
    marginBottom: 8,
  },
});

export default SettingsScreen;
