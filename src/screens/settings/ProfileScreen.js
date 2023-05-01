import {
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import color from "../../const/color";
import Space from "../../components/common/Space";
import Button from "../../components/common/Button";

const profileImg = require("../../../assets/images/profileImg1.jpg");

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={30} />
        <Image source={profileImg} style={styles.profileImg} />
        <Space height={30} />
        <Text style={styles.name}>John Appleseed</Text>
        <Space height={8} />
        <Text style={styles.email}>john.appleseed@apple.com</Text>
        <Space height={"40%"} />
        <Button title="Logout" />
        <Space height={30} />
        <TouchableOpacity style={styles.deleteView}>
          <Text style={styles.logoutText}>Delete Account</Text>
        </TouchableOpacity>
        <Space height={300} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: "center",
  },
  name: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: "#5B5E67",
    textAlign: "center",
  },
  email: {
    fontFamily: "Sora-Regular",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: "#5B5E67",
    textAlign: "center",
  },
  logoutView: {
    borderColor: color.TextLink,
    borderWidth: 1,
    borderRadius: 7,
    padding: 12,
  },
  logoutText: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: "#5B5E67",
    textAlign: "center",
  },
  deleteView: {},
  deleteText: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: color.TextSecondary,
    textAlign: "center",
  },
});

export default ProfileScreen;
