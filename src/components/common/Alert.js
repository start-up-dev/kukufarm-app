import {
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import color from "../../const/color";
import Button from "./Button";
import Space from "./Space";

const MyAlert = (props) => {
  console.log("hi");
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}
    >
      <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
        <Space height={200} />
        <View style={styles.centered}>
          <Text style={styles.title}>Email not found</Text>
          <Text style={styles.description}>
            The email you entered is not registered with Kuku farm. Verify the
            email and try again.
          </Text>
          <Space height={20} />
          <Button
            title="Okay"
            fill
            mini
            onPress={() => props.setModalVisible(false)}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centered: {
    width: "80%",
    height: "40%",
    borderRadius: 7,
    padding: 20,
    backgroundColor: color.background,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: color.TextLink,
    marginLeft: 10,
  },
  description: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: color.TextSecondary,
    textAlign: "center",
  },
  title: {
    fontFamily: "Sora-SemiBold",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: "#CC4254",
    textAlign: "center",
  },
});

export default MyAlert;