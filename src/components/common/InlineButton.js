import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import color from "../../const/color";

const InlineButton = ({ title, icon }) => {
  return (
    <TouchableOpacity style={styles.btnView}>
      <Image
        source={icon}
        style={{ width: 16, height: 16, resizeMode: "contain" }}
      />
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnView: {
    borderColor: color.TextLink,
    paddingVertical: 12,
    flexDirection: "row",
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
});

export default InlineButton;
