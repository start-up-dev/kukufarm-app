import { View, Text, Image, TouchableOpacity } from "react-native";
import color from "../../const/color";
import Icon from "./Icon";

const close = require("../../../assets/images/close.png");

const AppGuide = ({ onPress = () => {} }) => {
  return (
    <View
      style={{
        backgroundColor: "#F5F5F5",
        padding: 16,
        borderRadius: 7,
      }}
    >
      <TouchableOpacity onPress={onPress} style={{ alignItems: "flex-end" }}>
        <Icon icon={close} m />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "Sora-Regular",
          fontSize: 16,
          lineHeight: 24,
          color: color.TextPrimary,
        }}
      >
        Coop:
      </Text>
      <Text
        style={{
          fontFamily: "Sora-Regular",
          fontSize: 14,
          lineHeight: 24,
          color: color.TextPrimary,
        }}
      >
        The structure where poultry flocks are kept
      </Text>
    </View>
  );
};

export default AppGuide;
