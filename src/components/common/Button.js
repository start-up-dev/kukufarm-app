import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import color from "../../const/color";

const plus = require("../../../assets/images/plus.png");

const Button = ({ title, link }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(link)}
      style={styles.btnView}
    >
      <Image
        source={plus}
        style={{ width: 10, height: 10, resizeMode: "contain" }}
      />
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnView: {
    borderColor: color.TextLink,
    borderWidth: 1,
    borderRadius: 7,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "Sora-Regular",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: color.TextLink,
    marginLeft: 10,
  },
});

export default Button;
