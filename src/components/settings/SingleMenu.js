import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import color from "../../const/color";

const rightIcon = require("../../../assets/images/right.png");
const profileImg = require("../../../assets/images/profileImg1.jpg");

const SingleMenu = ({ title, subTitle, unit, profile, right, leave, link }) => {
  const navigation = useNavigation();

  const leaveHandler = () => {
    Alert.alert(
      "Leave farm?",
      "",
      [
        {
          text: "Yes, leave",
          onPress: () => console.log("OK Pressed"),
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 12,
      }}
      onPress={
        link ? () => navigation.navigate(link) : console.log("No Link Found")
      }
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {profile && (
          <Image
            source={profileImg}
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              marginRight: 12,
              marginVertical: 10,
            }}
          />
        )}

        <View>
          <Text
            style={{
              fontFamily: "Sora-Regular",
              fontSize: 14,
              lineHeight: 24,
              letterSpacing: 0.25,
              color: color.TextPrimary,
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
              color: "#595959",
            }}
          >
            {subTitle}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Sora-Regular",
            fontSize: 14,
            lineHeight: 24,
            letterSpacing: 0.25,
            color: color.TextPrimary,
            marginRight: 10,
          }}
        >
          {unit}
        </Text>
        {!right && (
          <Image
            source={rightIcon}
            style={{ width: 5, height: 8, resizeMode: "contain" }}
          />
        )}
        {leave && (
          <TouchableOpacity onPress={leaveHandler}>
            <Text
              style={{
                fontFamily: "Sora-Regular",
                fontSize: 14,
                lineHeight: 24,
                letterSpacing: 0.25,
                color: color.TextPrimary,
              }}
            >
              Leave
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SingleMenu;
