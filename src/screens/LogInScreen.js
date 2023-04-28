import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
} from "react-native";
import Space from "../components/common/Space";
import color from "../const/color";

//Images
const google = require("../../assets/images/google.png");
const apple = require("../../assets/images/apple.png");

const LogInScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Space height={"15%"} />
      <Text style={styles.title}>Kuku farm</Text>
      <Text style={styles.subTitle}>Flock management and record keeping</Text>
      <Space height={"20%"} />
      <TouchableOpacity style={styles.logInBox}>
        <Image source={apple} style={styles.appleIcon} />
        <Text style={styles.logInText}>Continue with Apple</Text>
      </TouchableOpacity>
      <Space height={20} />
      <TouchableOpacity style={styles.logInBox}>
        <Image source={google} style={styles.googleIcon} />
        <Text style={styles.logInText}>Continue with Google</Text>
      </TouchableOpacity>
      <Space height={"30%"} />
      <Text style={styles.bottomText}>
        By continuing, you agree to Kuku farm’s{" "}
        <Text style={styles.bottomLink}>Terms of service</Text> and{" "}
        <Text style={styles.bottomLink}>Privacy policy</Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "Sora-Bold",
    fontSize: 28,
    lineHeight: 40,
  },
  subTitle: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
  },
  logInBox: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 12,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: color.TextPrimary,
  },
  logInText: {
    fontFamily: "Sora-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: color.TextPrimary,
  },
  appleIcon: {
    width: 12.64,
    height: 15,
    marginRight: 12,
  },
  googleIcon: {
    width: 16.22,
    height: 16.67,
    marginRight: 12,
  },
  bottomText: {
    fontFamily: "Sora-Regular",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 24,
    width: "70%",
    color: color.TextSecondary,
  },
  bottomLink: {
    fontFamily: "Sora-SemiBold",
    color: color.TextLink,
  },
});

export default LogInScreen;
