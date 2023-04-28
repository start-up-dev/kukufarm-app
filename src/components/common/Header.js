import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import color from "../../const/color";

const left = require("../../../assets/images/left.png");

const Header = ({ title, back, record }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: color.background }}>
      <View
        style={[
          {
            paddingHorizontal: 20,
            paddingVertical: 10,
          },
          !record && {
            borderBottomColor: "#F3F5F9",
            borderColor: "transparent",
            borderWidth: 1,
          },
        ]}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          {back ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={left}
                style={{ width: 7.5, height: 15, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          ) : (
            <View></View>
          )}

          <Text
            style={{
              fontFamily: "Sora-SemiBold",
              fontSize: 14,
              lineHeight: 24,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
