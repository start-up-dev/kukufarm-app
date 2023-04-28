import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import color from "../../const/color";

const right = require("../../../assets/images/right.png");

const RecordItem = ({ title, subtitle }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingVertical: 20,
        borderBottomColor: "#F3F5F9",
        borderColor: "transparent",
        borderWidth: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Record Details")}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Sora-Regular",
              fontSize: 16,
              lineHeight: 24,
              letterSpacing: 0.5,
              color: color.foundation,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: "Sora-Regular",
              fontSize: 12,
              lineHeight: 20,
              letterSpacing: 0.4,
              color: "#5B5E67",
            }}
          >
            {subtitle}
          </Text>
        </View>
        <Image
          source={right}
          style={{ width: 5, height: 8, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RecordItem;
